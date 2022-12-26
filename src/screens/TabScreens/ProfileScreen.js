import { useState } from 'react';
import { View, Text, StyleSheet, Image, StatusBar } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { collection, getDocs, query, where, deleteDoc } from "firebase/firestore";
import { db } from '../../constants/firebaseConfig';
import { URL } from '../../constants/routes';

//Store
import { useDispatch, useSelector } from "react-redux";
import { logout } from '../../store/auth/authActions';

//Components
import ActionButton from '../../components/ActionButton';
import ProfileListItem from '../../components/ProfileListItem';

const ProfileScreen = ({ navigation }) => {
    const colors = useTheme().colors;

    const [logoutModalVisible, setLogoutModalVisible] = useState(false);
    const { userInfo, loading } = useSelector(state => state.auth)

    const dispatch = useDispatch()

    const logoutSubmit = async () => {
        const email = userInfo.email
        dispatch(logout())
        const statusRef = query(collection(db, "online"), where('email', '==', email))
        const querySnapshot = await getDocs(statusRef)
        querySnapshot.forEach((doc) => {
            deleteDoc(doc.ref);
        })
    }

    return (
        <SafeAreaView style={{ backgroundColor: colors.primary }}>
            <View style={{ backgroundColor: colors.background, minHeight: "100%" }}>
                <View style={[styles.headerWrap, { backgroundColor: colors.primary }]}>
                    <View style={styles.headerContent}>
                        <Text style={styles.headerUserName}>
                            {userInfo.name}
                        </Text>
                        {
                            userInfo.img ? (
                                <Image
                                    style={styles.headerUserImg}
                                    source={{ uri: `${URL}/storage/${userInfo.img}` }}
                                />
                            ) : (
                                <View style={styles.headerUserImg}>
                                    <FontAwesome name="user" size={50} color={colors.textGrey} />
                                </View>
                            )
                        }
                    </View>
                </View>

                <View>
                    <View>
                        <Text style={[styles.contentTitle, { color: colors.darkGray }]}>Hesabım</Text>
                        <ProfileListItem onPress={() => { navigation.navigate('EditProfile') }} title="Edit profile" icon="info" rightArrow={true} />
                        <ProfileListItem onPress={() => { navigation.navigate('Languages') }} title="Languages" icon="language" rightArrow={true} />
                        <ProfileListItem onPress={() => { }} title="Account settings" icon="gear" rightArrow={true} />
                        <ProfileListItem onPress={() => { navigation.navigate('ChangePassword') }} title="Change password" icon="lock" rightArrow={true} />
                    </View>

                    <View>
                        <Text style={[styles.contentTitle, { color: colors.darkGray }]}>Yardım</Text>
                        <ProfileListItem onPress={() => { }} title="FAQ" icon="question-circle" rightArrow={true} />
                        <ProfileListItem onPress={() => { }} title="Contact us" icon="phone-square" rightArrow={true} />
                    </View>

                    <View>
                        <Text style={[styles.contentTitle, { color: colors.darkGray }]}>Diğer</Text>
                        <ProfileListItem onPress={() => setLogoutModalVisible(true)} title="Logout" icon="arrow-right" rightArrow={false} />
                    </View>
                </View>

                {
                    logoutModalVisible &&
                    <View style={styles.logoutModalWrap}>
                        <View
                            style={[styles.logoutModalContent, { backgroundColor: colors.lightGray }]}>
                            <Text style={{ fontSize: 17, fontWeight: "600", color: colors.textPrimary }}>Are you sure you want to log out?</Text>
                            <View style={{ flexDirection: "row", marginTop: 10, justifyContent: "space-between" }}>
                                <ActionButton value="Logout" disabled={loading} onPress={logoutSubmit} width={115} height={40} />
                                <ActionButton value="Cancel" onPress={() => setLogoutModalVisible(false)} width={115} height={40} />
                            </View>
                        </View>
                    </View>
                }
            </View >
        </SafeAreaView>
    )
}

export default ProfileScreen


const styles = StyleSheet.create({
    headerWrap: {
        width: "100%",
        height: 100
    },
    headerContent: {
        position: "relative",
        flexDirection: "row",
        height: "100%",
        paddingHorizontal: 20
    },
    headerUserName: {
        color: "white",
        position: "absolute",
        bottom: 5,
        left: 20,
        fontSize: 24,
        fontWeight: "700",
        textTransform: 'capitalize'
    },
    headerUserImg: {
        position: "absolute",
        height: 80,
        width: 80,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
        right: 20,
        bottom: -25
    },
    contentTitle: {
        marginTop: 25,
        marginBottom: 15,
        paddingLeft: 20,
        fontSize: 14,
        fontWeight: "700"
    },
    logoutModalWrap: {
        height: "100%",
        width: "100%",
        position: "absolute",
        alignItems: "center",
        justifyContent: "center"
    },
    logoutModalContent: {
        position: "absolute",
        height: 130,
        width: "70%",
        borderRadius: 15,
        paddingVertical: 15,
        paddingHorizontal: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    logoutModalButton: {
        width: "48%",
        height: 40,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "red"
    }
})