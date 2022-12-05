import { View, StatusBar } from 'react-native'
import { useTheme } from '@react-navigation/native';
import { useSelector } from 'react-redux';

//Components
import ProfileListItem from '../../components/ProfileListItem';

const LanguagesScreen = ({ navigation }) => {
    const colors = useTheme().colors;
    const { userInfo } = useSelector((state) => state.auth);

    return (
        <>
            <StatusBar barStyle='dark-content' backgroundColor={colors.background} />
            <View style={{ backgroundColor: colors.background, minHeight: "100%" }}>
                {/* <FontAwesome name="quote-right" size={24} color="black" /> */}
                <ProfileListItem onPress={() => { navigation.navigate('EditLanguages', { currentLang: userInfo.native_in, title: "Native In" }) }} title="Native In" icon="globe" rightArrow={true} />
                <ProfileListItem onPress={() => { navigation.navigate('EditLanguages', { currentLang: userInfo.also_speaking, title: "Also Speaking" }) }} title="Also Speaking" icon="book" rightArrow={true} />
                <ProfileListItem onPress={() => { navigation.navigate('EditLanguages', { currentLang: userInfo.learning, title: "Learning" }) }} title="Learning" icon="pencil" rightArrow={true} />
            </View >
        </>
    )
}

export default LanguagesScreen
