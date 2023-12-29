import React, { useState } from 'react'
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
import Chips from '../components/common/chips'

const INITIAL_VALUES = {
  name: '',
  price: '',
  quantity: 1,
  checked: false
}

export default function CreateShoppingScreen () {
  const { userName } = useUserStore()
  const {
    settings: { amount_limit: amountLimit },
    updateSettings,
    getSettings
  } = useSettingsStore()
  const {
    values: products,
    deleteProduct,
    saveShoppingList,
    addProduct
  } = useShoppingListStore()

  const [visible, setVisible] = useState(false)
  const [product, setProduct] = useState<Product>(INITIAL_VALUES)

  const toggleDialog = () => {
    setVisible(!visible)
  }

  // Add values to product state
  const handleProduct = ({
    name,
    value
  }: {
    name: string
    value: string | number
  }) => {
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

  // Add shopping list to firebase
  const handleSaveShoppingList =
    ({ userName }: { userName: string }) =>
      async () => {
        if (products.products.length === 0) {
          alert('You must add at least one product')
          return
        }

        const { message, status } = await saveShoppingList({ userName })

        if (!status) {
          updateSettings({
            userName,
            settings: {
              amount_limit: amountLimit - products.amount
            }
          })

          getSettings({ userName })
        }
        alert(message)
      }

  const productSelectedToDelete = products.products.filter(({ checked }) => checked)

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
              color: theme.colors.color_text_second,
              fontWeight: 'bold',
              fontSize: theme.fontsSize.big
            }}
          >
            {new Intl.NumberFormat('en-ES', {
              style: 'currency',
              currency: 'USD'
            }).format(amountLimit - products.amount)}
          </Text>
        </View>
      </View>

      <ShoppingListProducts products={products.products} />

      <View style={styles.navbar}>
        <Pressable style={styles.btn} onPress={toggleDialog}>
          <Image source={require('../../assets/add.png')} />
        </Pressable>
        <Pressable style={styles.btn} onPress={deleteProduct}>
          <View style={{
            position: 'relative'
          }}>
            <Image source={require('../../assets/delete.png')} />
            {
              productSelectedToDelete.length > 0 && (
                <Chips value={productSelectedToDelete.length} />
              )
            }
          </View>
        </Pressable>
        <Pressable
          style={styles.btn}
          onPress={handleSaveShoppingList({ userName })}
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
    backgroundColor: theme.colors.bg_primary,
    padding: 10,
    position: 'relative',
    alignItems: 'center'
  },
  labelAmount: {
    color: theme.colors.bg_button_primary,
    fontSize: theme.fontsSize.small
  },
  amount: {
    fontSize: theme.fontsSize.big,
    fontWeight: '900',
    color: theme.colors.bg_button_primary
  },
  row: {
    fontSize: theme.fontsSize.normal,
    paddingVertical: 5
  },
  navbar: {
    backgroundColor: theme.colors.bg_button_primary,
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
