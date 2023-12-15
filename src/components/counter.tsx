import { Pressable, StyleSheet, Text, View } from 'react-native'
import { theme } from '../interfaces/constants'
import Chips from './chips'

interface Props {
  value: number
  onAction: React.Dispatch<React.SetStateAction<number>>
}

export default function Counter ({ value = 1, onAction }: Props) {
  return (
    <View style={styles.container}>

      <Chips value={value} message='Product quantity' customStyle={{
        backgroundColor: theme.colors.primary
      }} />

      <View style={styles.box}>
        <Pressable
          style={styles.btn}
          onPress={() => {
            onAction((prev) => prev + 1)
          }}
        >
          <Text
            style={{
              color: theme.colors.yellow,
              fontSize: theme.fontsSize.big,
              fontWeight: 'bold'
            }}
          >
            +
          </Text>
        </Pressable>
        <Pressable
          style={styles.btn}
          onPress={() => {
            onAction(1)
          }}
        >
          <Text
            style={{
              color: theme.colors.yellow,
              fontSize: theme.fontsSize.big,
              fontWeight: 'bold'
            }}
          >
            0
          </Text>
        </Pressable>
        <Pressable
          style={styles.btn}
          onPress={() => {
            onAction((prev) => {
              if (prev > 1) {
                return prev - 1
              }
              return prev
            })
          }}
        >
          <Text
            style={{
              color: theme.colors.yellow,
              fontSize: theme.fontsSize.big,
              fontWeight: 'bold'
            }}
          >
            -
          </Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20
  },
  box: {
    flexDirection: 'row'
  },
  quantity: {
    borderRadius: 100,
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primary
  },
  btn: {
    backgroundColor: theme.colors.primary,
    width: 90,
    height: 90,
    alignItems: 'center',
    justifyContent: 'center'

  }
})
