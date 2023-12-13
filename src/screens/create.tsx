import { addDoc, collection, doc, setDoc } from 'firebase/firestore'
import { db } from '../firebase/connection-db'
import { DATA_SEEK } from '../interfaces/contants'
import { Pressable, View } from 'react-native'

export default function CreateScreen () {
  const today = new Date()
  const nameSubCollection = `${today.getDate()}-${today.getMonth()}-${today.getFullYear()}`

  const setItemCollection = ({ nameSubCollection }: { nameSubCollection: string }) => async () => {
    const docRef = doc(db, 'shopping-cart', nameSubCollection)
    await setDoc(docRef, {})
    await addDoc(collection(db, 'shopping-cart', nameSubCollection, 'items'), DATA_SEEK)
  }

  return (
        <View>
            <Pressable onPress={setItemCollection({ nameSubCollection })}>Create new data</Pressable>
        </View>
  )
}
