import AsyncStorage from '@react-native-async-storage/async-storage';

export const getToken = async () => {
    try {
        const token = await AsyncStorage.getItem('userToken');
        return token
    } catch (e) {
        // save error
    }
}

export default async function headerConfig() {
    const token = await getToken()

    if (token) {
        return { Authorization: `Bearer ${token}`, };
    } else {
        return { 'Content-Type': 'application/json' };
    }
}