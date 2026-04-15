import { ActivityIndicator, ActivityIndicatorProps } from 'react-native'
import { Palette } from '../constants'

export const LoadingIndicator = ({ ...rest }: ActivityIndicatorProps) => {
  return <ActivityIndicator color={Palette.accent} {...rest} />
}
