import axios from "axios";
import routes from "../constants/routes";
import headerConfig from "../utils/HeaderConfig";

const register = (name, email, password, password_confirmation) => {
    return axios.post(routes.REGISTER, {
        name,
        email,
        password,
        password_confirmation
    },
        { headers: headerConfig() }
    );
};

const AuthService = {
    register,
};

export default AuthService;