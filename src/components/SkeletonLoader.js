import { View } from "react-native"
import { useTheme } from '@react-navigation/native';

const SkeletonLoader = ({ w, h, mt = 0, rd = 0 }) => {
    const colors = useTheme().colors;

    return (
        <View style={{ backgroundColor: colors.lightGray, width: w, height: h, marginTop: mt, borderRadius: rd }} />
    )
}

export default SkeletonLoader