export interface Products {
  name: string
  price: string
  quantity: number
}

export interface ItemsProps {
  date: number
  products: Products[]
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
  [key: string]: ItemsProps[]
}
