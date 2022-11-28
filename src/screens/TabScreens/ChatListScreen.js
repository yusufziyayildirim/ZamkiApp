import { View, TouchableOpacity, Text, Image } from 'react-native';
import { useTheme } from '@react-navigation/native';

const ChatListScreen = () => {
  const colors = useTheme().colors;

    return (
        <View>
            <Text>ChatList</Text>
        </View>
    )
}

export default ChatListScreen