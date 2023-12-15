import { StyleSheet, Text, View } from 'react-native'
import { type ItemsProps } from '../interfaces/type'
import { theme } from '../interfaces/constants'

export default function ListItemsDetails ({ item }: { item: ItemsProps }) {
  const { products } = item
  return (
    <View style={styles.container}>
      {products.map((product, index) => {
        const { name, price } = product
        return (
          <View key={index} style={styles.box}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                gap: 10,
                padding: 10
              }}
            >
              <Text style={styles.text}>{name}</Text>
              <Text style={{ ...styles.text }}>{price}</Text>
            </View>
            <View style={styles.divider} />
          </View>
        )
      })}
      <Text style={styles.amount}>{item.amount}</Text>
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
    fontSize: theme.fontsSize.body,
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
    fontSize: theme.fontsSize.body,
    textAlign: 'right'

  },
  divider: {
    backgroundColor: theme.colors.secondary,
    height: 1,
    width: '100%'
  }
})
