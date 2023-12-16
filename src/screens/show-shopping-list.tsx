import { useEffect, useState } from 'react'
import { StyleSheet, View, Alert, FlatList } from 'react-native'
import { CircleSnail } from 'react-native-progress'

import {
  type CollectionReference,
  type DocumentData,
  collection,
  getDocs
} from 'firebase/firestore'
import { db } from '../firebase/connection-db'
import { theme } from '../interfaces/constants'
import ShoppingDateList from '../components/shopping-date-list'

export interface Item {
  item: string
  date: string
}

export default function ShowShoppingListScreen () {
  const [items, setItems] = useState<Item[]>([])
  const collectionRef = collection(db, 'shopping-cart')

  useEffect(() => {
    listDateCollection({
      collectionRef
    })
      .then((response) => {
        setItems(response)
      })
      .catch((error) => {
        Alert.alert(`${error}`)
      })
  }, [])

  const listDateCollection = async ({
    collectionRef
  }: {
    collectionRef: CollectionReference<DocumentData, DocumentData>
  }) => {
    const responseDate: Item[] = []
    const response = await getDocs(collectionRef)
    response.forEach((value) => {
      const date = new Date(value.id)
      responseDate.push({
        item: value.id,
        date: date.toDateString()
      })
    })
    return responseDate
  }

  return (
    <View style={styles.container}>
      {
        items.length > 0
          ? <FlatList
          style={{ width: '100%' }}
          data={items}
          renderItem={({ item }) => <ShoppingDateList item={item} />}
        />
          : <CircleSnail
          thickness={7}
          size={90}
          indeterminate={true}
          color={[
            theme.colors.primary,
            theme.colors.secondary
          ]}/>
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
