import { type Key, useEffect, useState } from 'react'
import { Text, View, StyleSheet, ScrollView, Alert } from 'react-native'
import { type NativeStackScreenProps } from '@react-navigation/native-stack'
import {
  type ShoppingListItem,
  type RootStackParamList
} from '../interfaces/type'
import { theme } from '../interfaces/constants'
import { groupBy, orderArray } from '../services/functions'
import ShoppingItemsList from '../components/shopping-items-list'
import useUserStore from '../store/useUser'
import useShoppingListStore from '../store/useShoppingList'

type Props = NativeStackScreenProps<RootStackParamList, 'DetailsShoppingList'>

export default function DetailsShoppingListScreen ({ route }: Props) {
  const [items, setItems] = useState<ShoppingListItem[]>([])
  const { userName } = useUserStore()
  const { detailsShoppingList } = useShoppingListStore()
  const {
    params: { year, month, day }
  } = route

  useEffect(() => {
    if (year !== null && month !== null && day !== null) {
      detailsShoppingList({ userName, year, month, day })
        .then((response) => {
          const itemsOrderByDate = orderArray({
            arr: response,
            camp: 'date',
            type: '>'
          })
          const itemsGroupByDate: ShoppingListItem[] = groupBy({
            array: itemsOrderByDate,
            property: 'date'
          })
          setItems(itemsGroupByDate)
        })
        .catch((error) => {
          Alert.alert(`${error}`)
        })
    }
  }, [])

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll}>
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            gap: 10
          }}
        >
          {Object.keys(items).length > 0 &&
            Object.entries(items).map(([key, value], index) => {
              const date = new Date(Number(key))
              return (
                <View key={index} style={styles.card}>
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: theme.colors.bg_button_primary,
                      paddingVertical: 15
                    }}
                  >
                    <Text style={{
                      color: 'white',
                      fontSize: theme.fontsSize.normal
                    }}>
                      {date.toLocaleString('en-US')}
                    </Text>
                  </View>
                  {value.map((item: ShoppingListItem, index: Key | null | undefined) => (
                    <ShoppingItemsList key={index} item={item} />
                  ))}
                </View>
              )
            })}
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.bg_primary,
    alignItems: 'center',
    justifyContent: 'center'
  },

  scroll: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 20,
    marginVertical: 10
  },
  card: {
    flexDirection: 'column',
    backgroundColor: 'white',
    columnGap: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      height: 5,
      width: 5
    },
    shadowOpacity: 0.25,
    width: '100%'
  }
})
