import Checkbox from 'expo-checkbox'
import { useEffect, useState } from 'react'
import { type Product } from '../../interfaces/type'
import useShoppingListStore from '../../store/useShoppingList'

export default function InputChecked ({ product }: { product: Product }) {
  const [value, setValue] = useState(product)
  const { updateProduct } = useShoppingListStore()

  useEffect(() => {
    updateProduct(value)
  }, [value])

  const handleCkecked = () => {
    setValue({ ...value, checked: !value.checked })
  }

  return (
    <Checkbox
          style={{ margin: 8 }}
          value={value.checked}
          onValueChange={handleCkecked}
          color={value.checked ? '#4630EB' : undefined}
        />
  )
}
