import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import * as Icon from "react-native-feather"
import { getListHistory } from "../../data/WalletServices";
import { Utils } from "../../common";
import style from "./style";

import { useSafeAreaInsets } from 'react-native-safe-area-context';

const History = (props) => {
  const insets = useSafeAreaInsets();
  const [list, setList] = useState([])
  
  useEffect(() => {
    getListHistory(props.id).then(task => {
      console.log(task)
      setList(task)
    })
  }, [])

  const renderItem = ({ item }) => {
    const { descripbe, price, created_date, created_time, in_out } = item
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10 }}>
        <Text style={{ color: 'black', fontWeight: 'bold' }}>{descripbe}</Text>
        <View>
          <Text>{Utils.formatDateDefault(created_date)} {created_time}</Text>
          <Text style={[style.textPrice, { color: in_out == 0 ? 'red' : 'green' }]}>{Utils.numberWithCommas(parseFloat(price))} VND</Text>
        </View>
      </View>
    )
  }

  return (
    <View style={[style.container, { marginTop: insets.top }]}>
      <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#50a1e3', padding: 10 }} onPress={() => props.goToBack()}>
        <Icon.ArrowLeft stroke={'white'} />
        <Text style={{ marginLeft: 10, color: 'white' }}>Danh sách lịch sử</Text>
      </TouchableOpacity>
      <View>
        <FlatList
          data={list}
          renderItem={renderItem} />
      </View>
    </View>
  )
}

export default History;