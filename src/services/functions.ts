export const orderArray = ({ arr = [], camp, type = '<' }: { arr: any[], camp?: string, type?: '<' | '>' }) => {
  return [...arr].sort((a, b) => {
    if (camp != null) {
      return type === '>' ? b[camp] - a[camp] : a[camp] - b[camp]
    } else {
      return type === '>' ? b - a : a - b
    }
  })
}

export const groupBy = ({ array = [], property = '' }: { array: any[], property: string }) => {
  return array.reduce((acc, obj) => {
    const key = obj[property]
    const curGroup = acc[key] ?? []

    return { ...acc, [key]: [...curGroup, obj] }
  }, {})
}
