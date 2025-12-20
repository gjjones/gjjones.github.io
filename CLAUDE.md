# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React 19 application built with rspack and deployed to GitHub Pages. The site uses modern React features and is optimized for fast builds with rspack.

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
- **public/**: Static assets copied to build output
  - `.nojekyll`: Critical file that prevents GitHub Pages from processing the site with Jekyll
- **dist/**: Build output directory (generated, not committed)
- **rspack.config.js**: Build configuration
- **.github/workflows/deploy.yml**: GitHub Actions workflow for automated deployment

### Build Configuration

The rspack configuration (`rspack.config.js`) is set up for GitHub Pages deployment:
- **publicPath**: Set to `/` (appropriate for username.github.io repos)
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

**Important**: GitHub Pages must be configured to use "GitHub Actions" as the source (not a branch). This is configured in the repository Settings > Pages.

## Technology Stack

- **React 19**: Latest stable version with modern features (Server Components support, Actions API, built-in compiler)
- **rspack**: Fast bundler (Rust-based, webpack-compatible)
- **ES Modules**: Project uses `"type": "module"` in package.json
- **GitHub Pages**: Static site hosting
- **GitHub Actions**: CI/CD for automated deployments
