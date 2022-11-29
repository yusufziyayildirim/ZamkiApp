import axios from "axios";
import routes from "../constants/routes";
import headerConfig from "../utils/headerConfig";

const setUserLanguage = async (nativeIn, alsoSpeaking, learning) => {
    try {
        const response = await axios
            .post(routes.SET_USER_LANGUAGES,
                {
                    nativeIn,
                    alsoSpeaking,
                    learning
                },
                {
                    headers: await headerConfig()
                }
            );
        return response
    } catch (error) {
        if (error.response && error.response.data.message) {
            return error.response.data.message
        } else {
            return error.message
        }
    }
};

const UserService = {
    setUserLanguage,
};

export default UserService;