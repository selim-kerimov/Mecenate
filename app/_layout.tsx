import { TanstackQueryProvider } from '@/app/providers/TanstackQueryProvider'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { Platform } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { KeyboardProvider } from 'react-native-keyboard-controller'

export default function RootLayout() {
  return (
    <GestureHandlerRootView>
      <KeyboardProvider>
        <TanstackQueryProvider>
          {Platform.OS === 'android' && <StatusBar style="dark" translucent />}
          <Stack screenOptions={{ headerShown: false }} />
        </TanstackQueryProvider>
      </KeyboardProvider>
    </GestureHandlerRootView>
  )
}
