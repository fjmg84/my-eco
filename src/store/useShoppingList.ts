import { create } from 'zustand'
import { setDoc, addDoc, collection, getDocs, doc } from 'firebase/firestore'
import { type ShoppingListItem, type Product } from '../interfaces/type'
import { db } from '../firebase/connection-db'

const INITIAL_STATE = {
  amount: 0,
  date: new Date().getTime(),
  products: []
}
interface Response {
  status: boolean
  message: string
}

const TODAY = new Date()

interface ShoppingListState {
  values: ShoppingListItem
  addProduct: (product: Product) => void
  updateProduct: (product: Product) => void
  deleteProduct: () => void
  saveShoppingList: ({ userName }: { userName: string }) => Promise<Response>
  listShoppingListByYears: ({ userName }: { userName: string }) => Promise<string[]>
  listShoppingListByMonths: ({ userName, year }: { userName: string, year: string }) => Promise<any[]>
  listShoppingListByDays: ({ userName, year, month }: { userName: string, year: string, month: string }) => Promise<any[]>
  detailsShoppingList: ({ userName, year, month, day }: { userName: string, year: string, month: string, day: string }) => Promise<ShoppingListItem[]>
}

const useShoppingListStore = create<ShoppingListState>()((set, get) => ({
  values: INITIAL_STATE,
  updateProduct: (product) => {
    set(({ values }) => ({
      values: {
        ...values,
        products:
          values.products.map((ele) => (ele.id === product.id ? product : ele))
      }
    }))
  },

  addProduct: (product) => {
    set(({ values }) => ({
      values: {
        ...values,
        amount: values.amount + (Number(product.price) * product.quantity),
        products: [...values.products, {
          id: get().values.products.length + 1,
          ...product
        }]
      }
    }))
  },

  deleteProduct: () => {
    set(({ values }) => ({
      values: {
        ...values,
        amount: values.products.filter((ele) => !ele.checked).reduce((acc, ele) => acc + (Number(ele.price) * ele.quantity), 0),
        products: values.products.filter((ele) => !ele.checked)
      }
    }))
  },

  saveShoppingList: async ({ userName }) => {
    const year = `${userName}/shopping/years/${TODAY.getFullYear().toString()}`
    const month = `/months/${TODAY.toLocaleString('default', { month: 'long' })}`
    const day = `/days/${TODAY.getDate().toString()}`
    const yearRef = doc(db, year)
    await setDoc(yearRef, {})
    const monthRef = doc(db, `${year}${month}`)
    await setDoc(monthRef, {})
    const dayRef = doc(db, `${year}${month}${day}`)
    await setDoc(dayRef, {})

    const data = {
      date: new Date().getTime(),
      amount: get().values.products.reduce((acc, ele) => acc + (Number(ele.price) * ele.quantity), 0),
      products: get().values.products
    }

    const error = addDoc(
      collection(dayRef, 'items'),
      data
    )
      .then(() => {
        set({ values: INITIAL_STATE })
        return {
          status: false,
          message: 'Shopping list create correctly'
        }
      })
      .catch((err) => {
        return {
          status: true,
          message: err.message
        }
      })

    return await error
  },

  listShoppingListByYears: async ({ userName }) => {
    const listItems: string[] = []
    const collectionRef = collection(db, userName, 'shopping', 'years')
    const response = await getDocs(collectionRef)
    response.forEach((value) => {
      listItems.push(value.id)
    })
    return listItems
  },

  listShoppingListByMonths: async ({ userName, year }) => {
    const listItems: string[] = []
    const collectionRef = collection(db, `${userName}/shopping/years/${year}/months`)
    const response = await getDocs(collectionRef)
    response.forEach((value) => {
      listItems.push(value.id)
    })
    return listItems
  },

  listShoppingListByDays: async ({ userName, year, month }) => {
    const listItems: string[] = []
    const collectionRef = collection(db, userName, 'shopping', 'years', year, 'months', month, 'days')
    const response = await getDocs(collectionRef)
    response.forEach((value) => {
      listItems.push(value.id)
    })
    return listItems
  },

  detailsShoppingList: async ({ userName, year, month, day }) => {
    const listItems: ShoppingListItem[] = []
    const collectionRef = collection(db, userName, 'shopping', 'years', year, 'months', month, 'days', day, 'items')
    const response = await getDocs(collectionRef)
    response.forEach((doc) => {
      listItems.push(doc.data() as ShoppingListItem)
    })
    return listItems
  }
}))

export default useShoppingListStore
