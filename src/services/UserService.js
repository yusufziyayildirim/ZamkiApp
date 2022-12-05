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

const setUserProfile = async (data) => {
    try {
        const response = await axios
            .post(routes.UPDATE_PROFILE,
                data,
                {
                    headers: await headerConfig(true)
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
}

const updateUserLanguage = async (data, route) => {
    try {
        const response = await axios
            .post(
                route == "Native In" ? routes.UPDATE_NATIVE_IN :
                    route == "Also Speaking" ? routes.UPDATE_ALSO_SPEAKING :
                        route == "Learning" && routes.UPDATE_LEARNING,

                route == "Native In" ? { nativeIn: data } :
                    route == "Also Speaking" ? { alsoSpeaking: data } :
                        route == "Learning" && { learning: data },

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
}


const UserService = {
    setUserLanguage,
    setUserProfile,
    updateUserLanguage
};

export default UserService;