import { createRouter, createRootRoute, createRoute, Outlet } from '@tanstack/react-router';
import { MenuRoute } from './routes/MenuRoute';
import { QuizRoute } from './routes/QuizRoute';
import { BrowserNotSupported } from './components/ErrorStates/BrowserNotSupported';
import { useMidiContext } from './contexts/MidiContext';

// Root route component (renders child routes)
function RootComponent() {
  const { isSupported, error } = useMidiContext();

  if (!isSupported || error) {
    return <BrowserNotSupported error={error} />;
  }

  return <Outlet />;
}

// Define root route
const rootRoute = createRootRoute({
  component: RootComponent,
});

// Define menu route
const menuRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: MenuRoute,
});

// Define quiz route
const quizRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/quiz/$quizId',
  component: QuizRoute,
});

// Create route tree
const routeTree = rootRoute.addChildren([menuRoute, quizRoute]);

// Create router instance
export const router = createRouter({ routeTree });
