import React from "react";
import { View ,Text} from "react-native";
import { Color } from "@common";
import { useTheme } from "react-native-paper";

const Empty = (props) => {
    const {colors} = useTheme()
    return (
        <View style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.background,
            width:'100%',
            height:'100%'
        }}>
            <Text style={{
                color: Color.gray2,
                fontSize:18
            }}>{props.title}</Text>
        </View>
    )
}

export default Empty;