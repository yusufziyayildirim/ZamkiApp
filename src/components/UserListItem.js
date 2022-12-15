import { View, Text, Image, StyleSheet } from 'react-native'
import { useTheme } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import ExpoFastImage from 'expo-fast-image'

import { URL } from '../constants/routes';
import { languages } from '../constants/languages';

const UserListItem = ({ user }) => {
    const colors = useTheme().colors;

    return (
        <View style={[styles.itemWrap, { borderTopColor: colors.lightGray }]}>
            {user.img ? (
                <ExpoFastImage
                    uri={`${URL}/storage/${user.img}`}
                    cacheKey={user.img.substring(5, user.img.length - 4)}
                    style={styles.userImg}
                />
            ) : (
                <View style={[styles.userImg, { backgroundColor: colors.lightGray, alignItems: "center", justifyContent: "center" }]}>
                    <FontAwesome name="user" size={50} color={colors.textPrimary} />
                </View>
            )}
            <View style={styles.contentWrap}>
                {user.references_count > 0 && (
                    <View style={{ position: "absolute", right: 75, top: 0, flexDirection: "row", alignItems: "center" }}>
                        <Text style={{ paddingTop: 6, color: "#fff", fontWeight: "700", marginRight: 3, fontSize: 12, color: colors.darkGray }}>{user.references_count}</Text>
                        <View style={{ justifyContent: "center", width: 18, height: 18, backgroundColor: colors.secondary, borderTopLeftRadius: 15, borderTopEndRadius: 15, borderBottomEndRadius: 15 }}>
                            <FontAwesome style={{ marginLeft: 5 }} name="quote-right" size={8} color="#fff" />
                        </View>
                    </View>
                )}
                <View>
                    <Text style={{ fontSize: 17, fontWeight: "700", marginBottom: 5, color: colors.textPrimary }}>{user.name}</Text>
                    <Text style={{ maxWidth: "80%", color: colors.textPrimary }}>{user.desc}</Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Text style={{ fontWeight: "600", color: colors.textPrimary }}>Speaks:</Text>
                        <Image
                            style={styles.flag}
                            source={languages.find(item => item.id === user.native_in[0]?.lang).img}
                        />
                        <Text style={{ fontWeight: "600", paddingLeft: 3, color: colors.textPrimary }} >+{(user.native_in?.length + user.also_speaking?.length - 1)}</Text>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", marginLeft: 15 }}>
                        <Text style={{ fontWeight: "600", color: colors.textPrimary }}>Learns:</Text>
                        <Image
                            style={styles.flag}
                            source={languages.find(item => item.id === user.learning[0]?.lang).img}
                        />
                        <Text style={{ fontWeight: "600", paddingLeft: 3, color: colors.textPrimary }} >+{user.learning?.length - 1}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default UserListItem;


const styles = StyleSheet.create({
    itemWrap: {
        width: "100%",
        paddingHorizontal: 20,
        flexDirection: "row",
        marginTop: 15,
        height: 100,
        alignItems: "center",
        borderTopWidth: .5,
        paddingTop: 15,
    },
    userImg: {
        height: 90,
        width: 90,
        borderRadius: 15
    },
    contentWrap: {
        position: "relative",
        width: "100%",
        paddingLeft: 15,
        paddingRight: 15,
        height: 85,
        justifyContent: "space-between",
    },
    flag: {
        width: 20,
        height: 20,
        backgroundColor: "#FCF55F",
        borderRadius: 50,
        marginLeft: 5
    }
})