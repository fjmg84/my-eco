import { FlatList, StyleSheet, Text, View } from 'react-native'
import { type Product } from '../../interfaces/type'
import { theme } from '../../interfaces/constants'
import InputChecked from './input-checked'

interface Props {
  products: Product[] | []
}

export default function ShoppingListProducts ({ products = [] }: Props) {
  return (
    <FlatList
      style={styles.scrollView}
      data={products}
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
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 10
            }}
          >
            <InputChecked product={item}/>

            <Text style={{ ...styles.row, width: 200 }}>{item.name}</Text>
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
  )
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'white',
    padding: 10,
    marginVertical: 20,
    borderRadius: 10,
    width: '100%'
  },

  row: {
    fontSize: theme.fontsSize.normal,
    paddingVertical: 5
  },
  checkbox: {
    margin: 8
  }
})
