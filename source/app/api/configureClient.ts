import { client } from '@/shared/openapi/requests/client.gen'

// Lives outside ./source/shared/openapi so it survives `npm run codegen`,
// which wipes the generated folder and recreates client.gen.ts without auth.
// Mutates the singleton client produced by codegen to attach the bearer token
// from the environment before any request runs.
client.setConfig({
  auth: process.env.EXPO_PUBLIC_USER_ID,
})
