import { useRef, useEffect } from 'react';
import { TouchableOpacity, View, Text, AppState } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { collection, addDoc, getDocs, query, where, deleteDoc } from "firebase/firestore";
import { useTheme } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import ExpoFastImage from 'expo-fast-image'
import { useSelector } from "react-redux";

import { db } from '../constants/firebaseConfig';
import UserStatus from '../components/UserStatus';

//Bottom TabBar
import TabBar from '../containers/TabBar';

//Tab Screens
import CommunityScreen from '../screens/TabScreens/CommunityScreen';
import ChatListScreen from '../screens/TabScreens/ChatListScreen';
import RoomListScreen from '../screens/TabScreens/RoomListScreen';
import ProfileScreen from '../screens/TabScreens/ProfileScreen';

//ProfileStack Screens
import EditProfileScreen from '../screens/AppScreens/EditProfileScreen';
import LanguagesScreen from '../screens/AppScreens/LanguagesScreen';
import EditLanguagesScreen from '../screens/AppScreens/EditLanguagesScreen';
import ChangePasswordScreen from '../screens/AppScreens/ChangePasswordScreen';

//App Screens
import UserDetailScreen from '../screens/AppScreens/UserDetailScreen';
import ReferencesScreen from '../screens/AppScreens/ReferencesScreen';
import ChatScreen from '../screens/AppScreens/ChatScreen';

const Tab = createBottomTabNavigator();
const AppStack = createNativeStackNavigator();
const ProfilStack = createNativeStackNavigator();

function ProfileStack() {
    const colors = useTheme().colors;

    return (
        <ProfilStack.Navigator>
            <ProfilStack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
            <ProfilStack.Screen
                name="EditProfile"
                component={EditProfileScreen}
                options={({ navigation }) => ({
                    title: "Edit Profile",
                    headerShadowVisible: false,
                    headerTitleAlign: 'center',
                    headerTintColor: colors.textPrimary,
                    headerStyle: {
                        backgroundColor: colors.background,
                    },
                    headerLeft: () => (
                        <TouchableOpacity
                            style={{ padding: 5 }}
                            onPress={
                                () => navigation.goBack()
                            }
                        >
                            <FontAwesome name="chevron-left" size={20} color={colors.textPrimary} />
                        </TouchableOpacity>
                    )
                })}
            />
            <ProfilStack.Screen
                name="Languages"
                component={LanguagesScreen}
                options={({ navigation }) => ({
                    title: "Languages",
                    headerShadowVisible: false,
                    headerTitleAlign: 'center',
                    headerTintColor: colors.textPrimary,
                    headerStyle: {
                        backgroundColor: colors.background,
                    },
                    headerLeft: () => (
                        <TouchableOpacity
                            style={{ padding: 5 }}
                            onPress={
                                () => navigation.goBack()
                            }
                        >
                            <FontAwesome name="chevron-left" size={20} color={colors.textPrimary} />
                        </TouchableOpacity>
                    )
                })}
            />
            <ProfilStack.Screen
                name="EditLanguages"
                component={EditLanguagesScreen}
                options={({ route, navigation }) => ({
                    title: route.params.title,
                    headerShadowVisible: false,
                    headerTitleAlign: 'center',
                    headerTintColor: colors.textPrimary,
                    headerStyle: {
                        backgroundColor: colors.background,
                    },
                    headerLeft: () => (
                        <TouchableOpacity
                            style={{ padding: 5 }}
                            onPress={
                                () => navigation.goBack()
                            }
                        >
                            <FontAwesome name="chevron-left" size={20} color={colors.textPrimary} />
                        </TouchableOpacity>
                    )
                })}
            />
            <ProfilStack.Screen
                name="ChangePassword"
                component={ChangePasswordScreen}
                options={({ navigation }) => ({
                    title: "Change Password",
                    headerShadowVisible: false,
                    headerTitleAlign: 'center',
                    headerTintColor: colors.textPrimary,
                    headerStyle: {
                        backgroundColor: colors.background,
                    },
                    headerLeft: () => (
                        <TouchableOpacity
                            style={{ padding: 5 }}
                            onPress={
                                () => navigation.goBack()
                            }
                        >
                            <FontAwesome name="chevron-left" size={20} color={colors.textPrimary} />
                        </TouchableOpacity>
                    )
                })}
            />
        </ProfilStack.Navigator>
    );
}

function BottomTabs() {
    return (
        <Tab.Navigator tabBar={props => <TabBar {...props} />}>
            <Tab.Screen name="Community" component={CommunityScreen} options={{ headerShown: false }} />
            <Tab.Screen name="ChatList" component={ChatListScreen} options={{ headerShown: false }} />
            <Tab.Screen name="RoomList" component={RoomListScreen} options={{ headerShown: false }} />
            <Tab.Screen name="Profile" component={ProfileStack} options={{ headerShown: false }} />
        </Tab.Navigator>
    );
}

