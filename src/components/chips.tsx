import { Text, View, StyleSheet } from 'react-native'
import { theme } from '../interfaces/constants'

interface Props {
  value: string | number
  message?: string
  customStyle?: { [key: string]: string | number }
}

export default function Chips ({ value, message, customStyle }: Props) {
  return (
    <View style={{
      ...customStyle,
      ...styles.amount
    }}>
      {
        message !== undefined && <Text style={styles.amountTitle}>{message}</Text>
      }
      <View style={styles.amountBoxText}>
        <Text style={styles.amountText}>{value}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  amount: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    padding: 2,
    flexDirection: 'row'
  },
  amountTitle: {
    color: 'white',
    fontSize: theme.fontsSize.normal,
    paddingHorizontal: 20
  },
  amountBoxText: {
    backgroundColor: 'white',
    width: 50,
    height: 50,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  amountText: {
    color: theme.colors.red,
    fontSize: theme.fontsSize.big
  }
})
