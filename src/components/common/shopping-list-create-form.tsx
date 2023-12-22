import { Image, Pressable, StyleSheet, TextInput, View } from 'react-native'
import { Dialog } from '@rneui/themed'

import Counter from './counter'
import { theme } from '../../interfaces/constants'
import { type Product } from '../../interfaces/type'

interface Props {
  product: Product
  visible: boolean
  toggleDialog: () => void
  handleProduct: ({ name, value }: { name: string, value: string | number }) => void
  handleAddStore: () => void
}

export default function ShoppingListCreateForm ({
  product,
  visible,
  handleProduct,
  toggleDialog,
  handleAddStore
}: Props) {
  const handleQuantity = (value: number) => {
    handleProduct({ name: 'quantity', value })
  }

  return (
    <Dialog
      overlayStyle={styles.dialog}
      isVisible={visible}
      onBackdropPress={toggleDialog}
    >
      <View style={{ gap: 10 }}>
        <TextInput
          placeholder="product"
          style={styles.input}
          value={product.name}
          onChangeText={(text) => {
            handleProduct({ name: 'name', value: text })
          }}
        />

        <TextInput
          placeholder="0.00"
          style={styles.input}
          value={product.price}
          keyboardType="decimal-pad"
          inputMode="numeric"
          onChangeText={(text) => {
            handleProduct({ name: 'price', value: text })
          }}
        />

        <Counter value={product.quantity} onReturnCounter={handleQuantity} />
      </View>

      <View style={styles.navbar}>
        <Pressable style={styles.btn} onPress={handleAddStore}>
          <Image source={require('../../../assets/accept.png')} />
        </Pressable>

        <Pressable style={styles.btn} onPress={toggleDialog}>
          <Image source={require('../../../assets/cancel.png')} />
        </Pressable>
      </View>
    </Dialog>
  )
}

const styles = StyleSheet.create({
  dialog: {
    borderRadius: 10,
    justifyContent: 'space-between',
    height: 450,
    padding: 20,
    width: '90%'
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
