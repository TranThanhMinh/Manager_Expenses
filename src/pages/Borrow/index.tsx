import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TextInput, TouchableOpacity, TouchableHighlight } from "react-native"
import { useIsFocused } from "@react-navigation/native";
import { Color } from "../../common";
import { useSelector, useDispatch } from "react-redux";
import style from "./style";
import { getFloodReports } from "../../redux/actions/danang";
import { Data } from "../../model/types.d";
import { FloodReports } from "../../model/types.d";
import urid from 'urid';
import { addTask, getListTasks } from "../../data/StorageServices";
import {
  removeTask, getListExpenses, deleteBorrow
} from "../../data/ExpensesServices ";
import moment from 'moment';
import * as ActionTypes from '../../redux/actions/ActionTypes'
import SelectDropdown from 'react-native-select-dropdown'
import Icon from 'react-native-vector-icons/FontAwesome';
import { SwipeListView } from 'react-native-swipe-list-view';
import CalendarPicker from 'react-native-calendar-picker';
import Modal from "react-native-modal";
import ButtonAdd from "../../component/ButtonAdd";
import { Utils } from "@common";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Borrow = (props) => {
  const insets = useSafeAreaInsets();
  const isVisible = useIsFocused();
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
    console.log(JSON.stringify(newList))
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
              <View style={{ margin: 5 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 5 }}>
                  <Text style={{
                    fontSize: 17,
                  }}>Ngày {momentFormat(parseFloat(item.created_date))}</Text>
                </View>

                <View style={{ backgroundColor: 'black', height: 0.7, margin: 5 }} />
                <FlatList
                  style={{ marginHorizontal: 10 }}
                  data={newList}
                  renderItem={renderItem} />
              </View>
            ) : null
        }

      </View>
    )
  }

  const renderItem = ({ item, index }) => {
    const { descripbe, price, type, created_date, created_time, price_borrow, id } = item
    return (
      <TouchableOpacity
        onPress={() => {
          props.goToHistory(id)
        }}
        style={[style.rowFront, { backgroundColor: price_borrow == 0 ? 'gray' : 'white' }]}>
        <View>
          <View style={style.itemExpenses}>
            <Text style={[style.text, { fontWeight: 'bold', color: 'black' }]}>{Utils.TypeExpenses[type].name}</Text>
            <Text style={style.text}>{descripbe}</Text>
          </View>
          <View style={style.itemExpenses}>
            <Text style={[style.text, { color: type == 13 ? 'green' : 'red' }]}>{Utils.numberWithCommas(parseFloat(price))} VND</Text>
            <Text style={[style.text, { color: type == 13 ? 'red' : 'green' }]}>Còn nợ : {Utils.numberWithCommas(parseFloat(price_borrow))} VND</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View style={[style.container, { marginTop: insets.top }]}>
      <View style={{ flexDirection: 'row', padding: 5, backgroundColor: '#50a1e3', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={[style.text2, { color: 'white' }]}>Danh sách cho vay - đi vay</Text>
      </View>
      <FlatList
        style={{ marginTop: 10, marginBottom: 80 }}
        data={listExpenses}
        renderItem={itemBorrow}
      />
      <View style={{ position: 'absolute', bottom: 10, width: '100%', borderTopWidth: 0.5, borderColor: '#50a1e3' }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10, marginTop: 5 }}>
          <Text style={{ marginTop: 10, color: 'red', fontSize: 15 }}>Cho vay: {Utils.numberWithCommas(lend)} VND</Text>
          <Text style={{ marginTop: 10, color: 'green', fontSize: 15 }}>Thu nợ: {Utils.numberWithCommas(debtcollection)} VND</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10 }}>
          <Text style={{ marginTop: 10, color: 'green', fontSize: 15 }}>Đi vay: {Utils.numberWithCommas(borrow)} VND</Text>

          <Text style={{ marginTop: 10, color: 'red', fontSize: 15 }}>Trả nợ: {Utils.numberWithCommas(pay)} VND</Text>
        </View>


      </View>
    </View>
  )
}
export default Borrow;