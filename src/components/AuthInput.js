import { useState } from "react";
import { TextInput, View } from "react-native";
import { useTheme } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const AuthInput = ({ placeholder, value, onChange, secure = null }) => {
    const colors = useTheme().colors;
    const [isSecure, setIsSecure] = useState(secure)
    return (
        <View style={{ position: "relative" }}>
            <TextInput
                placeholder={placeholder}
                placeholderTextColor="#bdbbc2"
                autoCapitalize="none"
                secureTextEntry={isSecure}
                value={value}
                onChangeText={(value) => onChange(value)}
                style={{
                    height: 55,
                    borderRadius: 15,
                    backgroundColor: colors.lightGray,
                    color: colors.textPrimary,
                    paddingHorizontal: 22,
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 4,
                    },
                    shadowOpacity: 0.1,
                    shadowRadius: 24,
                    marginBottom: 20
                }}
            />
            {
                isSecure != null && value &&
                <Ionicons
                    name={isSecure ? 'eye-off' : 'eye'}
                    style={{ position: "absolute", right: 10, paddingVertical: 15 }}
                    size={24}
                    color={colors.primary}
                    onPress={() => setIsSecure(!isSecure)}
                />
            }
        </View>
    )
}

export default AuthInput