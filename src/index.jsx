import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from '@tanstack/react-router';
import { MidiProvider } from './contexts/MidiContext';
import { router } from './router';
import { initializeCurriculum } from './data/lessons/index.js';

// Initialize curriculum (register all lessons)
initializeCurriculum();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MidiProvider>
      <RouterProvider router={router} />
    </MidiProvider>
  </StrictMode>
);
