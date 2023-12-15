import { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View, Alert } from 'react-native'

import { collection, getDocs } from 'firebase/firestore'
import ItemsLink from '../components/list-items-link'
import { db } from '../firebase/connection-db'
import { theme } from '../interfaces/contants'

export default function ListDatesScreen () {
  const [items, setItems] = useState<string[]>([])

  useEffect(() => {
    listDateCollection()
  }, [])

  const listDateCollection = () => {
    const collectionRef = collection(db, 'shopping-cart')
    getDocs(collectionRef)
      .then((response) => {
        response.forEach((docs) => {
          setItems(prev => [...prev, docs.id])
        })
      })
      .catch((error) => {
        Alert.alert(error as string)
      })
  }

  return (

    <View style={styles.container}>
      <StatusBar style="auto" />

      <ItemsLink items={items}/>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.yellow,
    alignItems: 'center',
    justifyContent: 'flex-start'

  }

})
