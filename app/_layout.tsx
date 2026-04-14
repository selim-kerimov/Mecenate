import { TanstackQueryProvider } from '@/app/providers/TanstackQueryProvider'
import { Stack } from 'expo-router'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { KeyboardProvider } from 'react-native-keyboard-controller'

export default function RootLayout() {
  return (
    <GestureHandlerRootView>
      <KeyboardProvider>
        <TanstackQueryProvider>
          <Stack screenOptions={{ headerShown: false }} />
        </TanstackQueryProvider>
      </KeyboardProvider>
    </GestureHandlerRootView>
  )
}
