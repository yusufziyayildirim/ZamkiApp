import { createNativeStackNavigator } from "@react-navigation/native-stack"

//Screens
import MainScreen from "../screens/AuthScreens/MainScreen";
import LoginScreen from "../screens/AuthScreens/LoginScreen";
import RegisterScreen from "../screens/AuthScreens/RegisterScreen";
import ForgotPasswordScreen from "../screens/AuthScreens/ForgotPasswordScreen";
import VerifyEmailScreen from "../screens/AuthScreens/VerifyEmailScreen";

const Auth = createNativeStackNavigator();

const AuthStack = () => {
    return (
        <Auth.Navigator initialRouteName="Main">
            <Auth.Screen name="Main" component={MainScreen} options={{ headerShown: false }} />
            <Auth.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Auth.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
            <Auth.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ headerShown: false }} />
            <Auth.Screen name="VerifyEmail" component={VerifyEmailScreen} options={{ headerShown: false }} />
        </Auth.Navigator>
    )
}

export default AuthStack