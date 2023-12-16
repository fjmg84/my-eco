import { StyleSheet, Text, View } from 'react-native'
import { type ItemsProps } from '../interfaces/type'
import { theme } from '../interfaces/constants'

export default function ShoppingItemsList ({ item }: { item: ItemsProps }) {
  const { products, amount } = item
  const amountFormatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount)
  return (
    <View style={styles.container}>
      {products.map((product, index) => {
        const { name, price, quantity } = product
        const priceFormatted = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD'
        }).format(price)
        const bgColor = index % 2 === 0 ? '#ededed' : 'white'
        return (
          <View key={index} style={{ ...styles.box, backgroundColor: bgColor }}>
            <Text style={{ ...styles.text, width: 150, textAlign: 'left' }}>
              {name}
            </Text>
            <Text style={{ ...styles.text, width: 20, textAlign: 'center' }}>
              {quantity}
            </Text>
            <Text style={{ ...styles.text, width: 100, textAlign: 'right' }}>
              {priceFormatted}
            </Text>
          </View>
        )
      })}
      <View style={{
        padding: 5,
        backgroundColor: theme.colors.red,
        borderRadius: 20,
        marginVertical: 10,
        marginHorizontal: 5
      }}>
        <Text style={styles.amount}>{amountFormatted}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    borderRadius: 10
  },
  amount: {
    color: 'white',
    fontSize: theme.fontsSize.normal,
    fontWeight: 'bold',
    paddingHorizontal: 10
  },
  box: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 10
  },
  text: {
    color: theme.colors.primary,
    fontSize: theme.fontsSize.normal

  },
  divider: {
    backgroundColor: theme.colors.secondary,
    height: 1,
    width: '100%',
    marginBottom: 5
  }
})
