import { create } from 'zustand'
import { type DocumentData, type DocumentReference, setDoc, addDoc, collection } from 'firebase/firestore'
// import { db } from '../firebase/connection-db'
import { type ShoppingListItem, type Product } from '../interfaces/type'
// import { DATA_SEEK } from '../interfaces/constants'

const INITIAL_STATE = {
  amount: 0,
  date: new Date().getTime(),
  products: []
}

interface Response {
  status: boolean
  message: string

}

interface ShoppingListState {
  values: ShoppingListItem
  addProduct: (product: Product) => void
  updateProduct: (product: Product) => void
  deleteProduct: () => void
  saveProductList: ({ doc }: { doc: DocumentReference<DocumentData, DocumentData> }) => Promise<Response>

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
        amount: values.products.filter((ele) => ele?.checked === false).reduce((acc, ele) => acc + (Number(ele.price) * ele.quantity), 0),
        products: values.products.filter((ele) => ele?.checked === false)
      }
    }))
  },
  saveProductList: async ({ doc }) => {
    const error: Response = {
      message: '',
      status: false
    }
    const amount = get().values.products.reduce((acc, ele) => acc + (Number(ele.price) * ele.quantity), 0)
    await setDoc(doc, {})
    addDoc(
      collection(doc, 'items'),
      {
        date: new Date().getTime(),
        amount,
        products: get().values
      }
    )
      .then(() => {
        // TODO: uncomment when finished the test
        set({ values: INITIAL_STATE })
        error.message = 'Shopping list create correctly'
      })
      .catch((err) => {
        error.message = err.message
        error.status = true
      })

    return error
  }
}))

export default useShoppingListStore
