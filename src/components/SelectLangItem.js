import { Text, View, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const SelectLangItem = ({ selected = false, item, oldData, handlePress }) => {
    const colors = useTheme().colors;

    return (
        <TouchableOpacity
            onPress={
                oldData.includes(item.id)
                    ? () => handlePress(() => oldData.filter((id) => id != item.id))
                    : () => handlePress([...oldData, item.id])
            }
            style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 10, height: 50, width: "100%", borderRadius: 25, backgroundColor: colors.lightGray, borderWidth: .2, marginTop: 10 }}
        >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                    style={{ width: 30, height: 30, borderRadius: 100 }}
                    source={item.img}
                />
                <Text style={{ color: colors.textPrimary, marginLeft: 10, fontWeight: "600", width: "78.5%" }}>{item.isoName} ({item.name})</Text>
            </View>
            {
                selected ? (
                    <View style={{ backgroundColor: colors.primary, width: 30, height: 30, borderRadius: 100, alignItems: "center", justifyContent: "center" }}>
                        <Ionicons name="md-checkmark" size={20} color="#fff" />
                    </View>
                ) : (
                    <View style={{ borderWidth: 2, borderColor: colors.primary, width: 30, height: 30, borderRadius: 100, alignItems: "center", justifyContent: "center" }} />
                )
            }
        </TouchableOpacity>
    )
}

export default SelectLangItem