import { useEffect, useState } from 'react'
import { StyleSheet, View, Alert, FlatList, Text } from 'react-native'
import { theme } from '../interfaces/constants'
import useUserStore from '../store/useUser'
import useShoppingListStore from '../store/useShoppingList'
import { Link } from '@react-navigation/native'

export interface Item {
  item: string
  date: string
}

export default function ListShoppingListByYearsScreen () {
  const [years, setYears] = useState<string[]>([])
  const { userName } = useUserStore()
  const { listShoppingListByYears } = useShoppingListStore()

  console.log(years)

  useEffect(() => {
    listShoppingListByYears({ userName })
      .then((response) => {
        setYears(response)
      })
      .catch((error) => {
        Alert.alert(`${error}`)
      })
  }, [])

  return (
    <View style={styles.container}>
      {
        <FlatList
          style={{ width: '100%' }}
          data={years}
          renderItem={({ item }) => (
            <Link
              to={{
                screen: 'ListShoppingListByMonths',
                params: { year: item }
              }}
              style={styles.link}
            >
              <Text style={styles.text}>{item}</Text>
            </Link>
          )}
        />
      }
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
  link: {
    backgroundColor: theme.colors.bg_button_primary,
    borderColor: theme.colors.bg_button_primary,
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
