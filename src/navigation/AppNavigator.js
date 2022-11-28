import { View, TouchableOpacity, Text, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FontAwesome } from '@expo/vector-icons';

//Bottom TabBar
import TabBar from '../containers/TabBar';

//Tab Screens
import CommunityScreen from '../screens/TabScreens/CommunityScreen';
import ChatListScreen from '../screens/TabScreens/ChatListScreen';
import RoomListScreen from '../screens/TabScreens/RoomListScreen';
import ProfileScreen from '../screens/TabScreens/ProfileScreen';

const Tab = createBottomTabNavigator();
const AppStack = createNativeStackNavigator();

function BottomTabs() {
    return (
        <Tab.Navigator tabBar={props => <TabBar {...props} />}>
            <Tab.Screen name="Community" component={CommunityScreen} options={{ headerShown: false }} />
            <Tab.Screen name="ChatList" component={ChatListScreen} options={{ headerShown: false }} />
            <Tab.Screen name="RoomList" component={RoomListScreen} options={{ headerShown: false }} />
            <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
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