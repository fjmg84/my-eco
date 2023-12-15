import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import DetailsScreen from '../screens/details'
import { type RootStackParamList } from '../interfaces/type'
import CreateScreen from '../screens/create'
import ListDatesScreen from '../screens/list-dates'
import HomeScreen from '../screens/home'

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function RouterComponent () {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ListDates" component={ListDatesScreen} />
        <Stack.Screen name="Create" component={CreateScreen} />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
