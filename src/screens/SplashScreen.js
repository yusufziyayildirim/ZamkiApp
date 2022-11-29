import { View, Text, SafeAreaView } from 'react-native'
import { useTheme } from '@react-navigation/native';

const SplashScreen = () => {
    const colors = useTheme().colors;

    return (
        <SafeAreaView style={{ backgroundColor: colors.background }}>
            <View style={{ height: "100%", alignItems: "center", justifyContent: "center", paddingTop: 10, backgroundColor: colors.background }}>
                <Text style={{ color: colors.primary, fontSize: 24, fontWeight: "800" }}>
                    ZamkiApp
                </Text>
            </View>
        </SafeAreaView>
    )
}

export default SplashScreen