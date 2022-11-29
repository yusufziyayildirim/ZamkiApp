import { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TextInput } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

//Languages data
import { languages } from '../../constants/languages';

//Service
import UserService from '../../services/UserService';

//Store
import { useDispatch } from 'react-redux';
import { setUserInfo } from '../../store/auth/authSlice';

//Components
import SelectLangItem from '../../components/SelectLangItem';
import DismissKeyboard from '../../components/DismissKeyboard';
import ActionButton from '../../components/ActionButton';

const WizardLangScreen = () => {
    const colors = useTheme().colors;
    const steps = ['Native In', 'Also Speaking', 'Learning'];
    const [currentStep, setCurrentStep] = useState(0)
    const [search, setSearch] = useState("")
    const [nativeIn, setNativeIn] = useState([])
    const [alsoSpeaking, setAlsoSpeaking] = useState([])
    const [learning, setLearning] = useState([])
    const [message, setMessage] = useState()
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch()

    //Prev wizard
    const next = () => {
        if ((currentStep + 1) < steps.length) {
            setCurrentStep(currentStep + 1)
            setSearch("")
        }
    }

    //Prev wizard
    const prev = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1)
            setMessage("")
            setSearch("")
        }
    }

    //Finish wizard
    const finish = async () => {
        if (nativeIn.length == 0) {
            setMessage("Please select native language")
        } else if (learning.length == 0) {
            setMessage("Please select learning language")
        } else {
            setMessage("")
            setLoading(true)
            const response = await UserService.setUserLanguage(nativeIn, alsoSpeaking, learning)
            dispatch(setUserInfo(response.data.data))
            setLoading(false)
        }
    }

    //Map language data -- search language -- wizard screen
    const scrollAndSearchLang = (lang, setLang) => {
        return (
            <>
                <View style={{ position: "relative", marginHorizontal: 25 }}>
                    <FontAwesome name="search" size={20} color={colors.darkGray} style={styles.searchIcon} />
                    <TextInput placeholder='Search'
                        value={search}
                        onChangeText={(value) => setSearch(value)}
                        placeholderTextColor="#bdbbc2"
                        style={[styles.searchInput, { color: colors.textPrimary }]}
                    />
                </View>
                <ScrollView keyboardShouldPersistTaps='handled' style={{ paddingHorizontal: 25, height: "78%" }}>
                    {
                        search ? (
                            languages
                                .filter((a) => a.isoName.toLowerCase().startsWith(search.toLowerCase()) || a.name.toLowerCase().startsWith(search.toLowerCase()))
                                .map((item, i) => {
                                    return (
                                        <View key={i} >
                                            <SelectLangItem item={item} oldData={lang} handlePress={setLang} selected={lang.includes(item.id)} />
                                        </View>
                                    )
                                })
                        ) : (

                            languages
                                .sort((a, b) => a.isoName > b.isoName ? 1 : -1)
                                .map((item, i) => {
                                    return (
                                        <View key={i}>
                                            <SelectLangItem item={item} oldData={lang} handlePress={setLang} selected={lang.includes(item.id)} />
                                        </View>
                                    )
                                })
                        )
                    }
                </ScrollView>
            </>
        )
    }

    return (
        <SafeAreaView style={{ backgroundColor: colors.background }}>
            <DismissKeyboard>
                <View style={{ backgroundColor: colors.background, paddingTop: 5 }}>
                    <View style={{ alignItems: 'center' }}>
                        {/* Header */}
                        <View style={{ width: 280, height: 70 }}>
                            <View style={{ alignItems: 'center' }}>
                                <View style={{ height: 2, backgroundColor: colors.primary, width: 180, top: 13, zIndex: 10 }} />
                            </View>
                            <View style={{ flexDirection: 'row', width: '100%', zIndex: 20 }}>
                                {steps.map((label, i) =>
                                    <View key={i} style={{ alignItems: 'center', width: 90 }}>
                                        {i > currentStep && /* Not selected */
                                            <View style={[styles.centerElement, styles.roundedTop, { backgroundColor: colors.background, borderColor: colors.primary }]}>
                                                <Text style={{ fontSize: 15, color: colors.primary }}>{i + 1}</Text>
                                            </View>
                                        }
                                        {i < currentStep && /* Checked */
                                            <View style={[styles.centerElement, styles.roundedTop, { backgroundColor: colors.primary, borderColor: colors.primary }]}>
                                                < Ionicons name="md-checkmark" size={20} color="#fff" />
                                            </View>
                                        }
                                        {i == currentStep && /* Selected */
                                            <View style={[styles.centerElement, styles.roundedTop, { backgroundColor: colors.secondary, borderColor: colors.secondary, }]}>
                                                <Text style={{ fontSize: 13, color: '#ffffff' }}>{i + 1}</Text>
                                            </View>
                                        }
                                        <Text style={{ fontSize: 12 }}>{label}</Text>
                                    </View>
                                )}
                            </View>
                        </View>
                    </View>

                    <View style={{ width: "100%", height: "91.8%" }}>
                        {currentStep == 0 &&
                            scrollAndSearchLang(nativeIn, setNativeIn)
                        }
                        {currentStep == 1 &&
                            scrollAndSearchLang(alsoSpeaking, setAlsoSpeaking)
                        }
                        {currentStep == 2 &&
                            scrollAndSearchLang(learning, setLearning)
                        }
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: "center", marginTop: 10 }}>
                            {currentStep > 0 ?
                                <View style={[styles.centerElement, { left: 15, width: 80, height: 75, bottom: 10 }]}>
                                    <ActionButton value="Prev" width={60} height={40} onPress={prev} />
                                </View>
                                : <Text />
                            }
                            {message && (
                                <Text style={{ color: colors.primary, textAlign: "center", fontWeight: "700", width: "50%" }}>{message} !..</Text>
                            )}
                            {(currentStep + 1) < steps.length &&
                                <View style={[styles.centerElement, { right: 15, width: 80, height: 65, bottom: 10 }]}>
                                    <ActionButton value="Next" width={60} height={40} onPress={next} />
                                </View>
                            }
                            {(currentStep + 1) == steps.length &&
                                <View style={[styles.centerElement, { right: 15, width: 80, height: 75, bottom: 10 }]}>
                                    <ActionButton disabled={loading} value="Finish" width={60} height={40} onPress={finish} />
                                </View>
                            }
                        </View>
                    </View>
                </View>
            </DismissKeyboard>
        </SafeAreaView >
    )
}

export default WizardLangScreen


const styles = StyleSheet.create({
    centerElement: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    roundedTop: {
        width: 30,
        height: 30,
        borderWidth: 2,
        borderRadius: 15,
        marginBottom: 10
    },
    learningItem: {
        width: 7,
        height: 20,
        marginLeft: 5
    },
    searchIcon: {
        position: "absolute",
        top: 10,
        left: 10,
        zIndex: 5,
    },
    searchInput: {
        opacity: 0.7,
        borderRadius: 10,
        height: 40,
        paddingRight: 20,
        paddingLeft: 40,
        borderBottomWidth: 1,
        marginBottom: 10,
    }
});
