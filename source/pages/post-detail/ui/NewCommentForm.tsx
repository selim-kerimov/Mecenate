import PaperPlaneIcon from '@/assets/icons/paper-plane.svg'
import { Palette } from '@/shared/constants'
import { useForm } from '@tanstack/react-form'
import { Pressable, StyleSheet, TextInput, View } from 'react-native'
import { useCommentCreate } from '../model/useCommentCreate'

interface Props {
  postId: string | undefined
}

export const NewCommentForm = ({ postId }: Props) => {
  const onSubmit = useCommentCreate(postId)

  const form = useForm({
    defaultValues: { text: '' },
    onSubmit: ({ value }) => {
      onSubmit(value.text.trim())
      form.reset()
    },
  })

  return (
    <View style={styles.main}>
      <form.Field
        name="text"
        validators={{
          onSubmit: ({ value }) => (!value.trim() ? 'Введите комментарий' : undefined),
        }}
      >
        {(field) => (
          <TextInput
            style={styles.input}
            placeholder="Ваш комментарий"
            placeholderTextColor={Palette.placeholder}
            value={field.state.value}
            onChangeText={field.handleChange}
          />
        )}
      </form.Field>

      <form.Subscribe selector={(state) => state.values.text}>
        {(text) => (
          <Pressable onPress={form.handleSubmit} disabled={!text.trim()}>
            <PaperPlaneIcon
              width={30}
              height={30}
              color={!text.trim() ? Palette.accent200 : Palette.accent}
            />
          </Pressable>
        )}
      </form.Subscribe>
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    backgroundColor: 'white',
    borderTopColor: Palette.border,
    borderTopWidth: 1,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: Palette.tertiary,
    borderRadius: 20,
    height: 40,
    paddingHorizontal: 16,
  },
})
