import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '@react-navigation/native';

//Store
import { useDispatch } from 'react-redux';
import { setUserInfo } from '../../store/auth/authSlice';

//Components
import ActionButton from '../../components/ActionButton';
import LangList from '../../components/LangList';
import UserService from '../../services/UserService';

const EditLanguagesScreen = ({ route }) => {
    const colors = useTheme().colors;
    const { currentLang } = route.params

    const [lang, setLang] = useState([])
    const [search, setSearch] = useState("")
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState(false)

    const dispatch = useDispatch();

    useEffect(() => {
        currentLang.map((item, i) => {
            setLang(oldValues => [...oldValues, item.lang])
        })
    }, [])

    const updateLanguage = async () => {
        const { title } = route.params
        setLoading(true)
        if (lang.length == 0 && title == "Native In") {
            setMessage("Native In field is required")
        } else if (lang.length == 0 && title == "Learning") {
            setMessage("Learning field is required")
        } else {
            const response = await UserService.updateUserLanguage(lang, title)
            dispatch(setUserInfo(response.data.data))
        }
        setLoading(false)
    }

    return (
        <>
            {message &&
                <Text style={{ textAlign: "center", fontWeight: "700", color: colors.primary }}>{message}</Text>
            }
            <LangList search={search} setSearch={setSearch} lang={lang} setLang={setLang} />

            <View style={{ paddingHorizontal: 20 }}>
                <ActionButton onPress={updateLanguage} disabled={loading} value="Save" />
            </View>
        </>
    )
}

export default EditLanguagesScreen