import { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View, Alert } from 'react-native'

import { collection, getDocs } from 'firebase/firestore'
import ItemsLink from '../components/list-items-link'
import { db } from '../firebase/connection-db'

export default function HomeScreen () {
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

  /*
    const today = new Date()
    const nameSubCollection = `${today.getDate()}-${today.getMonth()}-${today.getFullYear()}`

    const setItemCollection = ({ nameSubCollection }: { nameSubCollection: string }) => async () => {
    const docRef = doc(db, 'shopping-cart', nameSubCollection)
    await setDoc(docRef, {})
    await addDoc(collection(db, 'shopping-cart', nameSubCollection, 'items'), DATA_SEEK)
  } */

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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start'
  }

})
