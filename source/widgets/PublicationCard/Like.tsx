import HeartIcon from '@/assets/icons/heart.svg'
import { Palette } from '@/shared/constants'
import { StyledText } from '@/shared/ui/StyledText'
import { Pressable, StyleSheet } from 'react-native'

export const Like = () => {
  return (
    <Pressable style={styles.action}>
      <HeartIcon color={Palette.secondary} />
      <StyledText size={13} weight={700} color="secondary">
        12
      </StyledText>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  action: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    padding: 6,
    paddingRight: 12,
    backgroundColor: Palette.tertiary,
    borderRadius: 999,
  },
})
