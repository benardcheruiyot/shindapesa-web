
# ShindaPesa Web

This is the web version of the ShindaPesa app, migrated from React Native to Next.js.

## Features
- Authentication (Login, Register, Forgot Password)
- Spin Wheel game with Certified RNG
- Onboarding and Welcome screens
- Referral Hub with Instant Commissions
- M-Pesa Integration (C2B STK Push & B2C Payouts)
- Responsive design for Mobile & Desktop

## Installation
1. Install dependencies:
	```bash
	npm install
	```
2. Setup environment variables (see `.env.example`):
	```bash
	cp .env.example .env.local
	```
3. Run the development server:
	```bash
	npm run dev
	```

## M-Pesa Configuration
The application is configured to use Safaricom M-Pesa APIs.
- **Base Domain**: Set `NEXT_PUBLIC_APP_URL` in your environment (e.g., `https://your-domain.com`).
- **STK Callbacks**: `/api/mpesa/callback`
- **Withdrawal Callbacks**: `/api/mpesa/withdraw-callback`

The callback URLs in the Safaricom Developer portal must match your hosted domain.

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
