import { Text } from 'react-native'
import { theme } from '../../interfaces/constants'

interface Props {
  value: number
}

export default function Chips ({ value }: Props) {
  return (
    <Text
      style={{
        position: 'absolute',
        top: -15,
        right: -15,
        fontSize: theme.fontsSize.small,
        fontWeight: 'bold',
        color: 'white',
        width: 20,
        height: 20,
        backgroundColor: theme.colors.red,
        textAlign: 'center',
        borderRadius: 50
      }}
    >
      {value}
    </Text>
  )
}
