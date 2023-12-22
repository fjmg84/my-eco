import { create } from 'zustand'
import { type DocumentData, type DocumentReference, setDoc, addDoc, collection, getDocs, type CollectionReference } from 'firebase/firestore'
import { type ShoppingListItem, type Product } from '../interfaces/type'
import { type Item } from '../screens/show-shopping-list'

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
  listAllShoppingLists: ({ collectionRef }: { collectionRef: CollectionReference<DocumentData, DocumentData> }) => Promise<Item[]>
  listShoppingListByDate: ({ collectionRef }: { collectionRef: CollectionReference<DocumentData, DocumentData> }) => Promise<any[]>

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

  saveProductList: async ({ doc }) => {
    const amount = get().values.products.reduce((acc, ele) => acc + (Number(ele.price) * ele.quantity), 0)
    await setDoc(doc, {})
    const error = addDoc(
      collection(doc, 'items'),
      {
        date: new Date().getTime(),
        amount,
        products: get().values.products
      }
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

  listAllShoppingLists: async ({ collectionRef }) => {
    const responseDate: Item[] = []
    const response = await getDocs(collectionRef)
    response.forEach((value) => {
      const date = new Date(value.id)
      responseDate.push({
        item: value.id,
        date: date.toDateString()
      })
    })
    return responseDate
  },

  listShoppingListByDate: async ({ collectionRef }) => {
    const querySnapshot = await getDocs(collectionRef)
    const listItems: any[] = []
    querySnapshot.forEach((doc) => {
      listItems.push(doc.data())
    })
    return listItems
  }
}))

export default useShoppingListStore
