import { View, TouchableOpacity, Text, Image, SafeAreaView, ScrollView } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useColorScheme } from 'react-native';

//Components
import DismissKeyboard from './DismissKeyboard';

const TabBarScreenWrap = ({ children }) => {
    const colors = useTheme().colors;
    let scheme = useColorScheme();

    return (
        <SafeAreaView style={{ backgroundColor: scheme === 'dark' ? colors.backgroundSecondary : colors.background }}>
            <DismissKeyboard>
                <View style={{ backgroundColor: scheme === 'dark' ? colors.background : colors.backgroundSecondary, paddingBottom: 70 }}>
                    {children}
                </View>
            </DismissKeyboard>
        </SafeAreaView>
    )
}

export default TabBarScreenWrap