import React, { useState } from 'react'
import { doc } from 'firebase/firestore'
import { db } from '../firebase/connection-db'
import {
  Pressable,
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  Alert
} from 'react-native'
import { theme } from '../interfaces/constants'

import { type Products } from '../interfaces/type'
import useUserStore from '../store/useUser'
import useSettingsStore from '../store/useSettings'
import useShoppingListStore from '../store/useShoppingList'
import ShoppingListCreateForm from '../components/common/shopping-list-create-form'
import ShoppingListProducts from '../components/common/shopping-list-product'

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

  const [product, setProduct] = useState<Products>(INITIAL_VALUES)
  const [store, setStore] = useState<Products[]>([])
  const [amount, setAmount] = useState(0)

  const toggleDialog = () => {
    setVisible(!visible)
  }

  const handleProduct = ({ name, value }: { name: string, value: string | number }) => {
    setProduct((prev) => {
      return { ...prev, [name]: value }
    })
  }

  const handleAddStore = () => {
    const { name, price, quantity } = product

    if (price.length === 0) {
      Alert.alert('Error', 'The price is required.')
      return
    }

    if (name.length === 0) {
      Alert.alert('Error', 'The name is required.')
      return
    }

    if (Number.isNaN(Number(price))) {
      Alert.alert('Error', 'The price must be a number.')
      return
    }

    const amount = Number(price) * quantity
    setAmount((prev) => prev + amount)
    setStore((prev) => [...prev, product])
    setProduct(INITIAL_VALUES)
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

      <ShoppingListProducts products={store}/>

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

      <ShoppingListCreateForm
        handleAddStore={handleAddStore}
        product={product}
        handleProduct={handleProduct}
        toggleDialog={toggleDialog}
        visible={visible}
      />
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
  }

})
