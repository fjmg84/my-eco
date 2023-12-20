import React, { useState } from 'react'
import { doc } from 'firebase/firestore'
import { Dialog } from '@rneui/themed'
import { db } from '../firebase/connection-db'
import {
  Pressable,
  Text,
  StyleSheet,
  TextInput,
  View,
  SafeAreaView,
  FlatList,
  Image,
  Alert
} from 'react-native'
import { theme } from '../interfaces/constants'
import Counter from '../components/counter'
import { type Products } from '../interfaces/type'
import useUserStore from '../store/useUser'
import useSettingsStore from '../store/useSettings'
import useShoppingListStore from '../store/useShoppingList'

const INITIAL_VALUES = {
  name: '',
  price: '',
  quantity: 1
}

export default function CreateShoppingScreen () {
  const { userName } = useUserStore()
  const { settings } = useSettingsStore()

  const [limitAmount, setLimitAmount] = useState(settings?.limit_amount ?? 0)
  const { createProduct } = useShoppingListStore()

  const today = new Date()
  const nameSubCollection = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`

  const [visible, setVisible] = useState(false)

  const [products, setProducts] = useState<Products>(INITIAL_VALUES)

  const [store, setStore] = useState<Products[]>([])
  const [amount, setAmount] = useState(0)

  const toggleDialog = () => {
    setVisible(!visible)
  }

  const handleAddStore = () => {
    const { name, price, quantity } = products

    if (Number.isNaN(Number(price))) {
      Alert.alert('Error', 'The price must be a number, delete all (,)')
      return
    }

    if (name === '') {
      Alert.alert('Error', 'The name is required')
      return
    }

    if (price === '') {
      Alert.alert('Error', 'The price is required')
      return
    }

    const amount = Number(price) * quantity
    setAmount((prev) => prev + amount)
    setStore((prev) => [...prev, products])
    setProducts(INITIAL_VALUES)
  }

  const setItemCollection =
    ({ nameSubCollection }: { nameSubCollection: string }) =>
      () => {
        if (store.length === 0) {
          alert('You must add at least one product')
          return
        }

        const docRef = doc(db, 'shopping', userName, 'list', nameSubCollection)
        createProduct({ product: store, doc: docRef }).then(() => {
          setLimitAmount(settings?.limit_amount ?? 0)
          setAmount(0)
          setStore([])
          alert('Products added successfully')
        })
      }

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}
      >
        <View>
          <Text style={styles.labelAmount}>total</Text>
          <Text style={styles.amount}>
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD'
            }).format(amount)}
          </Text>
        </View>

        <View
          style={{
            alignItems: 'flex-end'
          }}
        >
          <Text style={styles.labelAmount}>amount limit</Text>
          <Text
            style={{
              color: theme.colors.red,
              fontWeight: 'bold',
              fontSize: theme.fontsSize.big
            }}
          >
            {new Intl.NumberFormat('en-ES', {
              style: 'currency',
              currency: 'USD'
            }).format(limitAmount - amount)}
          </Text>
        </View>
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
                {item.price !== null
                  ? new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD'
                  }).format(Number(item.price))
                  : null}
              </Text>
            </View>
          )
        }}
      />

      <View style={styles.navbar}>
        <Pressable style={styles.btn} onPress={toggleDialog}>
          <Image source={require('../../assets/add.png')} />
        </Pressable>
        <Pressable style={styles.btn}>
          <Image source={require('../../assets/delete.png')} />
        </Pressable>
        <Pressable
          style={styles.btn}
          onPress={setItemCollection({ nameSubCollection })}
        >
          <Image source={require('../../assets/upload-data.png')} />
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
            value={products.name}
            onChangeText={(text) => {
              setProducts({ ...products, name: text })
            }}
          />

          <TextInput
            placeholder="0.00"
            style={styles.input}
            value={products.price}
            keyboardType="decimal-pad"
            inputMode="numeric"
            onChangeText={(text) => {
              setProducts({ ...products, price: text })
            }}
          />

          <Counter value={products.quantity} onAction={setProducts} />
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
