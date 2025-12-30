import { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate, useParams } from '@tanstack/react-router';
import { useMidiContext } from '../contexts/MidiContext';
import { getLesson } from '../utils/curriculumLoader';
import { useSequencer } from '../hooks/useSequencer';
import { useDrumSettings } from '../hooks/useDrumSettings';
import { useAudioSamplePlayer } from '../hooks/useAudioSamplePlayer';
import { useTimingClock } from '../hooks/useTimingClock';
import { useProgressTracking } from '../hooks/useProgressTracking';
import { useTimer } from '../hooks/useTimer';
import { DEFAULT_PRESET } from '../constants/drumPresets';
import { PermissionRequest } from '../components/ErrorStates/PermissionRequest';
import { QuizComplete } from '../components/QuizComplete';
import { Header } from '../components/Header/Header';
import { Footer } from '../components/Footer/Footer';
import { ListenMode } from '../components/ListenMode';
import { SequencerGrid } from '../components/SequencerGrid';
import { DrumSettings } from '../components/DrumSettings/DrumSettings';
import { getDifferences } from '../utils/sequenceComparison';
import { getPatternQualities } from '../utils/patternUtils.js';
import { getFirstTimeLessonPatterns } from '../utils/difficultyUtils.js';
import { theme } from '../theme';
import { requiresMidiPermission, canPlayback } from '../utils/playbackUtils';

