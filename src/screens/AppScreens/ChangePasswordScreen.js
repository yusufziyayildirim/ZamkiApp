import { useState } from "react";
import { View, Text } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useSelector } from "react-redux";
import { useTheme } from '@react-navigation/native';


import ActionButton from "../../components/ActionButton";
import AuthInput from "../../components/AuthInput";
import DismissKeyboard from "../../components/DismissKeyboard";
import UserService from "../../services/UserService";

const ChangePasswordScreen = () => {
    const colors = useTheme().colors;

    const [password, setPassword] = useState("")
    const [new_password, setNew_password] = useState("")
    const [new_password_confirmation, setNew_password_confirmation] = useState("")
    
    const [loading, setLoading] = useState("")
    const [error, setError] = useState("")
    const [success, setSucces] = useState("")

    const handleChangePassword = async () => {
        setLoading(true)
        setError("")
        setSucces("")
        const response = await UserService.changePassword(password, new_password, new_password_confirmation)

        if (response.data?.status) {
            setPassword("")
            setNew_password("")
            setNew_password_confirmation("")
            setLoading(false)
            setSucces(response.data.message)
        } else {
            setLoading(false)
            setError(response)
        }
    }

    return (
        <DismissKeyboard>
            <KeyboardAwareScrollView style={{ height: "100%" }} keyboardShouldPersistTaps='handled'>
                <View style={{ height: "100%", paddingHorizontal: 7, backgroundColor: colors.secondaryBackground }}>
                    {error &&
                        <Text style={{ fontWeight: "normal", fontSize: 16, textAlign: "center", color: colors.primary }}>
                            {error}
                        </Text>
                    }
                    {success &&
                        <Text style={{ fontWeight: "normal", fontSize: 16, textAlign: "center", color: "green" }}>
                            {success}
                        </Text>
                    }
                    <View style={{ marginTop: 25 }}>
                        <AuthInput secure={true} placeholder="Old Password" value={password} onChange={setPassword} />
                        <AuthInput secure={true} placeholder="New Password" value={new_password} onChange={setNew_password} />
                        <AuthInput secure={true} placeholder="New Password Confrim" value={new_password_confirmation} onChange={setNew_password_confirmation} />
                    </View>
                    <ActionButton disabled={loading} value="Save" onPress={handleChangePassword} />
                </View>
            </KeyboardAwareScrollView>
        </DismissKeyboard>
    )
}

export default ChangePasswordScreen