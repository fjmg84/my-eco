import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { type RootStackParamList } from '../interfaces/type'
import HomeScreen from '../screens/home'
import CreateShoppingListScreen from '../screens/create-shopping-list'
import DetailsShoppingListScreen from '../screens/details-shopping-list'
import ListShoppingListByMonthsScreen from '../screens/list-shopping-list-by-months'
import ListShoppingListByYearsScreen from '../screens/list-shopping-list-by-years'
import ListShoppingListByDaysScreen from '../screens/list-shopping-list-by-days'

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function RouterComponent () {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{
          title: 'My Shopping List'
        }} />
        <Stack.Screen name="ListShoppingListByYears" component={ListShoppingListByYearsScreen}
        options={{
          title: 'Shopping List By Year'
        }}
        />
        <Stack.Screen name="ListShoppingListByMonths" component={ListShoppingListByMonthsScreen}
        options={{
          title: 'Shopping List By Month'
        }}
        />
        <Stack.Screen name="ListShoppingListByDays" component={ListShoppingListByDaysScreen}
        options={{
          title: 'Shopping List By Day'
        }}
        />
        <Stack.Screen
          name="DetailsShoppingList"
          component={DetailsShoppingListScreen}
          options={{
            title: 'Details Shopping List'
          }}
        />
          <Stack.Screen name="CreateShoppingList" component={CreateShoppingListScreen}
            options={{
              title: 'Create Shopping List'
            }}
          />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