export function QuizRoute() {
  const { quizId } = useParams({ from: '/quiz/$quizId' });
  const navigate = useNavigate();
  const {
    permissionStatus,
    requestAccess,
    outputs,
    selectedOutput,
    selectOutputDevice,
    sendNoteTrigger,
  } = useMidiContext();

  // Get the lesson by ID
  const selectedQuiz = getLesson(quizId);
  const isLesson = !!selectedQuiz;

  // Filter patterns for first-time users (5 easy + 5 medium = 10 patterns)
  // Returning users see all 15 patterns
  const filteredQuiz = useMemo(() => {
    if (!selectedQuiz || !isLesson) return selectedQuiz;

    const lessonProgress = getLessonProgress(quizId);
    const isFirstTime = !lessonProgress || lessonProgress.attempts === 0;

    if (isFirstTime && selectedQuiz.patterns) {
      // First-time user: show only easy and medium patterns
      const filteredPatterns = getFirstTimeLessonPatterns(selectedQuiz.patterns);
      return {
        ...selectedQuiz,
        patterns: filteredPatterns,
        totalQuestions: filteredPatterns.length
      };
    }

    // Returning user: show all patterns
    return selectedQuiz;
  }, [selectedQuiz, quizId, getLessonProgress, isLesson]);

  const [playbackMode, setPlaybackMode] = useState('hidden');
  const [showHints, setShowHints] = useState(false);
  const [viewMode, setViewMode] = useState('sequencer'); // 'sequencer' | 'settings'
  const [isMidiAvailable, setIsMidiAvailable] = useState(true);

  // Initialize drum settings
  const drumSettings = useDrumSettings();

  // Initialize progress tracking for lessons
  const { recordLessonCompletion, recordPatternResult, getLessonProgress } = useProgressTracking();

  // Initialize timer for tracking quiz session time
  const timer = useTimer();

  // Initialize timing clock and sample player for auto-loading
  const timingClockForSamples = useTimingClock({ bpm: 120, division: 4, totalSteps: 16 });
  const samplePlayer = useAudioSamplePlayer({
    audioContext: timingClockForSamples.audioContext,
  });

  // Detect Web MIDI API availability
  useEffect(() => {
    const checkMidiAvailability = () => {
      const available = !!(navigator.requestMIDIAccess);
      setIsMidiAvailable(available);

      // If MIDI unavailable, suggest user switch to sample mode
      if (!available) {
        console.warn('[QuizRoute] Web MIDI API not available. Consider using sample playback mode.');
      }
    };

    checkMidiAvailability();
  }, []);

  // Auto-load 808 samples on first visit or reload samples from localStorage
  useEffect(() => {
    const checkAndLoadSamples = async () => {
      // Wait for AudioContext to be available
      if (!timingClockForSamples.audioContext) {
        console.log('[QuizRoute] Waiting for AudioContext to be ready...');
        return;
      }

      const hasSavedSettings = localStorage.getItem('drumSettings') !== null;

      if (!hasSavedSettings) {
        // First-time user: auto-load 808 kit
        console.log('[QuizRoute] First visit - auto-loading 808 sample kit');
        if (DEFAULT_PRESET && samplePlayer.loadSample) {
          await drumSettings.loadSamplesFromPreset(
            DEFAULT_PRESET.instruments,
            samplePlayer.loadSample
          );
        }
      } else {
        // Returning user: reload samples if they have sample-type instruments
        const needsSampleLoading = drumSettings.instruments.some((inst, index) => {
          return inst.type === 'sample' && inst.sampleUrl && !drumSettings.getAudioBuffer(index);
        });

        if (needsSampleLoading && samplePlayer.loadSample) {
          console.log('[QuizRoute] Reloading samples from saved settings');
          await drumSettings.loadSamplesFromPreset(
            drumSettings.instruments,
            samplePlayer.loadSample
          );
        }
      }
    };

    checkAndLoadSamples();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timingClockForSamples.audioContext]); // Re-run when audioContext becomes available

  // If invalid quiz ID, redirect to home
  useEffect(() => {
    if (!selectedQuiz) {
      navigate({ to: '/' });
    }
  }, [selectedQuiz, navigate]);

  // Filter instruments based on lesson requirements
  // Lessons can specify which instruments they need (e.g., for Lesson 5 with Open Hi-Hat)
  // Memoized to prevent infinite re-renders
  const { lessonInstruments, lessonToPresetIndexMap } = useMemo(() => {
    if (!filteredQuiz?.instruments) {
      // No specific instruments required, use all from settings
      const indexMap = drumSettings.instruments.map((_, i) => i);
      return { lessonInstruments: drumSettings.instruments, lessonToPresetIndexMap: indexMap };
    }

    // Lesson specifies required instruments - filter and reorder to match
    const requiredLabels = filteredQuiz.instruments;
    const filtered = [];
    const indexMap = [];

    requiredLabels.forEach(label => {
      // First, try to find in user's saved settings
      const presetIndex = drumSettings.instruments.findIndex(inst => inst.label === label);
      let instrument = drumSettings.instruments[presetIndex];

      // If not found, try to get from DEFAULT_PRESET (for new instruments like OH)
      if (!instrument && DEFAULT_PRESET?.instruments) {
        instrument = DEFAULT_PRESET.instruments.find(inst => inst.label === label);
      }

      if (instrument) {
        filtered.push(instrument);
        indexMap.push(presetIndex >= 0 ? presetIndex : -1);
      }
    });

    return { lessonInstruments: filtered, lessonToPresetIndexMap: indexMap };
  }, [filteredQuiz?.instruments, drumSettings.instruments]);

  // Create lesson-specific instrument lookup functions
  // These use lessonInstruments instead of the full drumSettings.instruments
  const getLessonMidiParams = useCallback((trackIndex) => {
    const instrument = lessonInstruments[trackIndex];
    if (!instrument) return null;
    return {
      channel: instrument.channel,
      note: instrument.note,
      velocity: instrument.velocity,
    };
  }, [lessonInstruments]);

  const getLessonInstrument = useCallback((trackIndex) => {
    const instrument = lessonInstruments[trackIndex];
    if (!instrument) return null;

    const presetIndex = lessonToPresetIndexMap[trackIndex];
    const audioBuffer = presetIndex >= 0 ? drumSettings.getAudioBuffer(presetIndex) : null;

    return {
      ...instrument,
      ...(instrument.type === 'sample' && {
        audioBuffer: audioBuffer,
      }),
    };
  }, [lessonInstruments, lessonToPresetIndexMap, drumSettings]);

  // Create Settings-specific functions that map lesson indices to preset indices
  const updateLessonInstrument = useCallback((lessonIndex, updates) => {
    const presetIndex = lessonToPresetIndexMap[lessonIndex];
    if (presetIndex >= 0) {
      drumSettings.updateInstrument(presetIndex, updates);
    }
  }, [lessonToPresetIndexMap, drumSettings]);

  const setLessonAudioBuffer = useCallback((lessonIndex, audioBuffer) => {
    const presetIndex = lessonToPresetIndexMap[lessonIndex];
    if (presetIndex >= 0) {
      drumSettings.setAudioBuffer(presetIndex, audioBuffer);
    }
  }, [lessonToPresetIndexMap, drumSettings]);

  const getLessonAudioBuffer = useCallback((lessonIndex) => {
    const presetIndex = lessonToPresetIndexMap[lessonIndex];
    if (presetIndex >= 0) {
      return drumSettings.getAudioBuffer(presetIndex);
    }
    return null;
  }, [lessonToPresetIndexMap, drumSettings]);

  // Initialize sequencer
  const sequencer = useSequencer(
    sendNoteTrigger,
    playbackMode,
    filteredQuiz,
    getLessonMidiParams,
    getLessonInstrument,
    lessonInstruments
  );

  // Restart timer when quiz changes or component mounts
  useEffect(() => {
    timer.restart(); // Atomic reset + start to avoid state batching issues
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quizId]); // Restart timer for each new quiz

  // Stop playback on unmount
  useEffect(() => {
    return () => {
      sequencer.stop();
      timer.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only cleanup on unmount, not when sequencer reference changes

  // Transition to completion state when quiz finishes (but stay on same route)
  useEffect(() => {
    if (sequencer.isQuizComplete) {
      sequencer.stop();
      timer.stop(); // Stop timer when quiz completes

      // Record lesson completion for lessons
      if (isLesson && recordLessonCompletion && filteredQuiz) {
        const correctCount = sequencer.quizResults.filter(r => r === true).length;
        const totalCount = sequencer.quizResults.length;
        const accuracy = totalCount > 0 ? correctCount / totalCount : 0;

        // Build pattern-quality results
        const patternQualityResults = filteredQuiz.patterns?.map((pattern, index) => {
          const qualities = getPatternQualities(pattern, filteredQuiz);
          const isCorrect = sequencer.quizResults[index];

          // All-or-nothing: pattern result applies to all qualities
          const qualityResults = {};
          qualities.forEach(quality => {
            qualityResults[quality] = isCorrect;
          });

          return qualityResults;
        }) || [];

        recordLessonCompletion(quizId, {
          accuracy,
          patternResults: sequencer.quizResults,
          patternQualityResults,
          timeTaken: timer.elapsedSeconds, // Track actual elapsed time
          tempo: sequencer.bpm
        });
      }
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sequencer.isQuizComplete]); // Only depend on isQuizComplete, not entire sequencer object to avoid infinite loop

  const handleTogglePlayback = () => {
    if (sequencer.isPlaying) {
      sequencer.stop();
    } else {
      sequencer.start();
    }
  };

  const handleToggleHints = () => {
    setShowHints((prev) => !prev);
  };

  const handleTogglePlaybackMode = () => {
    setPlaybackMode((prev) => {
      const newMode = prev === 'user' ? 'hidden' : 'user';
      // Auto-hide hints when viewing 'Hidden' (they're redundant when seeing the answer)
      if (newMode === 'hidden') {
        setShowHints(false);
      }
      return newMode;
    });
    // Restart happens in useEffect below to ensure sequence updates first
  };

  // Restart playback when mode changes (after sequence has updated)
  useEffect(() => {
    if (sequencer.isPlaying) {
      sequencer.restart();
    }
  }, [playbackMode]); // Restart when playbackMode changes

  const handleSubmitAnswer = () => {
    sequencer.submitAnswer();

    // Auto-show hints and switch to 'Your' view if answer is incorrect
    const differences = getDifferences(sequencer.userSequence, sequencer.currentPattern.steps);
    const isCorrect = differences.length === 0;

    // Record pattern result for lessons
    if (isLesson && recordPatternResult) {
      // Build quality results for this pattern
      const pattern = filteredQuiz.patterns?.[sequencer.currentQuestionIndex];
      const qualities = getPatternQualities(pattern, filteredQuiz);

      const qualityResults = {};
      qualities.forEach(quality => {
        qualityResults[quality] = isCorrect;
      });

      recordPatternResult(
        quizId,
        sequencer.currentQuestionIndex,
        isCorrect,
        timer.elapsedSeconds,
        qualityResults
      );
    }

    if (!isCorrect) {
      setShowHints(true);
      setPlaybackMode('user'); // Show user's answer with hints for editing
    }
  };

  const handleNextQuestion = () => {
    setShowHints(false);
    setPlaybackMode('hidden');
    sequencer.goToNextQuestion();
    sequencer.stop();
    sequencer.restart();
  };

  const handleExitQuiz = () => {
    sequencer.stop();
    sequencer.exitQuiz();
    setPlaybackMode('hidden');
    setShowHints(false);
    navigate({ to: '/' });
  };

  const handleRestartQuiz = () => {
    sequencer.stop();
    sequencer.restartQuiz();
    setShowHints(false);
    setPlaybackMode('hidden');
  };

  const handleToggleSettings = () => {
    setViewMode((prev) => {
      const newMode = prev === 'settings' ? 'sequencer' : 'settings';
      // Stop playback when entering settings
      if (newMode === 'settings' && sequencer.isPlaying) {
        sequencer.stop();
      }
      return newMode;
    });
  };

  // Calculate differences for hints
  const differences = getDifferences(sequencer.userSequence, sequencer.currentPattern.steps);
  const highlightedCells = showHints ? differences : [];

  // Determine which sequence to display in the grid
  const displayedSequence = playbackMode === 'hidden' ? sequencer.currentPattern.steps : sequencer.userSequence;
  const isGridEditable = playbackMode === 'user';
  const hideNotes = playbackMode === 'hidden';

  // If invalid quiz, show nothing (redirect will happen)
  if (!selectedQuiz) {
    return null;
  }

  // Check if we have any way to play back audio
  const hasPlaybackCapability = canPlayback(selectedOutput, drumSettings.instruments, drumSettings.getAudioBuffer);

  // If quiz complete, show results
  if (sequencer.isQuizComplete) {
    return (
      <div style={{
        fontFamily: theme.typography.fontFamily.base,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}>
        <Header
          selectedOutput={selectedOutput}
          bpm={sequencer.bpm}
          onBpmChange={sequencer.setBpm}
          currentQuestionIndex={undefined}
          totalQuestions={filteredQuiz.totalQuestions}
          onExit={handleExitQuiz}
        />
        <main style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          padding: theme.spacing.xl,
          overflow: 'auto',
        }}>
          <QuizComplete
            quizResults={sequencer.quizResults}
            onRestart={handleRestartQuiz}
            onReturnToMenu={handleExitQuiz}
          />
        </main>
      </div>
    );
  }

  // Quiz in progress
  return (
    <div style={{
      fontFamily: theme.typography.fontFamily.base,
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    }}>
      <Header
        selectedOutput={selectedOutput}
        bpm={sequencer.bpm}
        onBpmChange={sequencer.setBpm}
        currentQuestionIndex={sequencer.currentQuestionIndex}
        totalQuestions={filteredQuiz.totalQuestions}
        currentPatternDifficulty={sequencer.currentPattern?.difficulty}
        onExit={handleExitQuiz}
      />
      <main style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        padding: theme.spacing.xl,
        overflow: 'auto',
      }}>
        {viewMode === 'settings' ? (
          <DrumSettings
            instruments={lessonInstruments}
            updateInstrument={updateLessonInstrument}
            loadPreset={drumSettings.loadPreset}
            resetToDefault={drumSettings.resetToDefault}
            onClose={handleToggleSettings}
            sendNoteTrigger={sendNoteTrigger}
            selectedOutput={selectedOutput}
            outputs={outputs}
            onSelectOutputDevice={selectOutputDevice}
            setAudioBuffer={setLessonAudioBuffer}
            getAudioBuffer={getLessonAudioBuffer}
          />
        ) : hasPlaybackCapability ? (
          <>
            {playbackMode === 'hidden' ? (
              <ListenMode
                currentStep={sequencer.currentStep}
                totalSteps={sequencer.currentPattern.totalSteps}
                stepsPerMeasure={sequencer.currentPattern.stepsPerMeasure}
                measures={sequencer.currentPattern.measures}
                bpm={sequencer.bpm}
                getMusicalPosition={sequencer.getMusicalPosition}
              />
            ) : (
              <SequencerGrid
                sequence={displayedSequence}
                onToggleStep={sequencer.toggleStep}
                currentStep={sequencer.currentStep}
                bpm={sequencer.bpm}
                isEditable={isGridEditable}
                hideNotes={hideNotes}
                highlightedCells={highlightedCells}
                totalSteps={sequencer.currentPattern.totalSteps}
                stepsPerMeasure={sequencer.currentPattern.stepsPerMeasure}
                measures={sequencer.currentPattern.measures}
                getMusicalPosition={sequencer.getMusicalPosition}
                instruments={sequencer.instruments}
                lessonConstraints={isLesson ? filteredQuiz?.constraints : null}
              />
            )}
          </>
        ) : (
          <div style={{
            textAlign: 'center',
            color: theme.colors.text.secondary,
            marginTop: theme.spacing.xl,
            padding: theme.spacing.xl,
          }}>
            <p style={{ fontSize: theme.typography.fontSize.lg, marginBottom: theme.spacing.md }}>
              No playback method configured
            </p>
            <p style={{
              fontSize: theme.typography.fontSize.sm,
              color: theme.colors.text.secondary,
              marginBottom: theme.spacing.lg,
            }}>
              To begin, choose one of the following:
            </p>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: theme.spacing.md,
              maxWidth: '600px',
              margin: '0 auto',
              textAlign: 'left',
            }}>
              <div style={{
                padding: theme.spacing.md,
                background: theme.colors.bg.secondary,
                borderRadius: theme.borderRadius.sm,
              }}>
                <strong>Option 1: Connect a MIDI device</strong>
                <p style={{ fontSize: theme.typography.fontSize.sm, margin: `${theme.spacing.sm} 0 0 0` }}>
                  {isMidiAvailable
                    ? 'Connect a MIDI device and grant permission when prompted'
                    : 'Your browser doesn\'t support Web MIDI API'}
                </p>
              </div>
              <div style={{
                padding: theme.spacing.md,
                background: theme.colors.bg.secondary,
                borderRadius: theme.borderRadius.sm,
              }}>
                <strong>Option 2: Use audio samples</strong>
                <p style={{ fontSize: theme.typography.fontSize.sm, margin: `${theme.spacing.sm} 0 0 0` }}>
                  Open Settings (gear icon below) and switch instruments to Sample mode, then load audio files
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer
        currentQuestionIndex={sequencer.currentQuestionIndex}
        hasSubmitted={sequencer.hasSubmitted}
        isQuizComplete={sequencer.isQuizComplete}
        quizResults={sequencer.quizResults}
        submitAnswer={handleSubmitAnswer}
        goToNextQuestion={handleNextQuestion}
        restartQuiz={sequencer.restartQuiz}
        showHints={showHints}
        differenceCount={differences.length}
        onToggleHints={handleToggleHints}
        playbackMode={playbackMode}
        onTogglePlaybackMode={handleTogglePlaybackMode}
        isPlaying={sequencer.isPlaying}
        selectedOutput={selectedOutput}
        onTogglePlayback={handleTogglePlayback}
        viewMode={viewMode}
        onToggleSettings={handleToggleSettings}
        instruments={drumSettings.instruments}
        getAudioBuffer={drumSettings.getAudioBuffer}
      />
    </div>
  );
}
