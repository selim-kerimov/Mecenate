import DollarIcon from '@/assets/icons/dollar.svg'
import { Palette } from '@/shared/constants'
import { FontFamily } from '@/shared/constants/FontFamily'
import { Button } from '@/shared/ui/Button'
import { StyledText } from '@/shared/ui/StyledText'
import { Image } from 'expo-image'
import { StyleSheet, View } from 'react-native'

interface Props {
  uri?: string
}

export const BlurredImage = ({ uri }: Props) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri }} style={styles.image} blurRadius={40} />
      <View style={styles.overlay}>
        <View style={styles.icon}>
          <DollarIcon color={Palette.white} />
        </View>
        <StyledText color="white" size={15} weight={600} style={styles.title}>
          Контент скрыт пользователем.{'\n'}Доступ откроется после доната
        </StyledText>
        <Button title="Отправить донат" style={{ width: 240 }} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 42,
    height: 42,
    borderRadius: 10,
    backgroundColor: Palette.accent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: Palette.accent,
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 999,
  },
  title: {
    marginTop: 8,
    marginBottom: 13,
    lineHeight: 22,
  },
  buttonText: {
    color: Palette.white,
    fontSize: 15,
    fontWeight: '700',
    fontFamily: FontFamily.main,
  },
})
