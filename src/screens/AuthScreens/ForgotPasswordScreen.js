import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View, TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useTheme } from '@react-navigation/native';
import AuthService from "../../services/AuthService";

//Components
import AuthInput from "../../components/AuthInput";
import AuthPageDesc from "../../components/AuthPageDesc";
import ActionButton from "../../components/ActionButton";
import DismissKeyboard from "../../components/DismissKeyboard";

const ForgotPasswordScreen = ({ navigation }) => {
  const colors = useTheme().colors;
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState("")
  const [error, setError] = useState("")
  const [success, setSucces] = useState("")

  const forgotPasswordSubmit = async () => {
    setLoading(true)
    setError("")
    setSucces("")
    const response = await AuthService.forgotPassword(email);

    if (response.data?.status) {
      setEmail("")
      setLoading(false)
      setSucces(response.data.message)
    } else {
      setLoading(false)
      setError(response)
    }
  }

  return (
    <SafeAreaView>
      <DismissKeyboard>
        <KeyboardAwareScrollView style={{ height: "100%" }}>
          <View style={{ paddingTop: 50, paddingHorizontal: 7, backgroundColor: colors.gray }}>
            <AuthPageDesc title="Don't worry!" subTitle={`We will reset your \n password!`} />

            {error &&
              <Text style={{ fontWeight: "600", fontSize: 16, textAlign: "center", color: colors.primary, marginTop:10 }}>
                {error}
              </Text>
            }
            {success &&
              <Text style={{ fontWeight: "600", fontSize: 16, textAlign: "center", color: "green", marginTop:10 }}>
                {success}
              </Text>
            }
            <View style={{ paddingHorizontal: 25, marginTop: 25 }}>
              <AuthInput placeholder="Email" value={email} onChange={setEmail} />
              <ActionButton disabled={loading} value="Send" onPress={forgotPasswordSubmit} />
            </View>

            <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 45 }}>
              <Text style={{ fontWeight: "600", color: colors.darkGray, marginRight: 5 }}>
                Do you remember?
              </Text>
              <TouchableOpacity onPress={() => { navigation.navigate('Login') }}>
                <Text style={{ fontWeight: "600", color: "#8bb2e0" }}>
                  Login
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </DismissKeyboard>
    </SafeAreaView>
  )
}

export default ForgotPasswordScreen