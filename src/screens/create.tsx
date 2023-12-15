import { addDoc, collection, doc, setDoc } from 'firebase/firestore'
import { db } from '../firebase/connection-db'
import { DATA_SEEK, theme } from '../interfaces/constants'
import {
  Pressable,
  ScrollView,
  Text,
  StyleSheet,
  TextInput,
  View,
  SafeAreaView
} from 'react-native'
import { useEffect, useState } from 'react'
import Counter from '../components/counter'
import { type Products } from '../interfaces/type'
import Chips from '../components/chips'

export default function CreateScreen () {
  const today = new Date()
  const nameSubCollection = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [store, setStore] = useState<Products[]>([])
  const [amount, setAmount] = useState(0)

  useEffect(() => {
    let amountTotal = amount
    store.forEach((item) => {
      amountTotal += item.price * item.quantity
    })
    setAmount(amountTotal)
  }, [store])

  const handleAddStore = () => {
    setStore((prev) => [...prev, { name, price: Number(price), quantity }])
    setName('')
    setPrice('')
    setQuantity(1)
  }

  const setItemCollection =
    ({ nameSubCollection }: { nameSubCollection: string }) =>
      async () => {
        if (store.length === 0) {
          alert('You must add at least one product'); return
        }

        const docRef = doc(db, 'shopping-cart', nameSubCollection)
        await setDoc(docRef, {})
        await addDoc(
          collection(db, 'shopping-cart', nameSubCollection, 'items'),
          {
            date: new Date().getTime(),
            amount,
            products: store
          }
        )
        setAmount(0)
        setStore([])
        alert('Products added successfully')
      }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
          <View style={styles.chips}>
            <Chips
            value={amount}
            message="Amount to pay"
            customStyle={{
              backgroundColor: theme.colors.red
            }}
          />
          <Pressable style={{
            width: '40%',
            ...styles.btn
          }} onPress={setItemCollection({ nameSubCollection })}>
            <Text style={styles.btnText} >Save</Text>
          </Pressable>
          </View>
        <View style={styles.box}>
          <TextInput
            style={styles.input}
            placeholder="product"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="price"
            value={price}
            keyboardType="numeric"
            onChangeText={setPrice}
          />

          <Counter value={quantity} onAction={setQuantity} />

          <Pressable style={{
            width: '80%',
            ...styles.btn
          }} onPress={handleAddStore}>
            <Text style={styles.btnText}>Add product</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.yellow
  },
  scrollView: {
    width: '100%',
    marginVertical: 10
  },
  chips: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5
  },
  box: {
    gap: 40,
    alignItems: 'center'
  },
  input: {
    height: 80,
    width: '80%',
    borderBottomColor: theme.colors.primary,
    borderBottomWidth: 1,
    paddingVertical: 10,
    fontSize: theme.fontsSize.normal
  },
  btn: {
    backgroundColor: theme.colors.primary,
    height: 60,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnText: {
    color: theme.colors.yellow,
    fontSize: theme.fontsSize.normal
  }
})
