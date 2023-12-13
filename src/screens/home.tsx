import { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { getFirestore, collection, getDocs, setDoc, doc, addDoc } from 'firebase/firestore'
import { StyleSheet, Text, Pressable, View, Alert } from 'react-native'
import ItemsLink from '../components/list-items-link'
import firebase from '../firebase/config'
import { DATA_SEEK } from '../interfaces/contants'

export default function HomeScreen () {
  const [items, setItems] = useState<string[]>([])
  // const [collectionSelected, setCollectionSelected] = useState(null)
  const db = getFirestore(firebase)
  const today = new Date()
  const nameSubCollection = `${today.getDate()}-${today.getMonth()}-${today.getFullYear()}`

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

  /* const getItemsCollection = async ({ subCollection }: { subCollection: string }) => {
    const collectionRef = collection(db, 'shopping-cart', subCollection, 'items')
    const querySnapshot = await getDocs(collectionRef)
    console.log(querySnapshot)
  } */

  const setItemCollection = ({ nameSubCollection }: { nameSubCollection: string }) => async () => {
    const docRef = doc(db, 'shopping-cart', nameSubCollection)
    await setDoc(docRef, {})
    await addDoc(collection(db, 'shopping-cart', nameSubCollection, 'items'), DATA_SEEK)
  }

  return (

    <View style={styles.container}>
      <StatusBar style="auto" />

      <Pressable onPress={setItemCollection({ nameSubCollection })}>
        <Text>save</Text>
      </Pressable>

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
