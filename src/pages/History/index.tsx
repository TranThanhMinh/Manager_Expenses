import React, { useEffect, useState, useTransition } from "react";
import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import * as Icon from "react-native-feather"
import { getListHistory } from "../../data/WalletServices";
import { Utils, String } from "@common";
import style from "./style";

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Color from "../../common/Color";
import Empty from "../../component/Empty";

import { useTranslation, initReactI18next } from "react-i18next"

const History = (props) => {
  const {t} = useTranslation()
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
      <View style={{marginTop:8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10 ,backgroundColor:Color.white}}>
        <Text style={{ color: 'black', fontWeight: 'bold',fontSize:16 }}>{descripbe}</Text>
        <View>
          <Text>{Utils.formatDateDefault(created_date)} {created_time}</Text>
          <Text style={[style.textPrice, { color: in_out == 0 ? 'red' : 'green' }]}>{Utils.numberWithCommas(parseFloat(price))} <Text style={style.textUnit}>{t('text.unit')}</Text></Text>
        </View>
      </View>
    )
  }

  const ItemDivider = () => {
    return (
      <View
        style={{
          height: 0.5,
          marginHorizontal: 10,
          backgroundColor: "#607D8B",
        }}
      />
    );
  }

  return (
    <View style={style.container}>
      <View style={[style.container2, { marginTop: insets.top }]}>
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: Color.blue, padding: 10 }} onPress={() => props.goToBack()}>
          <Icon.ArrowLeft stroke={'white'} />
          <Text style={[style.text2, { color: 'white' }]}>{t('listHistory')}</Text>
        </TouchableOpacity>
          {list != null && list.length > 0 ?
            <FlatList
              data={list}
              style={{ backgroundColor: Color.gray }}
              renderItem={renderItem}
              ItemSeparatorComponent={ItemDivider} /> :
            <Empty title={t('text.not.record')} />}

        </View>
    </View>
  )
}

export default History;