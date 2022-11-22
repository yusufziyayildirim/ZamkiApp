import { Text, View } from "react-native";
import { useTheme } from '@react-navigation/native';

const AuthPageDesc = ({ title, subTitle }) => {
    const colors = useTheme().colors;

    return (
        <View style={{ paddingTop: 20, paddingHorizontal: 50 }}>
            <Text style={{ fontWeight: "bold", fontSize: 30, textAlign: "center", color: colors.textPrimary }}>
                {title}
            </Text>
            <Text style={{ fontWeight: "normal", fontSize: 16, textAlign: "center", marginTop: 15, color: colors.textSecondary}}>
                {subTitle}
            </Text>
        </View>
    )
}

export default AuthPageDesc