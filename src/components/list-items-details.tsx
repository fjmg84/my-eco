import { FlatList, StyleSheet, Text, View } from 'react-native'
import { type ItemsProps } from '../interfaces/type'
import { theme } from '../interfaces/contants'

export default function ListItemsDetails ({ items }: { items: ItemsProps[] }) {
  return (
        <FlatList
        data={items}
        renderItem={({ item }) => {
          return (
            <View style={styles.table}>
              <FlatList
                data={item.products}
                style={{ width: '100%' }}
                renderItem={({ item }) => {
                  return (
                    <View style={styles.texts}>
                      <View style={{
                        flexDirection: 'row',
                        gap: 10,
                        padding: 10,
                        width: '100%'
                      }}>
                        <Text style={styles.text}>{item.name}</Text>
                        <Text style={styles.text}>{item.price}</Text>
                      </View>
                      <View style={styles.divider}/>
                    </View>
                  )
                }}
              />
               <Text style={styles.amount}>{item.amount}</Text>
            </View>
          )
        }}
      />
  )
}

const styles = StyleSheet.create({

  table: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    padding: 8,
    borderRadius: 10,
    width: '100%'
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
  texts: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    width: '100%'
  },
  text: {
    color: theme.colors.primary,
    fontSize: theme.fontsSize.body,
    textAlign: 'right',
    width: '100%'
  },
  divider: {
    backgroundColor: theme.colors.secondary,
    height: 1,
    width: '100%'
  }
})
