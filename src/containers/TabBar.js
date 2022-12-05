import { View, TouchableOpacity, StyleSheet, Image, SafeAreaView } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';

import { URL } from '../constants/routes';
import { useSelector } from 'react-redux';

function TabBar({ state, descriptors, navigation }) {
    const colors = useTheme().colors;
    const { userInfo } = useSelector((state) => state.auth);

    return (
        <SafeAreaView style={{ backgroundColor: colors.background, paddingBottom: Platform.OS === 'android' ? 15 : 0 }}>

            <View style={[styles.tabBarWrap, { backgroundColor: colors.background, borderTopColor: colors.lightGray, }]}>
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    const label =
                        options.tabBarLabel !== undefined
                            ? options.tabBarLabel
                            : options.title !== undefined
                                ? options.title
                                : route.name;

                    const isFocused = state.index === index;

                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            // The `merge: true` option makes sure that the params inside the tab screen are preserved
                            navigation.navigate({ name: route.name, merge: true });
                        }
                    };

                    return (
                        <TouchableOpacity key={label} onPress={onPress} style={styles.tabBarButton}>
                            {
                                (label === "Community" && isFocused) ? (
                                    <Ionicons name="people" size={26} color={colors.textPrimary} />
                                ) : (
                                    label == "Community" && (
                                        <Ionicons name="people-outline" size={26} color={colors.textPrimary} />
                                    )
                                )
                            }
                            {
                                (label === "ChatList" && isFocused) ? (
                                    <Ionicons name="chatbubbles" size={24} color={colors.textPrimary} />
                                ) : (
                                    label == "ChatList" && (
                                        <Ionicons name="chatbubbles-outline" size={24} color={colors.textPrimary} />
                                    )
                                )
                            }
                            {
                                (label === "RoomList" && isFocused) ? (
                                    <Ionicons name="ios-logo-slack" size={24} color={colors.textPrimary} />
                                    // <FontAwesome5 name="slack" size={24} color={colors.background} />
                                ) : (
                                    label == "RoomList" && (
                                        <Feather name="slack" size={24} color={colors.textPrimary} />
                                    )
                                )
                            }
                            {
                                (label === "Profile") && (
                                    <Image
                                        style={{
                                            height: 24,
                                            width: 24,
                                            borderRadius: 100,
                                            marginBottom:2
                                        }}
                                        source={{ uri: `${URL}/storage/${userInfo.img}` }}
                                    />
                                )
                            }

                            {isFocused && <View style={[styles.indicator, { backgroundColor: colors.primary, }]} />}
                        </TouchableOpacity>
                    )
                })}
            </View>
        </SafeAreaView>
    );
}

export default TabBar;

const styles = StyleSheet.create({
    tabBarWrap: {
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: "#fff",
        shadowOpacity: 0.1,
        paddingBottom: 5,
        borderTopWidth: 0.5,
    },
    tabBarButton: {
        flex: 1,
        justifyContent: "flex-start",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 15,
        height: 45
    },
    indicator: {
        height: 4,
        width: 4,
        borderRadius: 100,
        marginTop: 2
    }
})