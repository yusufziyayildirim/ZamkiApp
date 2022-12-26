import { View, Text, StyleSheet } from 'react-native'
import ExpoFastImage from 'expo-fast-image'
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { URL } from '../constants/routes';
import UserStatus from './UserStatus';

const ChatListItem = ({ userImg, userName, userEmail, lastMessage, countNewMessage, selected = null }) => {
    const colors = useTheme().colors;
    const { userInfo } = useSelector(state => state.auth);

    return (
        <View style={countNewMessage > 0 ? [styles.newMessageItemWrap, { backgroundColor: colors.lightGray }] : styles.itemWrap}>
            {userImg ? (
                <View style={{ position: "relative" }}>
                    <View style={{ position: "absolute", alignItems: "center", justifyContent: "center", bottom: 0, right: 0, zIndex: 10, width: 14, height: 14, backgroundColor: colors.background, borderRadius: 100 }}>
                        <UserStatus email={userEmail} size={12} />
                    </View>
                    <ExpoFastImage
                        uri={`${URL}/storage/${userImg}`}
                        cacheKey={userImg.substring(5, userImg.length - 4)}
                        style={styles.userImg}
                    />
                </View>
            ) : (
                <View style={[styles.userImg, { position: "relative" }]}>
                    <View style={{ position: "absolute", alignItems: "center", justifyContent: "center", bottom: 0, right: 0, zIndex: 10, width: 14, height: 14, backgroundColor: colors.background, borderRadius: 100 }}>
                        <UserStatus email={userEmail} size={12} />
                    </View>
                    <FontAwesome name="user" size={30} color="#fff" />
                </View>
            )}
            <View style={{ paddingLeft: 15, height: 50, justifyContent: "space-around" }}>
                <Text style={{ fontSize: 17, fontWeight: "700", color: colors.textPrimary }}>{userName}</Text>
                <Text style={{ color: colors.secondary }}>
                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: -3 }}>
                        {
                            lastMessage?.user._id == userInfo.email ?
                                lastMessage?.received ? (
                                    < Ionicons name="checkmark-done-sharp" size={18} color={colors.primary} />
                                ) : (
                                    <Ionicons name="checkmark-done-outline" size={18} color={colors.darkGray} />
                                )
                                : null
                        }
                        <Text style={{ color: colors.darkGray, marginLeft: 5 }}>{lastMessage.text}</Text>
                    </View>
                </Text>
            </View>
            {countNewMessage > 0 &&
                <View style={[styles.newMessageWrap, { backgroundColor: colors.primary }]}>
                    <Text style={{ color: "white", fontWeight: "700" }}>{countNewMessage}</Text>
                </View>
            }
            {
                selected != null ?
                    selected ? (
                        <View style={{ position: "absolute", right: 0, backgroundColor: colors.primary, width: 30, height: 30, borderRadius: 100, alignItems: "center", justifyContent: "center" }}>
                            <Ionicons name="md-checkmark" size={20} color="#fff" />
                        </View>

                    ) : (
                        <View style={{ position: "absolute", right: 0, borderWidth: 2, borderColor: colors.primary, width: 30, height: 30, borderRadius: 100, alignItems: "center", justifyContent: "center" }} />
                    )
                    : null
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
        borderRadius: 15,
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