import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { useEffect, useState } from 'react'
import { theme } from '../../interfaces/constants'

interface Props {
  value: number
  onReturnCounter: (counter: number) => void
}

export default function Counter ({ value, onReturnCounter }: Props) {
  const [counter, setCounter] = useState(1)

  useEffect(() => { setCounter(value) }, [value])

  useEffect(() => {
    onReturnCounter(counter)
  }, [counter])

  return (
    <View style={styles.container}>

      <View style={styles.box}>
        <Pressable
          style={styles.btn}
          onPress={() => {
            setCounter(counter + 1)
          }}
        >
          <Image source={require('../../../assets/add-white.png')} />
        </Pressable>
        <View style={{
          backgroundColor: 'white',
          height: 50,
          width: 50,
          borderRadius: 50,
          alignItems: 'center',
          justifyContent: 'center'
        }}>
        <Text style={styles.value}>{counter}</Text>
        </View>
        <Pressable
          style={styles.btn}
          onPress={() => {
            setCounter((prev) => {
              if (counter > 1) {
                return counter - 1
              }
              return prev
            })
          }}
        >
          <Image source={require('../../../assets/less.png')} />
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
    gap: 10
  },
  box: {
    flexDirection: 'row',
    backgroundColor: theme.colors.blue,
    borderRadius: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 71,
    paddingHorizontal: 20
  },
  value: {
    color: theme.colors.black_light,
    fontSize: theme.fontsSize.big
  },
  btn: {
    height: 50,
    width: 50,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
