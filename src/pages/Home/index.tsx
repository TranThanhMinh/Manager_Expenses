import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TextInput, TouchableOpacity } from "react-native"
import { Color } from "../../common";
import { useSelector, useDispatch } from "react-redux";
import style from "./style";
import { getFloodReports } from "../../redux/actions/danang";
import { Data } from "../../model/types.d";
import { FloodReports } from "../../model/types.d";

import { addTask, getListTasks} from "../../data/StorageServices";

import * as ActionTypes from '../../redux/actions/ActionTypes'
const Home = () => {
    const { danangReducer } = useSelector(state => state)
    const dispatch = useDispatch();
    const [id, setId] = useState('')

    const [data, setData] = useState<FloodReports>()

    useEffect(() => {
        dispatch(getFloodReports());

        // addTask('minh tran')
        // addTask('minh tran')
        // addTask('minh tran')
        getListTasks().then(task =>{
            console.log(task)
        })
    }, [])


    useEffect(() => {
        const { data, type, message } = danangReducer
        switch (type) {
            case ActionTypes.FLOOD_REPORTS_PENDING:
                break
            case ActionTypes.FLOOD_REPORTS_SUCCESS:
                setData(data)
                break
            case ActionTypes.FLOOD_REPORTS_FAIL:
                break
        }
    },[danangReducer])

    const itemBook = ({ item }) => {
        const i = item as Data
        return (
            <TouchableOpacity onPress={()=>{console.log(i.location.coordinates)}}>
                <Text>{i.location.address}</Text>
            </TouchableOpacity>
        )
    }

 


    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Color.white, marginHorizontal: 5 }}>
 
            <FlatList
                data={data?.data}
                renderItem={itemBook} />
        </View>
    )
}

export default Home;