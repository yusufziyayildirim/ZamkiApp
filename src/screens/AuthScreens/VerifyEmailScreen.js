import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useTheme } from '@react-navigation/native';

//Components
import AuthInput from "../../components/AuthInput";
import AuthPageDesc from "../../components/AuthPageDesc";
import ActionButton from "../../components/ActionButton";
import DismissKeyboard from "../../components/DismissKeyboard";
import AuthService from "../../services/AuthService";

const VerifyEmailScreen = ({ navigation }) => {
  const colors = useTheme().colors;
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState("")
  const [error, setError] = useState("")
  const [success, setSucces] = useState("")


  const resendVerifyEmail = async () => {
    setLoading(true)
    setError("")
    setSucces("")
    const response = await AuthService.verifyEmail(email);

    if (response.data?.status) {
      setEmail("")
      setSucces(response.data.message)
    } else {
      setError(response)
    }
    setLoading(false)
  }

  return (
    <SafeAreaView>
      <DismissKeyboard>
        <KeyboardAwareScrollView style={{ height: "100%" }}>
          <View style={{ paddingTop: 50, paddingHorizontal: 7, backgroundColor: colors.gray }}>
            <AuthPageDesc title="Almost done!" subTitle={`We will send verify \n email!`} />
            {error &&
              <Text style={{ fontWeight: "600", fontSize: 16, textAlign: "center", color: colors.primary, marginTop: 10 }}>
                {error}
              </Text>
            }
            {success &&
              <Text style={{ fontWeight: "600", fontSize: 16, textAlign: "center", color: "green", marginTop: 10 }}>
                {success}
              </Text>
            }
            <View style={{ paddingHorizontal: 25, marginTop: 25 }}>
              <AuthInput placeholder="Email" value={email} onChange={setEmail} />
              <ActionButton disabled={loading} value="Send verify email" onPress={resendVerifyEmail} />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </DismissKeyboard>
    </SafeAreaView>
  )
}

export default VerifyEmailScreen