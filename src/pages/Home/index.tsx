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
  addExpenses, getListExpenses, removeTask, updateTask, getListExpensesDate,
  getListExpensesFromDateToDate
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
const Home = (props) => {
  const isVisible = useIsFocused();
  const { danangReducer } = useSelector(state => state)
  const dispatch = useDispatch();
  const [id, setId] = useState('')
  const [listExpenses, setListExpenses] = useState([])
  const [listSearch, setListSearch] = useState([])
  const [title, setTitle] = useState('')
  const [key, setKey] = useState(0)
  const [descripbe, setDescripbe] = useState('')
  const [isDescripbe, setIsDescripbe] = useState(true)
  const [price, setPrice] = useState('')
  const [isPrice, setIsPrice] = useState(true)
  const [data, setData] = useState<FloodReports>()
  const [sumExpenses, setSumExpenses] = useState(0)
  const [borrow, setBorrow] = useState(0)
  const [pay, setPay] = useState(0)
  const [lend, setLend] = useState(0)
  const [debtcollection, setDebtCollection] = useState(0)
  const [fromDate, setSelectedFromDate] = useState(0)
  const [toDate, setSelectedToDate] = useState(0)
  const [isFromDate, setFromDate] = useState(false);
  const [isToDate, setToDate] = useState(false);

  let sum = 0
  let sum_borrow = 0
  let sum_lend = 0
  let sum_pay = 0
  let sum_debt_collection = 0

  const session = ["Buổi sáng", "Buổi trưa", "Buổi tối"]

  useEffect(() => {
    if (isVisible) {
      let date = new Date().getTime()
      getListDate(date, date)
    }

  }, [isVisible]);

  // useEffect(()=>{
  //  setListSearch(listExpenses)
  // },[listExpenses])


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

  const getListDate = (fromdate, toDate) => {
    console.log('getListDate', moment(momentFormat(fromdate), "DD-MM-YYYY").toDate().getTime(), toDate)
    let from = moment(momentFormat(fromdate), "DD-MM-YYYY").toDate().getTime()
    setSelectedFromDate(from)
    setSelectedToDate(toDate)
    getListExpensesFromDateToDate(from, toDate).then(task => {
      let a = [...task, ...task, ...task, ...task, ...task]
      setListExpenses(task)
      setListSearch(task)
    })
    setId('')
    setDescripbe('')
    setPrice('')
  }


  const momentFormat = (date) => {
    return moment(date).format("DD-MM-YYYY")
  }

  const momentFormatTime = (date) => {
    return moment(date).format("hh:mm")
  }


  const renderItem = ({ item, index }) => {
    const { title, descripbe, price, type, created_date, created_time } = item
    if (type != 9 && type != 12)
      sum = sum + parseFloat(price)

    if (type == 9)
      sum_borrow = sum_borrow + parseFloat(price)

    if (type == 10)
      sum_pay = sum_pay + parseFloat(price)

    if (type == 11)
      sum_lend = sum_lend + parseFloat(price)

    if (type == 12)
      sum_debt_collection = sum_debt_collection + parseFloat(price)

    if (index == listExpenses.length - 1) {
      setSumExpenses(sum)
      setBorrow(sum_borrow)
      setLend(sum_lend)
      setPay(sum_pay)
      setDebtCollection(sum_debt_collection)
    }

    return (
      <TouchableHighlight
        onPress={() => {
          props.goToEdit(item)
        }}
        style={style.rowFront}
        underlayColor={'#fff'}
      >
        <View>
          <View style={style.itemExpenses}>
            <Text style={style.text}>{Utils.session[title].name}</Text>
            <Text style={style.text}>{momentFormat(parseFloat(created_date))} {created_time}</Text>
          </View>
          <View style={style.itemExpenses}>
            <Text style={style.text}>{descripbe} ({Utils.TypeExpenses[type].name})</Text>
            <Text style={[style.text, { color: 'red' }]}>{numberWithCommas(parseFloat(price))} VND</Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  }

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };


  const handleRemove = (id) => {
    console.log(id, fromDate, toDate)
    removeTask(id).then(task => {
      getListExpensesFromDateToDate(fromDate, toDate).then(task => {
        setListExpenses(task)
        setListSearch(task)
      })
    })
  }

  const renderHiddenItem = (data, rowMap) => {

    return (
      <View style={style.rowBack}>
        <TouchableOpacity
          style={[style.actionButton, style.deleteBtn]}
          onPress={() => handleRemove(data != null ? data.item.id : null)}
        >
          <Text style={style.btnText}>Xóa</Text>
        </TouchableOpacity>
      </View>
    )
  }

  const onItemOpen = data => {
  };

  const onFromDateChange = (date) => {
    getListDate(new Date(date).getTime(), toDate)
    toggleModalFromDate()
  }

  const onToDateChange = (date) => {
    getListDate(fromDate, new Date(date).getTime())
    toggleModalToDate()
  }

  const toggleModalFromDate = () => {
    setFromDate(!isFromDate);
  };

  const toggleModalToDate = () => {
    setToDate(!isToDate);
  };


  const handleSearch = (search) => {
    if (search != '') {
      console.log('search', search)
      const list = listSearch.filter(item => item.descripbe.toLowerCase().includes(search.toLowerCase()))
      setListExpenses(list)
    } else {
      setListExpenses(listSearch)
      console.log('search all', listSearch)
    }

  }


  return (
    <View style={style.container}>
      {/* {addBook()} */}
      <View style={{ marginTop: 10,marginHorizontal:10, flexDirection: 'row' }}>
        <Text style={{ fontWeight: 'bold', color: '#50a1e3' }}>Từ</Text>
        <TouchableOpacity onPress={toggleModalFromDate}>
          <Text style={{ fontWeight: 'bold' }}> {fromDate ? momentFormat(fromDate) : momentFormat(new Date().getTime())}</Text>
        </TouchableOpacity>
        <Text style={{ fontWeight: 'bold', color: '#50a1e3' }}> Đến </Text>
        <TouchableOpacity onPress={toggleModalToDate}>
          <Text style={{ fontWeight: 'bold' }}>{toDate ? momentFormat(toDate) : momentFormat(new Date().getTime())}</Text>
        </TouchableOpacity>
      </View>
      <View style={{margin:10 }}>
        <TextInput placeholder="tìm kiếm" style={style.borderSearch} onChangeText={(text) => handleSearch(text)} />
      </View>
      <SwipeListView
        style={{ marginBottom: 80, marginTop: 5,marginHorizontal:10 }}
        data={listExpenses}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        leftOpenValue={0}
        rightOpenValue={-75}
        previewRowKey={'0'}
        previewOpenValue={-40}
        previewOpenDelay={3000}
        onRowDidOpen={onItemOpen} />
      <View style={{ position: 'absolute', bottom: 20, width: '100%',borderTopWidth:0.5,borderColor:'#50a1e3' }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10,marginTop:5 }}>
          <Text style={{ color: 'red' }}>Tổng tiền chi: {numberWithCommas(sumExpenses)} VND</Text>
          <Text style={{ color: 'red' }}>Thu nợ: {numberWithCommas(debtcollection)} VND</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10 }}>
          <Text style={{ color: 'red' }}>Trả nợ: {numberWithCommas(pay)} VND</Text>
          <Text style={{ color: 'red' }}>Cho vay: {numberWithCommas(lend)} VND</Text>
        </View>

        <Text style={{ color: 'red',marginHorizontal:10 }}>Đi vay: {numberWithCommas(borrow)} VND</Text>
      </View>
      <TouchableOpacity style={{ position: 'absolute', bottom: 80, right: 20 }} onPress={() => props.goToAdd()}>
        <ButtonAdd />
      </TouchableOpacity>
      <Modal isVisible={isFromDate}>
        <View style={{ backgroundColor: 'white' }}>
          <CalendarPicker
            previousTitle="Trước"
            nextTitle="Sau"
            weekdays={['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy']}
            months={['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12']}

            onDateChange={onFromDateChange}
          />
        </View>
      </Modal>
      <Modal isVisible={isToDate}>
        <View style={{ backgroundColor: 'white' }}>
          <CalendarPicker
            previousTitle="Trước"
            nextTitle="Sau"
            weekdays={['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy']}
            months={['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12']}

            onDateChange={onToDateChange}
          />
        </View>
      </Modal>
    </View>
  )
}

export default Home;