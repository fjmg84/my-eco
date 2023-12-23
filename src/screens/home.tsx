import { useEffect } from 'react'
import { type NativeStackScreenProps } from '@react-navigation/native-stack'
import { View, StyleSheet } from 'react-native'
import { type RootStackParamList } from '../interfaces/type'
import { ROUTE_NAME, theme } from '../interfaces/constants'
import CustomButton from '../components/common/button'
import useUserStore from '../store/useUser'
import useSettingsStore from '../store/useSettings'
import { MdiFormatListChecks, MdiPencilPlus } from '../components/common/icons'
import Header from '../components/header'

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>

export default function HomeScreen ({ navigation }: Props) {
  const { userName } = useUserStore()
  const { settings, getSettings } = useSettingsStore()

  useEffect(() => {
    getSettings({ username: userName })
  }, [])

  return (
    <View style={styles.container}>
      <Header amount={settings.limit_amount}/>

      <View
        style={{
          width: '100%',
          gap: 10,
          alignItems: 'center'
        }}
      >
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
            <MdiPencilPlus
              width={30}
              height={30}
              stroke={theme.colors.bg_button_primary}
            />
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
            <MdiFormatListChecks
              width={30}
              height={30}
              stroke={theme.colors.bg_button_primary}
            />
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
    backgroundColor: theme.colors.bg_primary,
    alignItems: 'center',
    justifyContent: 'space-around',
    gap: 20
  },

  btnView: {
    backgroundColor: theme.colors.bg_button_primary,
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
