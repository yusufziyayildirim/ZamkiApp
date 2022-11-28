import { View, TouchableOpacity, Text, Image } from 'react-native';
import { useTheme } from '@react-navigation/native';

const ProfileScreen = () => {
  const colors = useTheme().colors;

    return (
        <View>
            <Text>ProfileScreen</Text>
        </View>
    )
}

export default ProfileScreen