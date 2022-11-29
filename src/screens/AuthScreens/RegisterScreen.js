import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View, TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useTheme } from '@react-navigation/native';

//Store
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../store/auth/authActions";
import { reset } from "../../store/auth/authSlice";

//Components
import AuthInput from "../../components/AuthInput";
import AuthPageDesc from "../../components/AuthPageDesc";
import ActionButton from "../../components/ActionButton";
import DismissKeyboard from "../../components/DismissKeyboard";

const RegisterScreen = ({ navigation }) => {
  const colors = useTheme().colors;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPassword_confirmation] = useState("");

  const dispatch = useDispatch()
  const { loading, error, success } = useSelector((state) => state.auth)

  useEffect(() => {
    if (success) {
      setName("")
      setEmail("")
      setPassword("")
      setPassword_confirmation("")
    }
    if (error) {
      setPassword("")
      setPassword_confirmation("")
    }
  }, [error, success])

  const registerSubmit = () => {
    dispatch(register({ name, email, password, password_confirmation }))
  }

  return (
    <SafeAreaView>
      <DismissKeyboard>
        <KeyboardAwareScrollView style={{ height: "100%" }} keyboardShouldPersistTaps='handled'>
          <View style={{ paddingTop: 50, paddingHorizontal: 7, backgroundColor: colors.gray }}>
            <AuthPageDesc title="Hello!" subTitle={`We are happy to see \n you among us`} />
            
            {error && (
              <Text style={{ color: "red", textAlign: "center", marginTop: 15 }} >{error}</Text>
            )}
            {success && (
              <Text style={{ color: "green", textAlign: "center", marginTop: 15 }} >{success}</Text>
            )}

            <View style={{ paddingHorizontal: 25, marginTop: 25 }}>
              <AuthInput placeholder="Name" value={name} onChange={setName} />
              <AuthInput placeholder="Email" value={email} onChange={setEmail} />
              <AuthInput placeholder="Password" secure={true} value={password} onChange={setPassword} />
              <AuthInput placeholder="Password Confrim" secure={true} value={password_confirmation} onChange={setPassword_confirmation} />
              <ActionButton disabled={loading} value="Register" onPress={registerSubmit} />
            </View>

            <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 45 }}>
              <Text style={{ fontWeight: "600", color: colors.darkGray, marginRight: 5 }}>
                Already have an account?
              </Text>
              <TouchableOpacity onPress={() => { navigation.navigate('Login'); dispatch(reset()) }}>
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