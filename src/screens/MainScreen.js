import { Text, TouchableOpacity, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from '@react-navigation/native';

//Store
import { useDispatch } from "react-redux";
import { reset } from "../store/auth/authSlice";

//Components
import AuthPageDesc from "../components/AuthPageDesc";

const MainScreen = ({ navigation }) => {
  const colors = useTheme().colors;
  const dispatch = useDispatch()

  return (
    <SafeAreaView>
      <View style={{ height: "100%", paddingHorizontal: 7 }}>
        <View style={{ height: "50%", borderRadius: 40 }} >
          <Image
            style={{ height: "100%", width: "100%", borderRadius: 40 }}
            source={require('../assets/images/mainBg.webp')}
          />
        </View>
        <View style={{ height: "50%", justifyContent: "space-around", paddingTop: 20 }}>
          <AuthPageDesc title={`Discover your \n Dream lang here`} subTitle="Lorem Ipsum is simply dummy text of the printing and typesetting industry." />
          <View style={{ width: "100%", paddingHorizontal: 25 }}>
            <View style={{ borderWidth: 1, borderColor: "white", height: 55, borderRadius: 15, flexDirection: "row", justifyContent: "space-between" }}>
              <TouchableOpacity
                style={{ backgroundColor: "white", borderTopLeftRadius: 10, borderBottomLeftRadius: 10, borderTopRightRadius: 15, borderBottomRightRadius: 15, width: "50%", alignItems: "center", justifyContent: "center" }}
                onPress={() => { navigation.navigate('Register'); dispatch(reset()) }}
              >
                <Text style={{ fontWeight: "600", }}>Register</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ width: "50%", alignItems: "center", justifyContent: "center" }}
                onPress={() => { navigation.navigate('Login'); dispatch(reset()) }}
              >
                <Text style={{ fontWeight: "600", color: colors.textPrimary }}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default MainScreen