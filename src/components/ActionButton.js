import { useTheme } from "@react-navigation/native";
import { Text, TouchableOpacity, ActivityIndicator } from "react-native";

//Store
import { useDispatch } from "react-redux";
import { reset } from "../store/auth/authSlice";

const ActionButton = ({ value, onPress = null, disabled = false, height, width }) => {
    const colors = useTheme().colors;

    const dispatch = useDispatch()

    const handlePress = () => {
        dispatch(reset())
        onPress()
    }
    return (
        <TouchableOpacity
            disabled={disabled}
            style={{ backgroundColor: colors.primary, height: height ?? 55, width: width ?? "100%", borderRadius: 15, alignItems: "center", justifyContent: "center", marginTop: 10 }}
            onPress={handlePress}
        >
            {disabled
                ? <ActivityIndicator color="#fff" />
                : <Text style={{ fontWeight: "600", color: "#fff" }}>{value}</Text>
            }
        </TouchableOpacity>
    )
}

export default ActionButton