import { View, TouchableOpacity, Text, Image } from 'react-native';
import { useTheme } from '@react-navigation/native';

const RoomListScreen = () => {
    const colors = useTheme().colors;

    return (
        <View style={{ height: "100%", backgroundColor: colors.background }}>
            <Text>RoomListScreen</Text>
        </View>
    )
}

export default RoomListScreen