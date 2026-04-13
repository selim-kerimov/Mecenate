import { Palette } from '@/shared/constants'
import { StyledText } from '@/shared/ui/StyledText'
import { useState } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'

interface Props {
  preview?: string
  body?: string
}

export const Description = ({ preview, body }: Props) => {
  const [expanded, setExpanded] = useState(false)

  const hasMore = !!body && !!preview && body !== preview
  const text = expanded ? body : preview

  return (
    <View>
      <StyledText size={15} weight={500}>
        {text}
      </StyledText>
      {!expanded && hasMore && (
        <View style={styles.buttonContainer}>
          <View style={styles.fade} />
          <Pressable style={styles.buttonBackground} onPress={() => setExpanded(true)}>
            <StyledText size={15} weight={500} color="accent">
              Показать еще
            </StyledText>
          </Pressable>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  fade: {
    width: 20,
    height: '100%',
    backgroundColor: Palette.white,
    opacity: 0.5,
  },
  buttonBackground: {
    backgroundColor: Palette.white,
    paddingLeft: 4,
  },
})
