import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './AppNavigator';
import AuthStack from './AuthStack';
import { useColorScheme } from 'react-native';
import { DarkTheme, LightTheme } from '../theme/colors';

import SplashScreen from '../screens/SplashScreen';

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

    const { userToken } = useSelector(state => state.auth);
    const isLoggedIn = useSelector(selectIsLoggedIn);

    return (
        <NavigationContainer theme={scheme === 'dark' ? DarkTheme : LightTheme}>
            {
                userToken == null
                    ? < SplashScreen />
                    : (isLoggedIn)
                        ? <AppNavigator />
                        : <AuthStack />
            }
        </NavigationContainer>
    )
}

export default Router