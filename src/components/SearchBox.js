import { TouchableOpacity, TextInput, View, StyleSheet } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import { useState } from 'react';
import { useTheme } from '@react-navigation/native';

const SearchBox = () => {
    const colors = useTheme().colors;

    const [search, setSearch] = useState("")

    const onClear = () => {
        setSearch("")
    }
    return (
        <View style={{ position: "relative" }}>
            <FontAwesome name="search" size={20} color={colors.darkGray} style={styles.searchIcon} />
            <TextInput placeholder='Search'
                value={search}
                onChangeText={(value) => setSearch(value)}
                style={[styles.searchInput, { backgroundColor: colors.lightGray, }]}
            />
            {search.length > 0 && (
                <TouchableOpacity onPress={onClear} style={styles.closeIcon}>
                    <FontAwesome name="close" size={24} color={colors.darkGray} />
                </TouchableOpacity>
            )}
        </View>

    )
}

export default SearchBox


const styles = StyleSheet.create({
    searchIcon: {
        position: "absolute",
        top: 24,
        left: 30,
        zIndex: 5
    },
    searchInput: {
        marginHorizontal: 20,
        opacity: 0.7,
        borderRadius: 10,
        height: 40,
        paddingRight: 20,
        paddingLeft: 40,
        marginTop: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    closeIcon: {
        zIndex: 5,
        position: "absolute",
        top: 23,
        right: 30,
        width: 30,
        height: 30,
        alignItems: "center"
    }
})