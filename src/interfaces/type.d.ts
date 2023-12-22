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
  ShowShoppingList: undefined
  DetailsShoppingList: { id: string | null }

}

export interface ListItemsProps {
  [key: string]: ShoppingListItem[]
}
