
export const URL = "http://10.254.112.61:8000";
const BASE_URL = "http://10.254.112.61:8000/api";
const routes = {
    LOGIN: BASE_URL + "/login",
    LOGOUT: BASE_URL + "/logout",
    REGISTER: BASE_URL + "/register",
    LOGGED_USER: BASE_URL + "/loggeduser",
    RESEND_NOTIFICATION: BASE_URL + "/email/verification-notification",
    RESET_PASSWORD_MAIL: BASE_URL + "/send-reset-password-email",
    CHANGE_PASSWORD: BASE_URL + "/changepassword",
    GET_ALL_USER: BASE_URL + "/getalluser",
    SET_USER_LANGUAGES: BASE_URL + "/setuserlanguage",
    UPDATE_NATIVE_IN: BASE_URL + "/update/nativeinlanguage",
    UPDATE_ALSO_SPEAKING: BASE_URL + "/update/alsospeakinglanguage",
    UPDATE_LEARNING: BASE_URL + "/update/learninglanguage",
    UPDATE_PROFILE: BASE_URL + "/update/profile",
}

export default routes;