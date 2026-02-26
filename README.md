
# ShindaPesa Web

This is the web version of the ShindaPesa app, migrated from React Native to Next.js.

## Features
- Authentication (Login, Register)
- Spin Wheel game
- Onboarding and Welcome screens
- Referral and withdrawal functionality
- Responsive design using styled-components

## Structure
- `src/screens/` — Main app screens
- `src/components/` — Reusable UI components
- `src/utils/` — Business logic and services
- `src/context/` — Context providers

## Getting Started
1. Install dependencies:
	```bash
	npm install
	```
2. Run the development server:
	```bash
	npm run dev
	```
3. Build for production:
	```bash
	npm run build
	```

## Migration Notes
- All major screens and business logic have been scaffolded for web.
- UI and animations should be adapted using styled-components and web APIs.
- Navigation uses Next.js routing.

## To Do
- Complete migration of all features and UI details.
- Test responsiveness and cross-browser compatibility.
- Update documentation as features are finalized.
