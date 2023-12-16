import { Link } from '@react-navigation/native'
import { StyleSheet, Text, View } from 'react-native'
import { theme } from '../interfaces/constants'
import { type Item } from '../screens/list-dates'

export default function ListItemsLink ({ item }: { item: Item }) {
  const { item: id, date } = item

  return <Link
        to={{
          screen: 'Details',
          params: { id }
        }}
        style={styles.link}
        >
          <View>
          <Text style={styles.text}>{id}</Text>
          <Text style={styles.subtext}>({date})</Text>
          </View>
      </Link>
}

const styles = StyleSheet.create({
  link: {
    textAlign: 'center',
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.yellow,
    borderStyle: 'solid',
    borderTopWidth: 1,
    padding: 35
  },
  text: {

    color: theme.colors.yellow,
    fontSize: theme.fontsSize.normal
  },
  subtext: {
    color: theme.colors.red,
    fontSize: theme.fontsSize.small
  }
})
