import { FlatList, Text } from 'react-native'
import { type ItemsProps } from '../interfaces/type'
import { useEffect, useState } from 'react'
import { orderArray } from '../services/functions'

export default function ListItemsDetails ({ items }: { items: ItemsProps[] }) {
  const [listItems, setListItems] = useState<ItemsProps[]>([])

  useEffect(() => {
    const listItemsOrderByDate = orderArray({ arr: items, camp: 'date' })
    setListItems(listItemsOrderByDate)
  }, [items])

  return (
        <FlatList
        data={listItems}
        renderItem={({ item }) => {
          const date = new Date(item.date)

          return <Text>{date.toLocaleTimeString('en-US')}</Text>
        }}
      />
  )
}
