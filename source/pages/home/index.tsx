import { Palette } from '@/shared/constants'
import { PublicationCard } from '@/widgets/PublicationCard'
import { useState } from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Tabs } from './ui/Tabs'

export const HomePage = () => {
  const insets = useSafeAreaInsets()

  const [activeTab, setActiveTab] = useState<string>('all')

  return (
    <FlatList
      data={[1]}
      renderItem={() => <PublicationCard />}
      ListHeaderComponent={() => <Tabs value={activeTab} onChange={setActiveTab} />}
      style={styles.main}
      contentContainerStyle={{ paddingTop: insets.top + 16, gap: 16 }}
    />
  )
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: Palette.background,
  },
})
