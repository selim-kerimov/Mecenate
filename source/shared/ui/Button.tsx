import { Pressable, PressableProps, StyleSheet } from 'react-native'
import { Palette } from '../constants'
import { StyledText } from './StyledText'

interface Props extends PressableProps {
  variant?: 'primary'
  title?: string
}

export const Button = ({ variant = 'primary', title, style, ...rest }: Props) => {
  return (
    <Pressable
      style={(state) => [
        styles.main,
        styles[variant],
        typeof style === 'function' ? style(state) : style,
      ]}
      {...rest}
    >
      <StyledText style={styles[`${variant}Title`]}>{title}</StyledText>
    </Pressable>
  )
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
