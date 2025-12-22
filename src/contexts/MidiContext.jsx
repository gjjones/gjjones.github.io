import { createContext, useContext } from 'react';
import { useMidi } from '../hooks/useMidi';

const MidiContext = createContext(null);

export function MidiProvider({ children }) {
  const midiState = useMidi();
  return <MidiContext.Provider value={midiState}>{children}</MidiContext.Provider>;
}

export function useMidiContext() {
  const context = useContext(MidiContext);
  if (!context) {
    throw new Error('useMidiContext must be used within MidiProvider');
  }
  return context;
}
