import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './AppNavigator';
import AuthStack from './AuthStack';
import { StatusBar, useColorScheme } from 'react-native';
import { DarkTheme, LightTheme } from '../theme/colors';

import SplashScreen from '../screens/SplashScreen';
import WizardLangScreen from '../screens/AuthScreens/WizardLangScreen';

//Stack
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn } from '../store/auth/authSlice';
import { isTokenValid } from '../store/auth/authActions';

const Router = () => {
    let scheme = useColorScheme();
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(isTokenValid())
    }, []);

    const isLoggedIn = useSelector(selectIsLoggedIn);
    const { userInfo } = useSelector(state => state.auth);

    return (
        <NavigationContainer theme={scheme === 'dark' ? DarkTheme : LightTheme}>
            <StatusBar barStyle={scheme === 'dark' ? 'light-content' : 'dark-content'} backgroundColor={scheme === 'dark' ? '#010101' : '#f2f1f6'} />
            {
                isLoggedIn == null
                    ? < SplashScreen />
                    : (isLoggedIn)
                        ? ((userInfo.learning.length == 0))
                            ? <WizardLangScreen />
                            : <AppNavigator />
                        : <AuthStack />
            }
        </NavigationContainer>
    )
}

export default Router