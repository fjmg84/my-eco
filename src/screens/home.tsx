import { useEffect } from 'react'
import { type NativeStackScreenProps } from '@react-navigation/native-stack'
import { View, StyleSheet, Image, Text } from 'react-native'
import { type RootStackParamList } from '../interfaces/type'
import { ROUTE_NAME, theme } from '../interfaces/constants'
import CustomButton from '../components/common/button'
import useUserStore from '../store/useUser'
import useSettingsStore from '../store/useSettings'

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>

export default function HomeScreen ({ navigation }: Props) {
  const { userName } = useUserStore()
  const { settings, getSettings } = useSettingsStore()

  useEffect(() => {
    getSettings({ username: userName })
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>limit by mount</Text>
        {
          settings?.limit_amount !== undefined &&
          <Text style={styles.value}>{new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
          }).format(settings.limit_amount)}</Text>
        }
      </View>

      <View style={{
        width: '100%',
        gap: 10,
        alignItems: 'center'
      }}>

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
            width: 50,
            height: 50,
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
            width: 50,
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 50
          }}
        >
          <Image source={require('../../assets/list-enum.png')} />
        </View>
      </CustomButton>

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
    justifyContent: 'space-around',
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
  },
  header: {
    width: '100%'
  },
  title: {
    color: theme.colors.black_light,
    fontSize: theme.fontsSize.normal
  },
  value: {
    color: theme.colors.red,
    fontSize: theme.fontsSize.big,
    fontWeight: 'bold'
  }
})
