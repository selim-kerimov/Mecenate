import { TanstackQueryProvider } from '@/app/providers/TanstackQueryProvider'
import { Stack } from 'expo-router'

export default function RootLayout() {
  return (
    <TanstackQueryProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </TanstackQueryProvider>
  )
}
