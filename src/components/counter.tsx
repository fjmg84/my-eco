import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { theme } from '../interfaces/constants'

interface Props {
  value: number
  onAction: React.Dispatch<React.SetStateAction<number>>
}

export default function Counter ({ value = 1, onAction }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.value}>{value}</Text>
      <View style={styles.box}>
        <Pressable
          style={styles.btn}
          onPress={() => {
            onAction((prev) => prev + 1)
          }}
        >
          <Image source={require('../../assets/add-white.png')} />
        </Pressable>
        <Pressable
          style={styles.btn}
          onPress={() => {
            onAction(1)
          }}
        >
          <Image source={require('../../assets/zero.png')} />
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
          <Image source={require('../../assets/less.png')} />
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
