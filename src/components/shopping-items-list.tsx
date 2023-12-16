import { StyleSheet, Text, View } from 'react-native'
import { type ItemsProps } from '../interfaces/type'
import { theme } from '../interfaces/constants'

export default function ShoppingItemsList ({ item }: { item: ItemsProps }) {
  const { products, amount } = item
  const amountFormatted = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
  return (
    <View style={styles.container}>
      {products.map((product, index) => {
        const { name, price, quantity } = product
        const priceFormatted = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price)
        return (
          <View key={index} style={styles.box}>
            <View
              style={{
                flexDirection: 'row',
                padding: 10,
                gap: 5
              }}
            >
              <Text style={{ ...styles.text, width: 170, textAlign: 'left' }}>{name}</Text>
              <Text style={{ ...styles.text, width: 20, textAlign: 'center' }}>{quantity}</Text>
              <Text style={{ ...styles.text, width: 70, textAlign: 'right' }}>{priceFormatted}</Text>
            </View>
            <View style={styles.divider} />
          </View>
        )
      })}
      <Text style={styles.amount}>{amountFormatted}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    padding: 8,
    borderRadius: 10
  },
  amount: {
    color: 'white',
    backgroundColor: theme.colors.red,
    borderRadius: 20,
    fontSize: theme.fontsSize.normal,
    fontWeight: 'bold',
    marginVertical: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    textAlign: 'right'
  },
  box: {
    flexDirection: 'column',
    width: '100%'
  },
  text: {
    color: theme.colors.primary,
    fontSize: theme.fontsSize.normal,
    paddingVertical: 5

  },
  divider: {
    backgroundColor: theme.colors.secondary,
    height: 1,
    width: '100%',
    marginBottom: 5
  }
})
