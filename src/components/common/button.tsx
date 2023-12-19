import { type NativeStackNavigationProp } from '@react-navigation/native-stack'
import {
  Pressable,
  Text,
  type StyleProp,
  type ViewStyle,
  type TextStyle,
  View
} from 'react-native'
import { type RootStackParamList } from '../../interfaces/type'

interface Props {
  stylesButton: StyleProp<ViewStyle>
  stylesText: StyleProp<TextStyle>
  navigation: NativeStackNavigationProp<RootStackParamList, string, undefined>
  route: string
  text: string
  children?: JSX.Element
}

export default function CustomButton ({
  stylesButton,
  stylesText,
  navigation,
  route,
  text,
  children
}: Props) {
  return (
    <Pressable
      style={stylesButton}
      onPress={() => {
        navigation.navigate(route)
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10
        }}
      >
        <Text style={stylesText}>{text}</Text>

         {children}

      </View>
    </Pressable>
  )
}
