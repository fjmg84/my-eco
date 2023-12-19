import { type NativeStackScreenProps } from '@react-navigation/native-stack'
import { View, StyleSheet, Image } from 'react-native'
import { type RootStackParamList } from '../interfaces/type'
import { ROUTE_NAME, theme } from '../interfaces/constants'
import CustomButton from '../components/common/button'

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>
export default function HomeScreen ({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <CustomButton
        navigation={navigation}
        route={ROUTE_NAME.CREATE_SHOPPING_LIST}
        text="create shopping list"
        stylesButton={styles.btnView}
        stylesText={styles.btnText}
      >
        <View
          style={{
            backgroundColor: 'white',
            width: 40,
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 50
          }}
        >
          <Image source={require('../../assets/arrow-top-right.png')} />
        </View>
      </CustomButton>

      <CustomButton
        navigation={navigation}
        route={ROUTE_NAME.SHOW_SHOPPING_LIST}
        text="show shopping list"
        stylesButton={styles.btnView}
        stylesText={styles.btnText}
      >
        <View
          style={{
            backgroundColor: 'white',
            width: 40,
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 50
          }}
        >
          <Image source={require('../../assets/list-enum.png')} />
        </View>
      </CustomButton>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: theme.colors.yellow,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20
  },

  btnView: {
    backgroundColor: theme.colors.blue,
    borderRadius: 50,
    alignItems: 'center',
    width: '90%',
    height: 71,
    justifyContent: 'center'
  },
  btnText: {
    color: 'white',
    fontSize: theme.fontsSize.normal
  }
})
