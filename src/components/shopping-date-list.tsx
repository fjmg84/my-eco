import { Link } from '@react-navigation/native'
import { StyleSheet, Text, View } from 'react-native'
import { theme } from '../interfaces/constants'
import { type Item } from '../screens/show-shopping-list'

export default function ShoppingDateList ({ item }: { item: Item }) {
  const { item: id, date } = item

  return <Link
        to={{
          screen: 'DetailsShoppingList',
          params: { id }
        }}
        style={styles.link}
        >
          <View style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <Text style={styles.text}>{id}</Text>
          <Text style={styles.subtext}>({date})</Text>
          </View>
      </Link>
}

const styles = StyleSheet.create({
  link: {
    backgroundColor: theme.colors.blue,
    borderColor: theme.colors.yellow,
    borderStyle: 'solid',
    borderTopWidth: 1,
    padding: 35
  },
  text: {
    textAlign: 'center',
    color: 'white',
    fontSize: theme.fontsSize.normal
  },
  subtext: {
    color: theme.colors.black_light,
    fontSize: theme.fontsSize.small
  }
})
