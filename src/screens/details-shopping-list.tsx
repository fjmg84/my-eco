import { useEffect, useState } from 'react'
import { Text, View, StyleSheet, ScrollView } from 'react-native'
import { type NativeStackScreenProps } from '@react-navigation/native-stack'

import { collection, getDocs } from 'firebase/firestore'
import {
  type ListItemsProps,
  type ItemsProps,
  type RootStackParamList
} from '../interfaces/type'
import { db } from '../firebase/connection-db'
import { theme } from '../interfaces/constants'
import { groupBy, orderArray } from '../services/functions'
import ShoppingItemsList from '../components/shopping-items-list'

type Props = NativeStackScreenProps<RootStackParamList, 'DetailsShoppingList'>

export default function DetailsShoppingListScreen ({ route }: Props) {
  const [items, setItems] = useState<ListItemsProps>({})
  const {
    params: { id }
  } = route

  useEffect(() => {
    if (id !== null) {
      getItemsCollection({ subCollection: id })
    }
  }, [id])

  const getItemsCollection = async ({
    subCollection
  }: {
    subCollection: string
  }) => {
    const collectionRef = collection(
      db,
      'shopping-cart',
      subCollection,
      'items'
    )
    const querySnapshot = await getDocs(collectionRef)
    const listItems: ItemsProps[] = []
    querySnapshot.forEach((doc) => {
      listItems.push(doc.data() as ItemsProps)
    })

    const listItemsOrderByDate = orderArray({ arr: listItems, camp: 'date', type: '>' })
    const listItemsGroupByDate: ListItemsProps = groupBy({
      array: listItemsOrderByDate,
      property: 'date'
    })

    setItems(listItemsGroupByDate)
  }

  return (
    <View style={styles.container}>

      <ScrollView style={styles.scrollview}>
       <View style={{
         width: '100%',
         alignItems: 'center',
         gap: 10
       }}>
         {Object.keys(items).length > 0 &&
          Object.entries(items).map(([key, value], index) => {
            const date = new Date(Number(key))
            return (
              <View key={index} style={styles.card}>
                <Text style={styles.key}>{date.toLocaleString('en-US')}</Text>
                {
                  value.map((item, index) => <ShoppingItemsList key={index} item={item} />)
                }
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
    backgroundColor: theme.colors.yellow,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 10
  },

  scrollview: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 20
  },

  card: {
    flexDirection: 'column',
    backgroundColor: 'white',
    columnGap: 10,
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      height: 5, width: 5
    },
    shadowOpacity: 0.25,
    width: '100%'
  },
  key: {
    backgroundColor: theme.colors.primary,
    borderRadius: 50,
    color: 'white',
    fontSize: theme.fontsSize.small,
    paddingLeft: 10,
    paddingVertical: 5
  }
})
