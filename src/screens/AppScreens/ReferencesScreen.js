import { useState, useEffect } from "react";
import { Text, View, Image, ScrollView, TouchableOpacity } from "react-native"
import { useTheme } from '@react-navigation/native';
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

    return (
        <ScrollView style={{ backgroundColor: colors.backgroundSecondary }}>
            {
                references ? (
                    references?.map((ref, key) => {
                        return (
                            <TouchableOpacity
                                key={key}
                                onPress={() => { navigation.push('UserDetail', { user: ref.from_user }) }}
                                style={{ flexDirection: "row", paddingVertical: 10, paddingHorizontal: 30, borderTopColor: colors.lightGray, borderTopWidth: 1 }}
                            >
                                <Image
                                    style={{ height: 40, width: 40, borderRadius: 20, marginRight: 10 }}
                                    source={{ uri: `${URL}/storage/${ref.from_user.img}` }}
                                />
                                <View>
                                    <View style={{ marginBottom: 7 }}>
                                        <Text style={{ fontWeight: "700", fontSize: 15, color: colors.textPrimary, marginBottom: 4 }}>{ref.from_user.name}</Text>
                                        <Text style={{ fontSize: 11, fontWeight: "600", color: colors.darkGray }}>{ref.updated_at}</Text>
                                    </View>
                                    <Text style={{ fontSize: 13, fontWeight: "600", color: colors.textPrimary }}>{ref.message}</Text>
                                </View>
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