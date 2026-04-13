import { Text, TextProps, TextStyle } from 'react-native'
import { Palette } from '../constants'
import { FontFamily } from '../constants/FontFamily'

interface Props extends TextProps {
  color?: keyof typeof Palette
  size?: number
  style?: TextStyle
  weight?: 400 | 500 | 600 | 700
}

export const StyledText = ({ color = 'textMain', size, style, weight = 400, ...rest }: Props) => {
  return (
    <Text
      {...rest}
      style={{
        color: Palette[color],
        fontFamily: FontFamily.main,
        fontSize: size,
        fontWeight: weight,
        ...style,
      }}
    />
  )
}
