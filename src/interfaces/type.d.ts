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
  Details: { id: string | null }
}