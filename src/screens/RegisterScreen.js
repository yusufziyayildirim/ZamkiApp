import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View, TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useTheme } from '@react-navigation/native';

//Components
import AuthInput from "../components/AuthInput";
import AuthPageDesc from "../components/AuthPageDesc";
import ActionButton from "../components/ActionButton";
import DismissKeyboard from "../components/DismissKeyboard";

const RegisterScreen = ({ navigation }) => {
  const colors = useTheme().colors;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPassword_confirmation] = useState("");

  const registerSubmit = () => {
    navigation.navigate('Register')
  }

  return (
    <SafeAreaView>
      <DismissKeyboard>
        <KeyboardAwareScrollView style={{ height: "100%" }}>
          <View style={{ paddingTop: 50, paddingHorizontal: 7, backgroundColor: colors.gray }}>
            <AuthPageDesc title="Hello!" subTitle={`We are happy to see \n you among us`} />
            <View style={{ paddingHorizontal: 25, marginTop: 25 }}>
              <AuthInput placeholder="Name" value={name} onChange={setName} />
              <AuthInput placeholder="Email" value={email} onChange={setEmail} />
              <AuthInput placeholder="Password" value={password} onChange={setPassword} />
              <AuthInput placeholder="Password Confrim" value={password_confirmation} onChange={setPassword_confirmation} />
              <ActionButton disabled={false} value="Register" onPress={registerSubmit} />
            </View>

            <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 45 }}>
              <Text style={{ fontWeight: "600", color: colors.darkGray, marginRight: 5 }}>
                Already have an account?
              </Text>
              <TouchableOpacity onPress={() => { navigation.navigate('Login') }}>
                <Text style={{ fontWeight: "600", color: "#8bb2e0" }}>
                  Sıgn In
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </DismissKeyboard>
    </SafeAreaView>
  )
}

export default RegisterScreen