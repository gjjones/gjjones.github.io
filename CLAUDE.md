# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Documentation Vault

Development notes, feature planning, and content specifications are maintained in an Obsidian vault at:
`C:\Users\gjjon\Documents\obsidian`

Refer to the vault for feature requirements, design rationale, and drum lesson content. See the vault's `index.md` for organization details.

## Project Overview

This is a React 19 application built with rspack and deployed to GitHub Pages. The application provides MIDI device management and sequencer transport control using the Web MIDI API.

## Development Commands

### Local Development
```bash
npm run dev
```
Starts development server at `http://localhost:3000` with hot module replacement.

### Build for Production
```bash
npm run build
```
Builds the application for production into the `dist/` directory.

### Preview Production Build
```bash
npm run preview
```
Serves the production build locally for testing before deployment.

### Install Dependencies
```bash
npm install
```
Installs all project dependencies.

## Architecture

### Project Structure

- **src/**: React application source code
  - `index.jsx`: Application entry point
  - `App.jsx`: Main application component
  - `index.html`: HTML template
  - **hooks/**: Custom React hooks
    - `useMidi.jsx`: MIDI device management and Web MIDI API integration
  - **components/**: React components
    - `MidiDeviceSelector.jsx`: MIDI output device selection dropdown
    - `MidiStatus.jsx`: Connection status display
    - `MidiTransportControl.jsx`: Sequencer start/stop controls
- **public/**: Static assets copied to build output
  - `.nojekyll`: Critical file that prevents GitHub Pages from processing the site with Jekyll
- **dist/**: Build output directory (generated, not committed)
- **rspack.config.js**: Build configuration
- **.github/workflows/deploy.yml**: GitHub Actions workflow for automated deployment

### MIDI Functionality

The application uses the **Web MIDI API** (native browser API, no external libraries) to:
- Detect and list MIDI output devices
- Track device connection/disconnection in real-time
- Send MIDI Real-Time messages for sequencer control:
  - **Start (0xFA)**: Begin playback from beginning
  - **Stop (0xFC)**: Stop playback
  - **Continue (0xFB)**: Resume playback (available but not currently used in UI)

#### Browser Requirements
- **Supported**: Chrome, Edge, Firefox (desktop)
- **Not Supported**: Safari, iOS browsers
- **Production**: HTTPS required (localhost works for development)
- **Permissions**: User must grant MIDI access via browser prompt

#### Key Implementation Details
- `useMidi` hook manages all MIDI state and API interactions
- MIDI output device selection required before transport controls appear
- Playback state tracked locally (MIDI API doesn't provide feedback)
- Automatic cleanup of event listeners on component unmount
- Device hot-plugging fully supported

### Build Configuration

The rspack configuration (`rspack.config.js`) is set up for GitHub Pages deployment:
- **publicPath**: Set to `/` (appropriate for username.github.io repos)
- **JSX Runtime**: Uses automatic runtime (no React import needed)
- **Output**: Bundles are generated with content hashes for cache busting
- **Asset handling**: Supports JSX, CSS, and various asset types (images, fonts)
- **Development**: Includes hot module replacement and React Fast Refresh
- **Production**: Extracts CSS to separate files and optimizes bundle size

### Critical Files

**public/.nojekyll**: This empty file is essential for GitHub Pages deployment. It prevents GitHub from treating the site as a Jekyll project, which would:
- Ignore files/folders starting with `_`
- Process the site through Jekyll (not needed for React apps)
- Potentially break the deployment

The GitHub Actions workflow explicitly copies this file to the `dist/` directory during deployment.

## Deployment

The site deploys automatically via GitHub Actions when pushing to the `master` branch. The workflow:
1. Checks out the code
2. Sets up Node.js 20
3. Installs dependencies with `npm ci`
4. Builds the application with `npm run build`
5. Copies `.nojekyll` to the dist folder
6. Deploys the `dist/` directory to GitHub Pages

**Important**:
- GitHub Pages must be configured to use "GitHub Actions" as the source (not a branch)
- Configure in repository Settings > Pages
- Production site requires HTTPS for Web MIDI API to function

## Technology Stack

- **React 19**: Latest stable version with modern features (automatic JSX runtime, improved hooks)
- **rspack**: Fast bundler (Rust-based, webpack-compatible)
- **Web MIDI API**: Native browser API for MIDI device communication
- **ES Modules**: Project uses `"type": "module"` in package.json
- **GitHub Pages**: Static site hosting
- **GitHub Actions**: CI/CD for automated deployments

## Development Notes

### Working with MIDI
- MIDI devices must be physically connected to test functionality
- Permission must be requested via user gesture (button click)
- Check browser console for MIDI-related errors during development
- Test device hot-plugging (connect/disconnect while app is running)

### Component Guidelines
- Keep MIDI logic in `useMidi` hook, not in components
- Components should remain presentational and stateless where possible
- Use inline styles (current pattern) or add CSS modules if styling grows complex
