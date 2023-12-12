import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, Pressable, View } from 'react-native'
import firebase from './firebase/config'
import { getFirestore, collection, getDocs, setDoc, doc, addDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'

const DATA_SEEK = {
  date: new Date().getTime(),
  products: [{
    name: 'teste',
    price: 12.99
  }],
  amount: 10.99
}

interface Products {
  name: string
  price: number
}
interface ItemsProps {
  date: number
  products: Products[]
  amount: number
}

export default function App () {
  const [items, setItems] = useState<string[]>([])
  const [collectionSelected, setCollectionSelected] = useState(null)
  const db = getFirestore(firebase)
  const today = new Date()
  const nameSubCollection = `${today.getDate()}-${today.getMonth()}-${today.getFullYear()}`

  console.log(items)

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
      .catch((error) => { alert(error) })
  }

  const getItemsCollection = async ({ subCollection }: { subCollection: string }) => {
    const collectionRef = collection(db, 'shopping-cart', subCollection, 'items')
    const querySnapshot = await getDocs(collectionRef)
    console.log(querySnapshot)
  }

  const setItemCollection = ({ nameSubCollection }: { nameSubCollection: string }) => async () => {
    const docRef = doc(db, 'shopping-cart', nameSubCollection)
    await setDoc(docRef, {})
    await addDoc(collection(db, 'shopping-cart', nameSubCollection, 'items'), DATA_SEEK)
  }

  return (

    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
      <Pressable onPress={setItemCollection({ nameSubCollection })}>
        <Text>save</Text>
      </Pressable>

    <View style={styles.links}>

      {
        items.map((item, index) => {
          return <View key={index} style={styles.link}>
          <Text style={styles.text}>{item}</Text>
         </View>
        })
      }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  links: {
    rowGap: 2,
    width: '100%'
  },
  link: {
    backgroundColor: 'rgb(54 83 20)',
    width: '100%',
    padding: 20,
    alignItems: 'center',
    borderTopColor: 'white'
  },
  text: {
    color: 'white',
    fontSize: 16
  }

})
