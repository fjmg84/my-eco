import { type NativeStackScreenProps } from '@react-navigation/native-stack'
import { Pressable, View, Text, StyleSheet } from 'react-native'
import { type RootStackParamList } from '../interfaces/type'
import { theme } from '../interfaces/contants'

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>
export default function HomeScreen ({ navigation }: Props) {
  return (
        <View style={styles.container}>
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
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btn: {
    backgroundColor: theme.colors.primary,
    fontSize: theme.fontsSize.body,
    color: 'white',
    padding: 10
  }
})
