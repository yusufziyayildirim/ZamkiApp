import axios from "axios";
import routes from "../constants/routes";
import AsyncStorage from '@react-native-async-storage/async-storage';
import headerConfig from "../utils/headerConfig";

const register = (name, email, password, password_confirmation) => {
    return axios
        .post(routes.REGISTER,
            {
                name,
                email,
                password,
                password_confirmation
            },
            {
                headers: headerConfig()
            }
        );
};

const login = async (email, password) => {
    return axios
        .post(routes.LOGIN,
            {
                email,
                password,
            },
            {
                headers: headerConfig()
            }
        ).then(async (response) => {
            if (response.data.status) {
                AsyncStorage.setItem('userToken', response.data.data)
            }
            const headers = await headerConfig();
            
            //Get logged user data
            const user = await axios.get(routes.LOGGED_USER, { headers: headers })
            console.log(user)
            return [response.data.data, user.data.data[0]];
        });
};

const AuthService = {
    register,
    login,
};

export default AuthService;