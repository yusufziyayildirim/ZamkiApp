import { useTheme } from "@react-navigation/native";
import { Text, TouchableOpacity } from "react-native";

const ActionButton = ({ value, onPress = null, disabled = false }) => {
    const colors = useTheme().colors;
    const handlePress = () => {
        onPress()
    }

    return (
        <TouchableOpacity
            disabled={disabled}
            style={{ backgroundColor: colors.primary, height: 55, borderRadius: 15, alignItems: "center", justifyContent: "center", marginTop: 10 }}
            onPress={handlePress}
        >
            {disabled
                ? <Text style={{ fontWeight: "600", color: "#fff" }}>Loading...</Text>
                : <Text style={{ fontWeight: "600", color: "#fff" }}>{value}</Text>
            }
        </TouchableOpacity>
    )
}

export default ActionButton