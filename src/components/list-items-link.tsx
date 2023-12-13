import { StyleSheet, View, Text, FlatList } from 'react-native'

interface ItemsLinkProps {
  items: string[]
}

export default function ListItemsLink ({ items }: ItemsLinkProps) {
  return (
    <View style={styles.links}>
      <FlatList
        data={items}
        renderItem={({ item }) =>
          <View style={styles.link}>
            <Text style={styles.text}>{item}</Text>
          </View>
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
    backgroundColor: 'rgb(54 83 20)',
    width: '100%',
    padding: 20,
    alignItems: 'center',
    borderTopColor: 'white'
  },
  text: {
    color: 'white',
    fontSize: 16
  }
})
