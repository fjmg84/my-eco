import { StyleSheet, Text, View } from 'react-native'
import { theme } from '../interfaces/constants'
import { type ShoppingListItem } from '../interfaces/type'

export default function ShoppingItemsList ({ item }: { item: ShoppingListItem }) {
  const { products, amount } = item

  return (
    <View style={styles.container}>
      {products.map((product, index) => {
        const { name, price, quantity } = product
        const priceFormatted = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD'
        }).format(Number(price))
        const bgColor = index % 2 === 0 ? theme.colors.bg_second : '#ededed'
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
        backgroundColor: theme.colors.color_text_second,
        borderRadius: 50,
        marginVertical: 15,
        marginHorizontal: 5
      }}>
        <Text style={{
          color: 'white',
          fontSize: theme.fontsSize.normal,
          fontWeight: 'bold',
          paddingHorizontal: 10
        }}>{
        new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD'
        }).format(amount)}</Text>
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
  box: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 10
  },
  text: {
    color: theme.colors.color_text_primary,
    fontSize: theme.fontsSize.normal

  },
  divider: {
    backgroundColor: theme.colors.bg_button_primary,
    height: 1,
    width: '100%',
    marginBottom: 5
  }
})
