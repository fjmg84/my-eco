import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import HomeScreen from '../screens/home'
import DetailsScreen from '../screens/details'
import { type RootStackParamList } from '../interfaces/type'

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function RouterComponent () {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen
            name="Details"
            component={DetailsScreen}
            initialParams={{ id: null }}
          />
        </Stack.Navigator>
      </NavigationContainer>
  )
}
