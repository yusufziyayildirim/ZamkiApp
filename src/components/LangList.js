import { StyleSheet, View, ScrollView, TextInput } from 'react-native';
import {  FontAwesome } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';

//Languages data
import { languages } from '../constants/languages';

//Components
import SelectLangItem from './SelectLangItem';

const LangList = ({search, setSearch, lang, setLang}) => {
    const colors = useTheme().colors;

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

export default LangList

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
