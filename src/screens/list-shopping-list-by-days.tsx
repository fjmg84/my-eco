import { useEffect, useState } from 'react'
import { StyleSheet, View, Alert, FlatList, Text } from 'react-native'
import { theme } from '../interfaces/constants'
import useUserStore from '../store/useUser'
import useShoppingListStore from '../store/useShoppingList'
import { Link } from '@react-navigation/native'
import { type RootStackParamList } from '../interfaces/type'
import { type NativeStackScreenProps } from '@react-navigation/native-stack'

type Props = NativeStackScreenProps<RootStackParamList, 'ListShoppingListByDays'>

export default function ListShoppingListByDaysScreen ({ route }: Props) {
  const [months, setMonths] = useState<any[]>([])
  const { userName } = useUserStore()
  const { listShoppingListByDays } = useShoppingListStore()
  const { params: { month, year } } = route

  useEffect(() => {
    if (month !== null && year !== null) {
      listShoppingListByDays({ userName, year, month })
        .then((response) => {
          setMonths(response)
        })
        .catch((error) => {
          Alert.alert(`${error}`)
        })
    }
  }, [])

  return (
    <View style={styles.container}>
      {
        <FlatList
          style={{ width: '100%' }}
          data={months}
          renderItem={({ item }) => (
            <Link
              to={{
                screen: 'DetailsShoppingList',
                params: {
                  day: item,
                  month,
                  year
                }
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
