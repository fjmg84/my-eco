import { Link } from '@react-navigation/native'
import { StyleSheet, View, FlatList, Text } from 'react-native'
import { theme } from '../interfaces/contants'

interface ItemsLinkProps {
  items: string[]
}

export default function ListItemsLink ({ items }: ItemsLinkProps) {
  return (
    <View style={styles.links}>
      <FlatList
        data={items}
        renderItem={({ item }) =>
          <Link to={{
            screen: 'Details',
            params: { id: item }
          }}>
            <View style={styles.link}>
              <Text style={styles.text}>{item}</Text>
            </View>
          </Link>
      }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  links: {
    width: '100%'
  },
  link: {
    backgroundColor: theme.colors.primary,
    width: '100%',
    padding: 20,
    alignItems: 'center',
    borderTopColor: 'white'
  },
  text: {
    color: 'white',
    fontSize: theme.fontsSize.body
  }
})
