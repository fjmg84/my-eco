export interface Products {
  name: string
  price: number
}

export interface ItemsProps {
  date: number
  products: Products[]
  amount: number
}

export interface RootStackParamList {
  [key: string]: undefined
  Home: undefined
  CreateDate: undefined
  ListDates: undefined
  Details: { id: string | null }

}

export interface ListItemsProps {
  [key: string]: ItemsProps[]
}
