import AvatarImage from '@/assets/dev/avatar.png'
import BubbleIcon from '@/assets/icons/bubble.svg'
import { Palette } from '@/shared/constants'
import { StyledText } from '@/shared/ui/StyledText'
import { Image } from 'expo-image'
import { Pressable, StyleSheet, View } from 'react-native'
import { Like } from './Like'
import { PublicImage } from './PublicationImage'

export const PublicationCard = () => {
  return (
    <View style={styles.main}>
      <View style={styles.header}>
        <Image source={AvatarImage} style={styles.avatar} />
        <StyledText size={15} weight={700}>
          Петр Федько
        </StyledText>
      </View>

      <PublicImage />

      <View style={styles.body}>
        <View style={{ gap: 8 }}>
          <StyledText weight={700} size={17}>
            Подготовка к лету
          </StyledText>
          <StyledText size={15} weight={500}>
            Когда вы начинаете бегать по утрам, но чувствуете, что каждый шаг дается
          </StyledText>
        </View>

        <View style={styles.bottom}>
          <Like />
          <Pressable style={styles.action}>
            <BubbleIcon color={Palette.secondary} />
            <StyledText size={13} weight={700} color="secondary">
              19
            </StyledText>
          </Pressable>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    paddingVertical: 12,
    backgroundColor: Palette.white,
  },
  header: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingBottom: 16,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  body: {
    paddingHorizontal: 16,
    marginTop: 8,
    gap: 16,
  },
  bottom: {
    flexDirection: 'row',
    gap: 8,
  },
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
