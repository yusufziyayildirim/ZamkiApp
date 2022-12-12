import { View, Text, Image, StyleSheet } from 'react-native'
import ExpoFastImage from 'expo-fast-image'
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';

const ChatListItem = ({ userImg, userName, userMessage, countNewMessage }) => {
    const colors = useTheme().colors;

    return (
        <View style={countNewMessage > 0 ? [styles.newMessageItemWrap, { backgroundColor: colors.lightGray, }] : styles.itemWrap}>
            {userImg ? (
                <ExpoFastImage
                    uri={`${URL}/storage/${userImg}`}
                    cacheKey={userImg.substring(5, userImg.length - 4)}
                    style={styles.userImg}
                />
            ) : (
                <View style={styles.userImg}>
                    <FontAwesome name="user" size={35} color="#fff" />
                </View>
            )}
            <View style={{ paddingLeft: 15, height: 50, justifyContent: "space-around" }}>
                <Text style={{ fontSize: 17, fontWeight: "700", color: colors.textPrimary }}>{userName}</Text>
                <Text style={{ color: colors.secondary }}>
                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: -3 }}>
                        {
                            userMessage[0] ?
                                userMessage[1].received ? (
                                    < Ionicons name="checkmark-done-sharp" size={18} color={colors.primary} />
                                ) : (
                                    <Ionicons name="checkmark-done-outline" size={18} color={colors.darkGray} />
                                )
                                : null
                        }
                        <Text style={{ color: colors.darkGray, marginLeft: 5 }}>{userMessage}</Text>
                    </View>
                </Text>
            </View>
            {countNewMessage > 0 &&
                <View style={[styles.newMessageWrap, { backgroundColor: colors.primary }]}>
                    <Text style={{ color: "white", fontWeight: "700" }}>{countNewMessage}</Text>
                </View>
            }
        </View>
    )
}

export default ChatListItem

const styles = StyleSheet.create({
    itemWrap: {
        position: "relative",
        borderRadius: 10,
        paddingHorizontal: 15,
        marginLeft: 5,
        marginRight: 10,
        flexDirection: "row",
        marginTop: 15,
        height: 60,
        alignItems: "center"
    },
    newMessageItemWrap: {
        position: "relative",
        borderRadius: 10,
        paddingHorizontal: 15,
        marginLeft: 5,
        marginRight: 10,
        flexDirection: "row",
        marginTop: 15,
        height: 80,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.15,
        shadowRadius: 3.84,
    },
    userImg: {
        height: 50,
        width: 50,
        backgroundColor: "gray",
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center"
    },
    newMessageWrap: {
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
        right: 20,
        width: 20,
        height: 20,
        borderRadius: 5
    }
})