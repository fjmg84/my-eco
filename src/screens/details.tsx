import { Text, View } from 'react-native'
import { type NativeStackScreenProps } from '@react-navigation/native-stack'
import { collection, getDocs } from 'firebase/firestore'

import { type RootStackParamList } from '../interfaces/type'
import { db } from '../firebase/connection-db'
import { useEffect } from 'react'

type Props = NativeStackScreenProps<RootStackParamList, 'Details'>

export default function DetailsScreen ({ route }: Props) {
  const { params: { id } } = route

  useEffect(() => {
    if (id !== null) { getItemsCollection({ subCollection: id }) }
  }, [id])

  const getItemsCollection = async ({ subCollection }: { subCollection: string }) => {
    console.log(subCollection)
    const collectionRef = collection(db, 'shopping-cart', subCollection, 'items')
    const querySnapshot = await getDocs(collectionRef)
    console.log(querySnapshot)
  }

  return (
        <View>
            <Text>Details</Text>
        </View>
  )
}
