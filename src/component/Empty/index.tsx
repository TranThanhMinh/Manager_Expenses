import React from "react";
import { View ,Text} from "react-native";
import { Color } from "@common";

const Empty = (props) => {
    return (
        <View style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: Color.gray ,
            flex: 1
        }}>
            <Text style={{
                textAlign: 'center',
                alignItems: 'center',
                alignContent: 'center',
                color: Color.gray2,
                fontSize:18
            }}>{props.title}</Text>
        </View>
    )
}

export default Empty;