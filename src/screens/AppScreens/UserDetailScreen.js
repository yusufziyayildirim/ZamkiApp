import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useColorScheme, Image, ScrollView, Modal, ActivityIndicator } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import ImageViewer from 'react-native-image-zoom-viewer';
import ExpoFastImage from 'expo-fast-image'
import * as FileSystem from "expo-file-system";

import { languages } from '../../constants/languages';
import { URL } from '../../constants/routes';

const UserDetailScreen = ({ navigation, route }) => {
    const { user } = route.params;
    let scheme = useColorScheme();
    const colors = useTheme().colors;

    const cardBg = scheme === 'dark' ? colors.lightGray : colors.backgroundSecondary;
    const imageUrl = `${FileSystem.cacheDirectory}${user.img.substring(5, user.img.length - 4)}`;

    const [imageModalVisible, setImageModalVisible] = useState(false)
    const changeImageModalVisible = () => {
        setImageModalVisible(!imageModalVisible)
    }

    return (
        <>
            <Modal visible={imageModalVisible} transparent={true}>
                <TouchableOpacity
                    style={{ width: 35, height: 35, borderWidth: .5, borderRadius: 10, borderColor: colors.primary, alignItems: "center", justifyContent: "center", position: "absolute", right: 30, top: 50, zIndex: 20 }}
                    onPress={changeImageModalVisible}
                >
                    <FontAwesome name="close" size={24} color="#fff" />
                </TouchableOpacity>
                <ImageViewer
                    imageUrls={[{ url: imageUrl }]}
                    onCancel={changeImageModalVisible}
                    loadingRender={() =>
                        <ActivityIndicator />
                    }
                    enableSwipeDown
                />
            </Modal>
            <ScrollView style={{ backgroundColor: colors.background, maxHeight: "95%" }}>
                <View style={[styles.headerWrap, { backgroundColor: colors.primary }]}>
                    <View style={styles.headerContent}>
                        <View style={{ left: 0, right: 0, flexDirection: "row", width: "110%", position: "absolute", bottom: 10, alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20 }}>
                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                                <View style={{ width: 20, height: 20, backgroundColor: "green", borderRadius: 50 }} />
                                <Text style={{ paddingLeft: 5, paddingTop: 2, color: "#fff", fontWeight: "700" }}>Active</Text>
                            </View>

                            <TouchableOpacity onPress={() => { navigation.push('References', { user: user.id }) }} style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                                <Text style={{ paddingTop: 6, color: "#fff", fontWeight: "700", marginRight: 3, fontSize: 14, color: colors.textPrimary }}>{user.references_count}</Text>
                                <View style={{ alignItems: "center", justifyContent: "center", width: 22, height: 22, backgroundColor: colors.secondary, borderTopLeftRadius: 15, borderTopEndRadius: 15, borderBottomEndRadius: 15 }}>
                                    <FontAwesome name="quote-right" size={12} color="#fff" />
                                </View>
                            </TouchableOpacity>
                        </View>

                        {user.img != "" ? (
                            <TouchableOpacity onPress={changeImageModalVisible}>
                                <ExpoFastImage
                                    uri={`${URL}/storage/${user.img}`}
                                    cacheKey={user.id}
                                    style={[styles.headerUserImg, { backgroundColor: 'dark' ? colors.lightGray : "#e0e0e2", borderColor: colors.backgroundSecondary }]}
                                />
                            </TouchableOpacity>
                        ) : (
                            <View style={[styles.headerUserImg, { backgroundColor: 'dark' ? colors.lightGray : "#e0e0e2", borderColor: colors.backgroundSecondary }]}>
                                <FontAwesome name="user" size={50} color={colors.secondary} />
                            </View>
                        )}

                    </View>
                </View>

                <View style={{ height: "100%", paddingHorizontal: 20, marginTop: 70 }}>
                    <View style={styles.actionButtonWrap}>
                        <TouchableOpacity style={[styles.actionButton, { backgroundColor: cardBg }]}>
                            <FontAwesome name="phone" size={24} color={colors.secondary} />
                            <Text style={[styles.actionButtonText, { color: colors.secondary }]}>Voice</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.actionButton, { backgroundColor: cardBg }]}>
                            <FontAwesome name="video-camera" size={24} color={colors.secondary} />
                            <Text style={[styles.actionButtonText, { color: colors.secondary }]}>Video</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.actionButton, { backgroundColor: cardBg }]}>
                            <FontAwesome name="commenting" size={24} color={colors.secondary} />
                            <Text style={[styles.actionButtonText, { color: colors.secondary }]}>Message</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.card, { backgroundColor: cardBg }]}>
                        <Text style={{ fontWeight: "600", textAlign: "center", color: colors.textPrimary }}>{user.desc}</Text>
                    </View>
                    <View style={[styles.card, { backgroundColor: cardBg }]}>
                        <Text style={[styles.contentTitle, { color: colors.textSecondary }]}>Native in</Text>
                        {user.native_in.map((item, key) => {
                            let lang = languages.find(lang => lang.id === item.lang);
                            return (
                                <View key={key} style={{ flexDirection: "row", marginTop: 10 }}>
                                    <Image
                                        style={{ width: 20, height: 20, borderRadius: 50, backgroundColor: colors.darkGray }}
                                        source={lang.img}
                                    />
                                    <Text style={[styles.cardItemText, { color: colors.textPrimary }]}>{lang.isoName} ({lang.name})</Text>
                                </View>
                            )
                        })}
                    </View>
                    <View style={[styles.card, { backgroundColor: cardBg }]}>
                        <Text style={[styles.contentTitle, { color: colors.textSecondary }]}>Also Speaking</Text>
                        {user.also_speaking.map((item, key) => {
                            let lang = languages.find(lang => lang.id === item.lang);
                            return (
                                <View key={key} style={{ flexDirection: "row", marginTop: 10 }}>
                                    <Image
                                        style={{ width: 20, height: 20, borderRadius: 50, backgroundColor: colors.darkGray }}
                                        source={lang.img}
                                    />
                                    <Text style={[styles.cardItemText, { color: colors.textPrimary }]}>{lang.isoName} ({lang.name})</Text>
                                </View>
                            )
                        })}
                    </View>
                    <View style={[styles.card, { backgroundColor: cardBg }]}>
                        <Text style={[styles.contentTitle, { color: colors.textSecondary }]}>Learning</Text>
                        {user.learning.map((item, key) => {
                            let lang = languages.find(lang => lang.id === item.lang);
                            return (
                                <View key={key} style={{ marginTop: 10, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                    <View style={{ flexDirection: "row" }}>
                                        <Image
                                            style={{ width: 20, height: 20, borderRadius: 50, backgroundColor: colors.darkGray }}
                                            source={lang.img}
                                        />
                                        <Text style={[styles.cardItemText, { color: colors.textPrimary }]}>{lang.isoName} ({lang.name})</Text>

                                    </View>
                                    <View style={{ flexDirection: "row" }}>
                                        <View style={[styles.learningItem, { backgroundColor: colors.primary }]} />
                                        <View style={[styles.learningItem, { backgroundColor: item.level >= 2 ? colors.primary : colors.darkGray }]} />
                                        <View style={[styles.learningItem, { backgroundColor: item.level == 3 ? colors.primary : colors.darkGray }]} />
                                    </View>
                                </View>
                            )
                        })}
                    </View>
                </View>
            </ScrollView>
        </>
    )
}