function AppNavigator() {
    const colors = useTheme().colors;
    const { userInfo } = useSelector(state => state.auth);
    const appState = useRef(AppState.currentState);

    useEffect(() => {
        statusOnline()
    }, []);

    useEffect(() => {
        const subscription = AppState.addEventListener("change", nextAppState => {
            appState.current = nextAppState;
            appState.current == "active"
                ? statusOnline()
                : statusOffline()
        });
        return () => {
            subscription.remove();
        };
    }, []);

    const getUserStatus = async () => {
        const statusRef = query(collection(db, "online"), where('email', '==', userInfo.email))
        return await getDocs(statusRef);
    }

    //Online user
    const statusOnline = async () => {
        const status = false
        const querySnapshot = await getUserStatus();
        querySnapshot.forEach(() => {
            status=true
        })
        if (!status) {
            addDoc(collection(db, "online"), {
                email: userInfo.email
            })
        }

    }
    const statusOffline = async () => {
        const querySnapshot = await getUserStatus();
        querySnapshot.forEach((doc) => {
            deleteDoc(doc.ref);
        })
    }

    return (
        <AppStack.Navigator>
            <AppStack.Screen
                name="Tab"
                component={BottomTabs}
                options={{ headerShown: false }}
            />
            <AppStack.Screen
                name="UserDetail"
                component={UserDetailScreen}
                options={({ navigation, route }) => ({
                    title: route.params.user.name,
                    headerShadowVisible: false,
                    headerTintColor: '#fff',
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: colors.primary
                    },
                    headerTitleStyle: {
                        fontSize: 20,
                        textAlign: "center",
                        fontWeight: "700",
                        textTransform: 'capitalize'
                    },
                    headerLeft: () => (
                        <TouchableOpacity
                            style={{ padding: 5 }}
                            onPress={
                                () => navigation.goBack()
                            }
                        >
                            <FontAwesome name="chevron-left" size={20} color="#fff" />
                        </TouchableOpacity>
                    ),
                    headerRight: () => (
                        <TouchableOpacity style={{ padding: 5 }}>
                            <FontAwesome name="exclamation-circle" size={22} color="#fff" />
                        </TouchableOpacity>
                    )
                })}
            />
            <AppStack.Screen
                name="References"
                component={ReferencesScreen}
                options={({ navigation }) => ({
                    title: "References",
                    headerShadowVisible: false,
                    headerTintColor: colors.textPrimary,
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: colors.background
                    },
                    headerLeft: () => (
                        <TouchableOpacity
                            style={{ padding: 5 }}
                            onPress={
                                () => navigation.goBack()
                            }
                        >
                            <FontAwesome name="chevron-left" size={20} color={colors.textPrimary} />
                        </TouchableOpacity>
                    )
                })}
            />
            <AppStack.Screen
                name="Chat"
                component={ChatScreen}
                options={({ navigation, route }) => ({
                    title: "",
                    headerStyle: {
                        backgroundColor: colors.lightGray
                    },
                    headerLeft: () => (
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <TouchableOpacity
                                style={{ padding: 5 }}
                                onPress={
                                    () => navigation.goBack()
                                }
                            >
                                <FontAwesome name="chevron-left" size={20} color={colors.textPrimary} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ flexDirection: "row", alignItems: "center", marginLeft: 15 }}
                                onPress={() => navigation.navigate('UserDetail', { user: route.params.user })}
                            >
                                {route.params.user.img ? (
                                    <ExpoFastImage
                                        uri={`${URL}/storage/${route.params.user.img}`}
                                        cacheKey={route.params.user.img.substring(5, route.params.user.img.length - 4)}
                                        style={{ height: 30, width: 30, borderRadius: 100 }}
                                    />
                                ) : (
                                    <View style={{ height: 30, width: 30, borderRadius: 100, backgroundColor: colors.darkGray, alignItems: "center", justifyContent: "center" }} >
                                        <FontAwesome name="user" size={20} color="#fff" />
                                    </View>
                                )}
                                <Text style={{ fontSize: 17, paddingLeft: 9, fontWeight: "600", color: colors.textPrimary, marginRight: 5 }}>{route.params.user.name}</Text>
                                <UserStatus email={route.params.user.email} size={14} />
                            </TouchableOpacity>
                        </View>
                    ),
                    headerRight: () => (
                        <>
                            <TouchableOpacity
                                style={{ padding: 10, paddingHorizontal: 15 }}
                            // onPress={
                            //   () => navigation.goBack()
                            // }
                            >
                                <FontAwesome name="video-camera" size={24} color={colors.textPrimary} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ padding: 10 }}
                            // onPress={
                            //   // () => navigation.goBack()
                            // }
                            >
                                <FontAwesome name="phone" size={24} color={colors.textPrimary} />
                            </TouchableOpacity>
                        </>
                    )
                })}
            />
        </AppStack.Navigator>
    );
}

export default AppNavigator