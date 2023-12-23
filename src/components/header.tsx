import { StyleSheet, Text, View } from 'react-native'
import { theme } from '../interfaces/constants'

interface Props {
  amount: number
  amountLastMonth?: number
  amountThisMonth?: number
}

export default function Header ({ amount, amountLastMonth = 0, amountThisMonth = 0 }: Props) {
  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.title}>this mount</Text>
        <Text
          style={{
            ...styles.value,
            fontWeight: 'bold',
            color: theme.colors.bg_button_primary
          }}
        >
          {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
          }).format(amountThisMonth)}
        </Text>
        <View
          style={{
            backgroundColor: theme.colors.color_text_second,
            borderRadius: 50,
            paddingHorizontal: 20,
            paddingVertical: 10,
            flexDirection: 'row',
            gap: 10
          }}
        >
          <Text
            style={{
              ...styles.title,
              color: 'white'
            }}
          >
            last mount
          </Text>
          <Text
            style={{
              ...styles.title,
              fontWeight: 'bold',
              color: 'white'
            }}
          >
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD'
            }).format(amountLastMonth)}
          </Text>
        </View>
      </View>
      <View>
        <Text style={styles.title}>amount limit</Text>

        <Text style={styles.value}>
          {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
          }).format(amount)}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'space-around'
  },
  title: {
    color: theme.colors.color_text_primary,
    fontSize: theme.fontsSize.normal
  },
  value: {
    color: theme.colors.color_text_second,
    fontSize: theme.fontsSize.big,
    fontWeight: 'bold'
  }
})
