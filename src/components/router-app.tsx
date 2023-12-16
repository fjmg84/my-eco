import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { type RootStackParamList } from '../interfaces/type'
import HomeScreen from '../screens/home'
import ShowShoppingListScreen from '../screens/show-shopping-list'
import CreateShoppingListScreen from '../screens/create-shopping-list'
import DetailsShoppingListScreen from '../screens/details-shopping-list'

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function RouterComponent () {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{
          title: 'My Shopping List'
        }} />
        <Stack.Screen name="ShowShoppingList" component={ShowShoppingListScreen}
        options={{
          title: 'Shopping List By Date'
        }}
        />
        <Stack.Screen name="CreateShoppingList" component={CreateShoppingListScreen}
          options={{
            title: 'Create Shopping List'
          }}
        />
        <Stack.Screen
          name="DetailsShoppingList"
          component={DetailsShoppingListScreen}
          options={{
            title: 'Details Shopping List'
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
