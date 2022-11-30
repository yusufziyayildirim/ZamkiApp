import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useTheme } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

const ProfileListItem = ({ title, icon, rightArrow = false, onPress }) => {
    const colors = useTheme().colors;

    return (
        <TouchableOpacity onPress={() => onPress()}>
            <View style={[styles.itemWrap, { backgroundColor: colors.lightGray, borderColor: colors.background }]}>
                <View style={{ width: 45, alignItems: "center" }}>
                    <FontAwesome style={{ marginRight: 24 }} name={icon} size={24} color={colors.textPrimary} />
                </View>
                <Text style={{ fontWeight: "700", color: colors.textPrimary }}>{title}</Text>
                {rightArrow && (
                    <FontAwesome style={{ position: "absolute", right: 20 }} name="chevron-right" size={20} color={colors.textPrimary} />
                )}
            </View>
        </TouchableOpacity>

    )
}

export default ProfileListItem


const styles = StyleSheet.create({
    itemWrap: {
        position: "relative",
        width: "100%",
        height: 55,
        flexDirection: "row",
        paddingHorizontal: 20,
        alignItems: "center",
        borderTopWidth: 2,
    }
})