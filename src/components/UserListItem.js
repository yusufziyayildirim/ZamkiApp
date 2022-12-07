import { View, Text, Image, StyleSheet } from 'react-native'
import { useTheme } from '@react-navigation/native';

import { URL } from '../constants/routes';
import { FontAwesome } from '@expo/vector-icons';
import { languages } from '../constants/languages';

const UserListItem = ({ user }) => {
    const colors = useTheme().colors;
    
    return (
        <View style={[styles.itemWrap, { borderTopColor: colors.lightGray }]}>
            {user.img ? (
                <Image style={styles.userImg} source={{ uri: `${URL}/storage/${user.img}` }} />
            ) : (
                <View style={[styles.userImg, { backgroundColor: colors.lightGray, alignItems: "center", justifyContent: "center" }]}>
                    <FontAwesome name="user" size={50} color={colors.darkGray} />
                </View>
            )}
            <View style={styles.contentWrap}>
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
                        <Text style={{ fontWeight: "600", paddingLeft: 3, color: colors.textPrimary }} >+{user.native_in?.length - 1}</Text>
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