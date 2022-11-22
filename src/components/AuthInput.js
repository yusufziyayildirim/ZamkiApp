import { TextInput } from "react-native";
import { useTheme } from '@react-navigation/native';

const AuthInput = ({ placeholder, value, onChange }) => {
    const colors = useTheme().colors;

    return (
        <TextInput
            placeholder={placeholder}
            placeholderTextColor="#bdbbc2"
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
            value={value}
            onChangeText={(value) => onChange(value)}
        />
    )
}

export default AuthInput