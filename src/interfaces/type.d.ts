export interface Product {
  id?: string | number
  name: string
  price: string
  quantity: number
  checked: boolean
}

export interface ShoppingListItem {
  date: number
  products: Product[]
  amount: number
}

export interface RootStackParamList {
  [key: string]: undefined
  Home: undefined
  CreateShoppingList: undefined
  ListShoppingListByYears: undefined
  ListShoppingListByMonths: { year: string | null }
  ListShoppingListByDays: { year: string | null, month: string | null }
  DetailsShoppingList: { year: string | null, month: string | null, day: string | null }
}

export interface ListItemsProps {
  [key: string]: ShoppingListItem[]
}
