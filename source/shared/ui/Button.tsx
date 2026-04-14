import { Pressable, PressableProps, StyleSheet } from 'react-native'
import { Palette } from '../constants'
import { StyledText } from './StyledText'

interface Props extends PressableProps {
  variant?: 'primary'
  title?: string
}

export const Button = ({ variant = 'primary', title, style, ...rest }: Props) => {
  const colors = pressedColors[variant]

  return (
    <Pressable
      style={(state) => [
        styles.main,
        styles[variant],
        { backgroundColor: state.pressed ? colors.pressed : colors.default },
        typeof style === 'function' ? style(state) : style,
      ]}
      {...rest}
    >
      <StyledText style={styles[`${variant}Title`]}>{title}</StyledText>
    </Pressable>
  )
}

const pressedColors: Record<string, { default: string; pressed: string }> = {
  primary: { default: Palette.accent, pressed: Palette.accent600 },
}

const styles = StyleSheet.create({
  main: {
    height: 42,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
  },
  primary: {
    backgroundColor: Palette.accent,
  },
  primaryTitle: {
    color: Palette.white,
    fontSize: 15,
    fontWeight: 600,
  },
})
