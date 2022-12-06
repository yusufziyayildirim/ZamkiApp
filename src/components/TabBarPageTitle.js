import { View, Text } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useColorScheme } from 'react-native';



const TabBarPageTitle = ({ title }) => {
    const colors = useTheme().colors;
    let scheme = useColorScheme();

    return (
        <>
            <View style={{ height: 50, justifyContent: "center", backgroundColor: scheme === 'dark' ? colors.backgroundSecondary : colors.background }}>
                <Text style={{ color: colors.textPrimary, fontSize: 25, fontWeight: "800", textAlign: "center" }}>{title}</Text>
            </View>
            <View style={{ width: "100%", height: 0.4, backgroundColor: scheme === 'dark' ? colors.lightGray : colors.darkGray }} />
        </>
    )
}

export default TabBarPageTitle