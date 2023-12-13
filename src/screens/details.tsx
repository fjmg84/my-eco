import { useEffect, useState } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { type NativeStackScreenProps } from '@react-navigation/native-stack'

import { collection, getDocs } from 'firebase/firestore'
import { type ItemsProps, type RootStackParamList } from '../interfaces/type'
import { db } from '../firebase/connection-db'
import ListItemsDetails from '../components/list-items-details'

type Props = NativeStackScreenProps<RootStackParamList, 'Details'>

export default function DetailsScreen ({ route }: Props) {
  const [items, setItems] = useState<ItemsProps[]>([])
  const {
    params: { id }
  } = route

  console.log(items)

  useEffect(() => {
    if (id !== null) {
      getItemsCollection({ subCollection: id })
    }
  }, [id])

  const getItemsCollection = async ({
    subCollection
  }: {
    subCollection: string
  }) => {
    const collectionRef = collection(
      db,
      'shopping-cart',
      subCollection,
      'items'
    )
    const querySnapshot = await getDocs(collectionRef)
    querySnapshot.forEach((doc) => {
      setItems((prev) => [...prev, doc.data() as ItemsProps])
    })
  }

  return (
    <View style={styles.container}>
      <Text>Details</Text>
      <ListItemsDetails items={items} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
