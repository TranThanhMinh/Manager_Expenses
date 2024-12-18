import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Animated, StyleSheet } from "react-native"
import { useIsFocused } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import style from "./style";
import { FloodReports } from "../../model/types.d";
import {
  getListExpenses
} from "../../data/ExpensesServices ";
import moment from 'moment';
import * as ActionTypes from '../../redux/actions/ActionTypes'
import { Utils, Color } from "@common";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation, initReactI18next } from "react-i18next"
import Empty from '../../component/Empty'
import { useTheme } from "react-native-paper";
import Banner from "../../component/Banner";

const Borrow = (props) => {
  const insets = useSafeAreaInsets();
  const isVisible = useIsFocused();
  const { t } = useTranslation()
  const {colors} = useTheme()
  const { danangReducer } = useSelector(state => state)
  const [listExpenses, setListExpenses] = useState([])
  const [data, setData] = useState<FloodReports>()
  const [borrow, setBorrow] = useState(0)
  const [pay, setPay] = useState(0)
  const [lend, setLend] = useState(0)
  const [debtcollection, setDebtCollection] = useState(0)

  let sum_borrow = 0
  let sum_lend = 0
  let sum_pay = 0
  let sum_debt_collection = 0

  useEffect(() => {
    if (isVisible) {
      getListExpenses().then(task => {
        let list = task.filter(item => item.type == 12 || item.type == 13 || item.type == 14 || item.type == 15)
        filterDate(list)
      })
    } else {
      setListExpenses([])
      setBorrow(0)
      setPay(0)
      setLend(0)
      setDebtCollection(0)
    }

  }, [isVisible]);

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
  }, [danangReducer])

  const filterDate = (list) => {
    let newList = Object.values(list.reduce((acc, item) => {
      if (!acc[item.created_date]) acc[item.created_date] = {
        created_date: item.created_date,
        list: []
      };
      acc[item.created_date].list.push(item);
      return acc;
    }, {}))
    setListExpenses(newList.sort(biggestToSmallest))
  }

  function biggestToSmallest(a, b) {
    return b.created_date - a.created_date;
  }

  const momentFormat = (date) => {
    return moment(date).format("DD-MM-YYYY")
  }

  const momentFormatTime = (date) => {
    return moment(date).format("hh:mm")
  }

  const itemBorrow = ({ item, index }) => {

    item.list.map((i) => {
      if (i.type == 12)
        sum_borrow = sum_borrow + parseFloat(i.price)
      else if (i.type == 13)
        sum_pay = sum_pay + parseFloat(i.price)
      else if (i.type == 14)
        sum_lend = sum_lend + parseFloat(i.price)

      else if (i.type == 15)
        sum_debt_collection = sum_debt_collection + parseFloat(i.price)
    })

    if (index == listExpenses.length - 1) {
      setBorrow(sum_borrow)
      setLend(sum_lend)
      setPay(sum_pay)
      setDebtCollection(sum_debt_collection)
    }

    let newList = item.list.filter(item => item.type == 12 || item.type == 14)

    return (
      <View>
        {
          newList.length > 0 ?
            (
              <View style={{ backgroundColor: colors.viewBackground, marginTop: 8 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ backgroundColor: Color.blue, width: 5, height: 50 }} />
                  <Text style={{
                    fontSize: 18, marginLeft: 10, fontWeight: 'bold',color: colors.title
                  }}>{momentFormat(parseFloat(item.created_date))}</Text>
                </View>

                <View style={{ backgroundColor: colors.title, height: 0.7, margin: 5 }} />
                <FlatList
                  data={newList}
                  showsVerticalScrollIndicator={false}
                  renderItem={renderItem} />

              </View>
            ) : null
        }

      </View>
    )
  }

  const renderItem = ({ item, index }) => {
    const { descripbe, price, type, created_date, created_time, price_borrow, id } = item
    let prencent = 100 - (parseFloat(price_borrow) / parseFloat(price)) * 100
    let borrow = parseFloat(price) - parseFloat(price_borrow)
    return (
      <View
        style={[style.rowFront,{backgroundColor:colors.viewBackground}]}>
        <View>
          <View style={style.itemExpenses}>
            <Text style={[style.text, { fontWeight: 'bold', color:  colors.title }]}>{descripbe} ({t(Utils.TypeExpenses[type].name)})</Text>
            <TouchableOpacity
              onPress={() => {
                props.goToHistory(id)
              }}>
              <Text style={style.text5}>{t('text.total.detail')}</Text>
            </TouchableOpacity>
          </View>
          <View style={[style.itemExpenses, { marginTop: 10 }]}>
            <Text style={[style.text, { color: colors.title }]}>{type == 12 ? t('text.total.debt') : t('text.total.loan')} {Utils.numberWithCommas(parseFloat(price))} <Text style={style.textUnit}>{t('text.unit')}</Text></Text>
          </View>
          <View style={style.itemExpenses}>
            <Text style={[style.text, { color: type == 13 ? 'green' : Color.red }]}>{type == 12 ? t('text.total.payable') : t('text.total.collectible')} {Utils.numberWithCommas(price_borrow)} <Text style={style.textUnit}>{t('text.unit')}</Text></Text>
            <Text style={[style.text, { color: type == 13 ? Color.red : 'green' }]}>{type == 12 ? t('text.total.paid') : t('text.total.collected')} {Utils.numberWithCommas(borrow)} <Text style={style.textUnit}>{t('text.unit')}</Text></Text>
          </View>
          <View style={style.progressBar}>
            <Animated.View style={[StyleSheet.absoluteFill, { backgroundColor: "green", width: `${prencent}%` }]} />
          </View>
        </View>
      </View>
    )
  }

  return (
    <View style={style.container}>
      <View style={[style.container2, { marginTop: insets.top ,backgroundColor:colors.background}]}>
        <View style={{ flexDirection: 'row', padding: 10, backgroundColor: Color.blue, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={[style.text2, { color: 'white' }]}>{t('text.lent.borrow')}</Text>
        </View>
        <Banner/>
        {
          listExpenses != null && listExpenses.length > 0 ?
            <FlatList
              data={listExpenses}
              renderItem={itemBorrow}
              showsVerticalScrollIndicator={false}
            />
            :
            <Empty title={t('text.not.record')} />
        }
      </View>
    </View>
  )
}
export default Borrow;