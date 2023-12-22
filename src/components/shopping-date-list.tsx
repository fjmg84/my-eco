import { Link } from '@react-navigation/native'
import { StyleSheet, Text } from 'react-native'
import { theme } from '../interfaces/constants'
import { type Item } from '../screens/show-shopping-list'

export default function ShoppingDateList ({ item }: { item: Item }) {
  const { item: id, date } = item

  return (
    <Link
      to={{
        screen: 'DetailsShoppingList',
        params: { id }
      }}
      style={styles.container}
    >
      <Text style={styles.text}>{date}</Text>
    </Link>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.blue,
    borderColor: theme.colors.yellow,
    borderStyle: 'solid',
    borderTopWidth: 1,
    paddingVertical: 30,
    textAlign: 'center'
  },
  text: {
    textAlign: 'center',
    color: 'white',
    fontSize: theme.fontsSize.normal
  }

})
