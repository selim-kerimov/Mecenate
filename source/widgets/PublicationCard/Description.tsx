import { StyledText } from '@/shared/ui/StyledText'
import { useState } from 'react'

interface Props {
  preview?: string
  body?: string
}

export const Description = ({ preview, body }: Props) => {
  const [expanded, setExpanded] = useState(false)

  const hasMore = !!body && !!preview && body !== preview

  if (expanded || !hasMore) {
    return (
      <StyledText size={15} weight={500}>
        {expanded ? body : preview}
      </StyledText>
    )
  }

  const trimmed = (preview ?? '').replace(/[.…\s]+$/u, '')

  return (
    <StyledText size={15} weight={500}>
      {trimmed}
      {'... '}
      <StyledText color="accent" onPress={() => setExpanded(true)} suppressHighlighting={true}>
        Показать еще
      </StyledText>
    </StyledText>
  )
}
