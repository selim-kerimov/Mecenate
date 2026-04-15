# Mecenate

An [Expo](https://expo.dev) React Native app.

## Prerequisites

- Node.js (LTS)
- [pnpm](https://pnpm.io/) (this repo ships with a `pnpm-lock.yaml`)
- For native runs: Xcode (iOS) and/or Android Studio + an emulator

## Setup

1. **Install dependencies**

   ```bash
   pnpm install
   ```

2. **Create your `.env`**

   Copy the example file and fill in the values:

   ```bash
   cp .env.example .env
   ```

   The two variables you need are:
   - `EXPO_PUBLIC_OPEN_API_URL` — URL of the backend OpenAPI schema
     (`openapi.json`). Only used by the `codegen` script; you don't need
     it for a regular `pnpm ios` / `pnpm android` run because the
     generated client is already checked in.
   - `EXPO_PUBLIC_USER_ID` — bearer token used to authenticate API
     requests. Read at app startup in `source/app/api/configureClient.ts`,
     which calls `client.setConfig({ auth })` on the generated fetch
     client so every request carries the token.

## Running the app

- **iOS (native build)**

  ```bash
  pnpm ios
  ```

- **Android (native build)**

  ```bash
  pnpm android
  ```

- **Dev server only**

  ```bash
  pnpm start
  ```

  Then press `i`/`a` in the terminal to open on iOS/Android, or scan
  the QR code with a development build.

## Useful scripts

- `pnpm lint` — run ESLint with autofix
- `pnpm format` — run Prettier
- `pnpm codegen` — regenerate the API client from the OpenAPI schema.
  Optional — only needed when the backend contract changes. Requires
  `EXPO_PUBLIC_OPEN_API_URL` to be set in `.env`. The script wipes
  `source/shared/openapi` and recreates the typed fetch client plus all
  React Query hooks used throughout the app.
