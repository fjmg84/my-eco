import { create } from 'zustand'
import { type DocumentData, type DocumentReference, setDoc, addDoc, collection } from 'firebase/firestore'
// import { db } from '../firebase/connection-db'
import { type Products } from '../interfaces/type'

interface ShoppingListState {
  products: Products[] | []
  createProduct: ({ product, doc }: { product: Products[], doc: DocumentReference<DocumentData, DocumentData> }) => Promise<void>
}

const useShoppingListStore = create<ShoppingListState>()((set) => ({
  products: [],
  createProduct: async ({ product, doc }) => {
    const amount = product.reduce((acc, ele) => acc + (ele.price * ele.quantity), 0)
    await setDoc(doc, {})
    await addDoc(
      collection(doc, 'items'),
      {
        date: new Date().getTime(),
        amount,
        products: product
      }
    )
  }
}))

export default useShoppingListStore
