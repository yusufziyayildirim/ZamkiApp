import { NavigationContainer } from '@react-navigation/native';
import AuthStack from "./src/navigation/AuthStack";
import { useColorScheme } from 'react-native';
import { StatusBar } from 'react-native';
import { DarkTheme, LightTheme } from './src/theme/colors';

export default function App() {
  let scheme = useColorScheme();
  
  return (
    <NavigationContainer theme={scheme === 'dark' ? DarkTheme : LightTheme}>
      <StatusBar style="light" />
      <AuthStack />
    </NavigationContainer>
  );
}