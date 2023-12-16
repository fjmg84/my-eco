import { type NativeStackScreenProps } from '@react-navigation/native-stack'
import { Pressable, View, Text, StyleSheet } from 'react-native'
import { type RootStackParamList } from '../interfaces/type'
import { theme } from '../interfaces/constants'

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>
export default function HomeScreen ({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Pressable
          style={styles.btn}
          onPress={() => {
            navigation.navigate('CreateShoppingList')
          }}
        >
          <Text style={styles.btnText}>add shopping list</Text>
        </Pressable>

        <Pressable
          style={styles.btn}
          onPress={() => {
            navigation.navigate('ShowShoppingList')
          }}
        >
          <Text style={styles.btnText}>shopping list</Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: theme.colors.yellow,
    alignItems: 'center',
    justifyContent: 'center'
  },

  box: {
    width: '90%',
    flexDirection: 'column',
    gap: 20
  },
  btn: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 40,
    paddingVertical: 20,
    borderRadius: 50,
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center'
  },
  btnText: {
    color: theme.colors.yellow,
    fontSize: theme.fontsSize.big
  }
})
