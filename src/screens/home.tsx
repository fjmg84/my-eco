import { type NativeStackScreenProps } from '@react-navigation/native-stack'
import { Pressable, View, Text, StyleSheet } from 'react-native'
import { type RootStackParamList } from '../interfaces/type'
import { theme } from '../interfaces/constants'

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>
export default function HomeScreen ({ navigation }: Props) {
  return (
        <View style={styles.container}>
          <View style={styles.btns}>

          <Pressable onPress={() => {
            navigation.navigate('Create')
          }}>
                <Text style={styles.btn}>Create Dates</Text>
            </Pressable>

            <Pressable onPress={() => {
              navigation.navigate('ListDates')
            }}>
                <Text style={styles.btn}>List Dates</Text>
            </Pressable>
              </View>
        </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: theme.colors.yellow
  },

  btns: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-evenly'

  },
  btn: {
    backgroundColor: theme.colors.primary,
    fontSize: theme.fontsSize.big,
    color: theme.colors.yellow,
    paddingHorizontal: 40,
    paddingVertical: 20,
    borderRadius: 50
  }
})
