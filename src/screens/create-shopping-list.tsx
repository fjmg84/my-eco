import { addDoc, collection, doc, setDoc } from 'firebase/firestore'
import { Dialog } from '@rneui/themed'
import { db } from '../firebase/connection-db'
import { DATA_SEEK, theme } from '../interfaces/constants'
import {
  Pressable,
  Text,
  StyleSheet,
  TextInput,
  View,
  SafeAreaView,
  FlatList,
  Image
} from 'react-native'
import { useEffect, useState } from 'react'
import Counter from '../components/counter'
import { type Products } from '../interfaces/type'

export default function CreateShoppingScreen () {
  const today = new Date()
  const nameSubCollection = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`
  const [visible, setVisible] = useState(false)
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [store, setStore] = useState<Products[]>(DATA_SEEK.products)
  const [amount, setAmount] = useState(0)

  useEffect(() => {
    let amountTotal = amount
    store.forEach((item) => {
      amountTotal += item.price * item.quantity
    })

    setAmount(Number(amountTotal))
  }, [store])

  const toggleDialog = () => {
    setVisible(!visible)
  }

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
          alert('You must add at least one product')
          return
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
      <View
        style={{
          width: '100%'
        }}
      >
        <Text style={styles.labelAmount}>total</Text>
        <Text style={styles.amount}>
          {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
          }).format(amount)}
        </Text>
      </View>

      <FlatList
        style={styles.scrollView}
        data={store}
        ItemSeparatorComponent={() => (
          <View
            style={{
              borderBottomColor: theme.colors.black_light,
              borderBottomWidth: 1
            }}
          />
        )}
        renderItem={({ item }) => {
          return (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 10
              }}
            >
              <Text style={{ ...styles.row, width: 220 }}>{item.name}</Text>
              <Text style={{ ...styles.row, width: 20, textAlign: 'center' }}>
                {item.quantity}
              </Text>
              <Text style={{ ...styles.row, width: 80, textAlign: 'right' }}>
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD'
                }).format(item.price)}
              </Text>
            </View>
          )
        }}
      />

      <View style={styles.navbar}>
        <Pressable style={styles.btn} onPress={toggleDialog}>
          <Image
            source={require('../../assets/add.png')}

          />
        </Pressable>
        <Pressable style={styles.btn}>
          <Image
            source={require('../../assets/delete.png')}

          />
        </Pressable>
        <Pressable style={styles.btn} onPress={setItemCollection({ nameSubCollection })}>
          <Image
            source={require('../../assets/upload-data.png')}
          />
        </Pressable>
      </View>

      <Dialog
        overlayStyle={{
          borderRadius: 10,
          justifyContent: 'space-between',
          height: 450,
          padding: 20,
          width: '90%'
        }}
        isVisible={visible}
        onBackdropPress={toggleDialog}
      >
        <View style={{ gap: 10 }}>
          <TextInput
            placeholder="product"
            style={styles.input}
            value={name}
            onChangeText={setName}
          />
          <TextInput
            placeholder="price"
            style={styles.input}
            value={price}
            keyboardType="numeric"
            onChangeText={setPrice}
          />

          <Counter value={quantity} onAction={setQuantity} />
        </View>

        <View style={styles.navbar}>
          <Pressable style={styles.btn} onPress={handleAddStore}>
            <Image source={require('../../assets/accept.png')} />
          </Pressable>

          <Pressable style={styles.btn} onPress={toggleDialog}>
            <Image source={require('../../assets/cancel.png')} />
          </Pressable>
        </View>
      </Dialog>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.yellow,
    padding: 10,
    position: 'relative',
    alignItems: 'center'
  },
  scrollView: {
    backgroundColor: 'white',
    padding: 10,
    marginVertical: 20,
    borderRadius: 10,
    width: '100%'
  },
  labelAmount: {
    color: theme.colors.black_light,
    fontSize: theme.fontsSize.small
  },
  amount: {
    fontSize: theme.fontsSize.big,
    fontWeight: '900',
    color: theme.colors.black
  },
  row: {
    fontSize: theme.fontsSize.normal,
    paddingVertical: 5
  },
  navbar: {
    backgroundColor: theme.colors.blue,
    width: '100%',
    height: 71,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 10
  },
  btn: {
    backgroundColor: 'white',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50
  },
  addBtn: {
    backgroundColor: theme.colors.blue,
    flexDirection: 'row',
    height: 71,
    borderRadius: 50,
    paddingHorizontal: 10,
    columnGap: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    borderColor: theme.colors.black_light,
    borderBottomWidth: 1,
    paddingVertical: 15
  }
})
