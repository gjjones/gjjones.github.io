import { useState, useEffect, useCallback } from 'react';

export function useMidi() {
  const [midiAccess, setMidiAccess] = useState(null);
  const [inputs, setInputs] = useState([]);
  const [outputs, setOutputs] = useState([]);
  const [selectedInput, setSelectedInput] = useState(null);
  const [selectedOutput, setSelectedOutput] = useState(null);
  const [connectionState, setConnectionState] = useState('disconnected');
  const [error, setError] = useState(null);
  const [isSupported, setIsSupported] = useState(true);
  const [permissionStatus, setPermissionStatus] = useState('prompt');

  // Check browser support on mount
  useEffect(() => {
    if (!navigator.requestMIDIAccess) {
      setIsSupported(false);
      setError('Web MIDI API not supported in this browser. Try Chrome, Edge, or Firefox.');
    }
  }, []);

  // Request MIDI access (must be called from user gesture)
  const requestAccess = useCallback(async () => {
    if (!isSupported) return;

    try {
      const access = await navigator.requestMIDIAccess();
      setMidiAccess(access);
      setPermissionStatus('granted');
      setError(null);
    } catch (err) {
      if (err.name === 'NotAllowedError') {
        setError('MIDI access denied. Please grant permission and try again.');
        setPermissionStatus('denied');
      } else if (err.name === 'SecurityError') {
        setError('MIDI access requires HTTPS (or localhost for development).');
        setPermissionStatus('denied');
      } else {
        setError(`MIDI error: ${err.message}`);
        setPermissionStatus('denied');
      }
    }
  }, [isSupported]);

  // Update device lists and handle state changes
  useEffect(() => {
    if (!midiAccess) return;

    function updateDevices() {
      const inputArray = Array.from(midiAccess.inputs.values());
      const outputArray = Array.from(midiAccess.outputs.values());
      setInputs(inputArray);
      setOutputs(outputArray);
    }

    function handleStateChange(event) {
      updateDevices();

      // Check if the selected input device was disconnected
      if (selectedInput && event.port.id === selectedInput.id) {
        if (event.port.state === 'disconnected') {
          setSelectedInput(null);
          setConnectionState('disconnected');
        }
      }

      // Check if the selected output device was disconnected
      if (selectedOutput && event.port.id === selectedOutput.id) {
        if (event.port.state === 'disconnected') {
          setSelectedOutput(null);
        }
      }
    }

    // Get initial devices
    updateDevices();

    // Listen for device connection/disconnection
    midiAccess.addEventListener('statechange', handleStateChange);

    return () => {
      midiAccess.removeEventListener('statechange', handleStateChange);
    };
  }, [midiAccess, selectedInput, selectedOutput]);

  // Update connection state when selected device changes
  useEffect(() => {
    if (selectedInput && selectedInput.state === 'connected') {
      setConnectionState('connected');
    } else {
      setConnectionState('disconnected');
    }
  }, [selectedInput]);

  // Select a MIDI input device
  const selectDevice = useCallback((deviceId) => {
    if (!midiAccess) return;

    const device = midiAccess.inputs.get(deviceId);
    if (device) {
      setSelectedInput(device);
    }
  }, [midiAccess]);

  // Select a MIDI output device
  const selectOutputDevice = useCallback((deviceId) => {
    if (!midiAccess) return;

    const device = midiAccess.outputs.get(deviceId);
    if (device) {
      setSelectedOutput(device);
    }
  }, [midiAccess]);

  // Send MIDI message helper
  const sendMidiMessage = useCallback((message) => {
    if (!selectedOutput || selectedOutput.state !== 'connected') {
      console.warn('MIDI output not available');
      return false;
    }

    try {
      selectedOutput.send([message]);
      return true;
    } catch (err) {
      console.error('Failed to send MIDI message:', err);
      return false;
    }
  }, [selectedOutput]);

  // Send MIDI Start message (0xFA)
  const sendStart = useCallback(() => {
    return sendMidiMessage(0xFA);
  }, [sendMidiMessage]);

  // Send MIDI Stop message (0xFC)
  const sendStop = useCallback(() => {
    return sendMidiMessage(0xFC);
  }, [sendMidiMessage]);

  // Send MIDI Continue message (0xFB)
  const sendContinue = useCallback(() => {
    return sendMidiMessage(0xFB);
  }, [sendMidiMessage]);

  return {
    isSupported,
    permissionStatus,
    inputs,
    outputs,
    selectedInput,
    selectedOutput,
    connectionState,
    error,
    requestAccess,
    selectDevice,
    selectOutputDevice,
    sendStart,
    sendStop,
    sendContinue,
  };
}
