import { Link } from '@react-navigation/native'
import { StyleSheet, View, FlatList, Text } from 'react-native'
import { theme } from '../interfaces/contants'
import { useEffect, useState } from 'react'

interface ItemsLinkProps {
  items: string[]
}

interface ItemLinkProps {
  item: string
  date: string

}

export default function ListItemsLink ({ items }: ItemsLinkProps) {
  const [listItems, setListItems] = useState<ItemLinkProps[]>([])

  useEffect(() => {
    const dates = items.map((item) => {
      const date = new Date(item)
      return { item, date: date.toLocaleString('en-US') }
    })

    setListItems(dates)
  }, [items])

  return (
    <View style={styles.links}>
      <FlatList
        data={listItems}
        renderItem={({ item }) =>
          <Link to={{
            screen: 'Details',
            params: { id: item.item }
          }}>
            <View style={styles.link}>
              <Text style={styles.text}>{item.item}</Text>
              <Text style={styles.subtext}>({item.date})</Text>
            </View>
          </Link>
      }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  links: {
    width: '100%'
  },
  link: {
    backgroundColor: theme.colors.primary,
    width: '100%',
    padding: 25,
    alignItems: 'center',
    borderColor: theme.colors.yellow,
    borderStyle: 'solid',
    borderTopWidth: 1,
    gap: 5
  },
  text: {
    color: theme.colors.yellow,
    fontSize: theme.fontsSize.body
  },
  subtext: {
    color: theme.colors.red,
    fontSize: theme.fontsSize.text
  }
})
