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

import { type Product } from '../interfaces/type'
import useUserStore from '../store/useUser'
import useSettingsStore from '../store/useSettings'
import useShoppingListStore from '../store/useShoppingList'
import ShoppingListCreateForm from '../components/common/shopping-list-create-form'
import ShoppingListProducts from '../components/common/shopping-list-product'
import { theme } from '../interfaces/constants'

const INITIAL_VALUES = {
  name: '',
  price: '',
  quantity: 1,
  checked: false
}

export default function CreateShoppingScreen () {
  const { userName } = useUserStore()
  const { settings: { limit_amount: limitAmount }, updateSettings, getSettings } = useSettingsStore()
  const { values: products, deleteProduct, saveProductList, addProduct } = useShoppingListStore()

  const today = new Date()
  const nameSubCollection = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`

  const [visible, setVisible] = useState(false)
  const [product, setProduct] = useState<Product>(INITIAL_VALUES)

  const toggleDialog = () => {
    setVisible(!visible)
  }

  // Add values to product state
  const handleProduct = ({ name, value }: { name: string, value: string | number }) => {
    setProduct((prev) => {
      return { ...prev, [name]: value }
    })
  }

  // Add product from form to global store product
  const handleAddProductToStore = () => {
    const { name, price } = product

    if (price.length === 0 || name.length === 0) {
      Alert.alert('Error', 'The name and price is required.')
      return
    }

    if (Number.isNaN(Number(price))) {
      Alert.alert('Error', 'The price must be a number.')
      return
    }

    addProduct(product)
    setProduct(INITIAL_VALUES)
  }

  const handleSaveShoppingList =
    ({ nameSubCollection }: { nameSubCollection: string }) =>
      async () => {
        if (products.products.length === 0) {
          alert('You must add at least one product')
          return
        }

        const docRef = doc(db, 'shopping', userName, 'list', nameSubCollection)
        const { message, status } = await saveProductList({ doc: docRef })
        if (!status) {
          updateSettings({
            username: userName,
            settings: {
              limit_amount: products.amount
            }
          })

          getSettings({ username: userName })
        }
        alert(message)
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
            }).format(products.amount)}
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
            }).format(limitAmount - products.amount)}
          </Text>
        </View>
      </View>

      <ShoppingListProducts products={products.products} />

      <View style={styles.navbar}>
        <Pressable style={styles.btn} onPress={toggleDialog}>
          <Image source={require('../../assets/add.png')} />
        </Pressable>
        <Pressable style={styles.btn}
          onPress={deleteProduct}
        >
          <Image source={require('../../assets/delete.png')} />
        </Pressable>
        <Pressable
          style={styles.btn}
          onPress={handleSaveShoppingList({ nameSubCollection })}
        >
          <Image source={require('../../assets/upload-data.png')} />
        </Pressable>
      </View>

      <ShoppingListCreateForm
        handleAddStore={handleAddProductToStore}
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
