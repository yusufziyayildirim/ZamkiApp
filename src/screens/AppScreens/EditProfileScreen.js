import { Text, View, Image, StatusBar, TextInput, Button, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import ActionButton from '../../components/ActionButton';
import { useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import UserService from '../../services/UserService';
import { URL } from '../../constants/routes';


import { useDispatch, useSelector } from 'react-redux';
import { setUserInfo } from '../../store/auth/authSlice';
import DismissKeyboard from '../../components/DismissKeyboard';


const EditProfileScreen = () => {
    const colors = useTheme().colors;
    const { userInfo } = useSelector((state) => state.auth);
    const [img, setImg] = useState();
    const [name, setName] = useState(userInfo.name)
    const [desc, setDesc] = useState(userInfo.desc);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()

    const dispatch = useDispatch()

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImg(result.assets[0].uri);
        }
    };

    const editProfileSubmit = async () => {
        setLoading(true)
        setError("")
        if (!name) {
            setError("Name field is required")
        } else if (!desc) {
            setError("Biography field is required")
        } else {
            const data = new FormData();
            data.append('name', name)
            data.append('desc', desc)
            if (img) {
                data.append('img', {
                    uri: img,
                    name: "UserProfile.jpg",
                    type: "image/jpg"
                });
            }
            const response = await UserService.setUserProfile(data)
            dispatch(setUserInfo(response.data.data))
            setImg(null)
        }
        setLoading(false)
    }

    return (
        <DismissKeyboard>
            <View style={{ paddingTop: 10, flex: 1, backgroundColor: colors.backgroundSecondary, alignItems: "center" }}>
                <StatusBar barStyle='dark-content' backgroundColor={colors.background} />
                <View style={{ width: "100%", paddingBottom: 10, alignItems: "center", borderBottomWidth: 1, borderBottomColor: colors.background }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        {
                            userInfo.img ? (
                                <Image
                                    style={{
                                        height: 80,
                                        width: 80,
                                        backgroundColor: "white",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        borderRadius: 20,
                                        marginBottom: 10
                                    }}
                                    source={{ uri: `${URL}/storage/${userInfo.img}` }}
                                />
                            ) : (
                                <View
                                    style={{
                                        height: 80,
                                        width: 80,
                                        backgroundColor: colors.background,
                                        alignItems: "center",
                                        justifyContent: "center",
                                        borderRadius: 20,
                                        marginBottom: 10
                                    }}
                                >
                                    <FontAwesome name="user" size={50} color={colors.textPrimary} />
                                </View>
                            )
                        }
                        {
                            img && (
                                <>
                                    <FontAwesome name="long-arrow-right" size={24} color={colors.textPrimary} style={{ marginHorizontal: 20 }} />

                                    <Image
                                        style={{
                                            height: 80,
                                            width: 80,
                                            backgroundColor: "white",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            borderRadius: 20,
                                            marginBottom: 10
                                        }}
                                        source={{ uri: img }}
                                    />
                                </>
                            )
                        }
                    </View>
                    <TouchableOpacity onPress={pickImage}>
                        <Text style={{ color: colors.secondary, fontWeight: "700" }}>Change Photo</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ width: "100%", paddingHorizontal: 25 }}>
                    <View style={{ flexDirection: "row", alignItems: "center", borderBottomWidth: 1, borderBottomColor: colors.background }}>
                        <Text style={{ width: 70, color: colors.textPrimary, }}>Name</Text>
                        <TextInput
                            value={name}
                            onChangeText={(value) => setName(value)}
                            style={{
                                flex: 1,
                                height: 55,
                                borderRadius: 15,
                                backgroundColor: colors.backgroundSecondary,
                                color: colors.textPrimary,
                                paddingHorizontal: 22
                            }}
                        />
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", borderBottomWidth: 1, borderBottomColor: colors.background }}>
                        <Text style={{ width: 70, color: colors.textPrimary, }}>Biography</Text>
                        <TextInput
                            value={desc}
                            onChangeText={(value) => setDesc(value)}
                            style={{
                                flex: 1,
                                height: 55,
                                borderRadius: 15,
                                backgroundColor: colors.backgroundSecondary,
                                color: colors.textPrimary,
                                paddingHorizontal: 22,
                            }}
                        />
                    </View>
                    {error && (
                        <Text style={{ textAlign: "center", color: colors.primary, fontWeight: "700", marginTop: 15 }}>{error}</Text>
                    )}
                    <View style={{ marginTop: 15 }}>
                        <ActionButton disabled={loading} value="Save" onPress={editProfileSubmit} />
                    </View>
                </View>
            </View>
        </DismissKeyboard>
    )
}

export default EditProfileScreen