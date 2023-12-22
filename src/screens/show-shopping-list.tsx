import { useEffect, useState } from 'react'
import { StyleSheet, View, Alert, FlatList } from 'react-native'

import { collection } from 'firebase/firestore'
import { db } from '../firebase/connection-db'
import { theme } from '../interfaces/constants'
import ShoppingDateList from '../components/shopping-date-list'
import useUserStore from '../store/useUser'
import useShoppingListStore from '../store/useShoppingList'

export interface Item {
  item: string
  date: string
}

export default function ShowShoppingListScreen () {
  const [items, setItems] = useState<Item[]>([])
  const { userName } = useUserStore()
  const collectionRef = collection(db, 'shopping', userName, 'list')
  const { listAllShoppingLists } = useShoppingListStore()

  useEffect(() => {
    listAllShoppingLists({ collectionRef })
      .then((response) => {
        console.log(response)
        setItems(response)
      })
      .catch((error) => {
        Alert.alert(`${error}`)
      })
  }, [])

  return (
    <View style={styles.container}>
      {
        <FlatList
          style={{ width: '100%' }}
          data={items}
          renderItem={({ item }) => <ShoppingDateList item={item} />}
        />
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.yellow,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
