import { NavigationContainer } from '@react-navigation/native';
import AuthStack from "./src/navigation/AuthStack";
import { useColorScheme } from 'react-native';
import { StatusBar } from 'react-native';
import { DarkTheme, LightTheme } from './src/theme/colors';
import { Provider } from "react-redux";
import { store } from './src/store';


export default function App() {
  let scheme = useColorScheme();

  return (
    <Provider store={store}>
      <NavigationContainer theme={scheme === 'dark' ? DarkTheme : LightTheme}>
        <StatusBar style="light" />
        <AuthStack />
      </NavigationContainer>
    </Provider>

  );
}