import { View, TouchableOpacity, Text, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

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
    return (
        <AppStack.Navigator>
            <AppStack.Screen
                name="Tab"
                component={BottomTabs}
                options={{ headerShown: false }}
            />
        </AppStack.Navigator>
    );
}

export default AppNavigator