import { useState, useEffect } from "react";
import { Text, View, ScrollView, TouchableOpacity } from "react-native"
import { useTheme } from '@react-navigation/native';
import ExpoFastImage from 'expo-fast-image'
import UserService from "../../services/UserService";

import { URL } from "../../constants/routes"

//Components
import SkeletonLoader from "../../components/SkeletonLoader";

const ReferencesScreen = ({ route, navigation }) => {
    const { user } = route.params
    const colors = useTheme().colors;
    const [references, setReferences] = useState()

    useEffect(() => {
        getReferences()
    }, [])

    const getReferences = async () => {
        const response = await UserService.getUserReference(user);
        setReferences(response.data.data)
    }

    let date;

    return (
        <ScrollView style={{ backgroundColor: colors.backgroundSecondary }}>
            {
                references ? (
                    references?.map((ref, key) => {
                        date = new Date(ref.updated_at);
                        return (
                            <TouchableOpacity
                                key={key}
                                onPress={() => { navigation.push('UserDetail', { user: ref.from_user }) }}
                                style={{ paddingVertical: 15, paddingHorizontal: 30, borderTopColor: colors.lightGray, borderTopWidth: 1 }}
                            >
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <ExpoFastImage
                                        uri={`${URL}/storage/${ref.from_user.img}`}
                                        cacheKey={ref.from_user.img.substring(5, ref.from_user.img.length - 4)}
                                        style={{ height: 35, width: 35, borderRadius: 20, marginRight: 10 }}
                                    />
                                    <View>
                                        <Text style={{ fontWeight: "700", fontSize: 15, color: colors.textPrimary, marginBottom: 4 }}>{ref.from_user.name}</Text>
                                        <Text style={{ fontSize: 11, fontWeight: "600", color: colors.darkGray }}>{date.toLocaleDateString()} {date.toLocaleTimeString()}</Text>
                                    </View>
                                </View>


                                <Text style={{ paddingTop: 10, fontSize: 13, fontWeight: "600", color: colors.textPrimary }}>{ref.message}</Text>
                            </TouchableOpacity>
                        )
                    })
                ) : (
                    [1, 2, 3, 4, 5].map((key) => {
                        return (
                            <View
                                key={key}
                                style={{ flexDirection: "row", paddingVertical: 10, paddingHorizontal: 30, borderTopColor: colors.lightGray, borderTopWidth: 1 }}
                            >
                                <SkeletonLoader w={40} h={40} rd={20} />
                                <View
                                    style={{
                                        width: "100%",
                                        paddingLeft: 15,
                                        paddingRight: 15,
                                        height: 45,
                                        justifyContent: "space-between"
                                    }}
                                >
                                    <SkeletonLoader w={140} h={10} />
                                    <SkeletonLoader w={170} h={8} />
                                    <SkeletonLoader w={240} h={10} />
                                </View>
                            </View>
                        )
                    })
                )
            }
        </ScrollView>

    )
}

export default ReferencesScreen