export default UserDetailScreen

const styles = StyleSheet.create({
    headerWrap: {
        width: "100%",
        height: 100,
    },
    headerContent: {
        position: "relative",
        height: "100%",
        paddingHorizontal: 20,
        alignItems: "center",
        zIndex: 10
    },
    userInfo: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%"
    },
    headerUserName: {
        color: "white",
        fontSize: 20,
        fontWeight: "700",
        textTransform: 'capitalize'
    },
    headerUserImg: {
        height: 120,
        width: 120,
        // 
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 100,
        borderWidth: 2,
        // borderColor: colors.gray,
        bottom: -25
    },
    contentTitle: {
        fontSize: 14,
        fontWeight: "700",
        textTransform: "uppercase"
    },
    actionButtonWrap: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        justifyContent: "space-around"
    },
    actionButton: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        width: 100,
        height: 70,
        borderRadius: 20
    },
    actionButtonText: {
        // color: colors.red,
        fontWeight: "600",
        paddingTop: 3
    },
    card: {
        width: "100%",
        padding: 10,
        marginTop: 10,
        borderRadius: 10,
        backgroundColor: "white"
    },
    cardItemText: {
        marginLeft: 5,
        fontWeight: "600"
    },
    learningItem: {
        width: 7,
        height: 20,
        marginLeft: 5
    }
})