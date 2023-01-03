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
  removeTask, getListExpensesFromDateToDate, deleteBorrow
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
      let list = task.filter(item => item.type != 9 && item.type != 10 && item.type != 11 && item.type != 12)
      filterDate(list)
    })
    setId('')
    setDescripbe('')
    setPrice('')
  }

  const filterDate = (list) => {
    let newList = Object.values(list.reduce((acc, item) => {
      if (!acc[item.created_date]) acc[item.created_date] = {
        created_date: item.created_date,
        list: []
      };
      acc[item.created_date].list.push(item);
      return acc;
    }, {}))
    setListExpenses(newList)
    setListSearch(newList)
    if (list.length == 0)
      setSumExpenses(0)
  }


  const momentFormat = (date) => {
    return moment(date).format("DD-MM-YYYY")
  }

  const momentFormatTime = (date) => {
    return moment(date).format("HH:mm")
  }

  const itemExpenses = ({ item, index }) => {
    console.log('renderItem', price)
    let sum2 = 0
    item.list.map((i) => {
      sum2 = sum2 + parseFloat(i.price)
    })

    sum = sum + sum2
    if (index == listExpenses.length - 1)
      setSumExpenses(sum)

    return (
      <View style={{ margin: 5 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{
            fontSize: 17,
          }}>Ngày {momentFormat(parseFloat(item.created_date))}</Text>
          <Text style={{
            fontSize: 17, color: 'green', fontWeight: 'bold'
          }}>{Utils.numberWithCommas(sum2)} VND</Text>
        </View>

        <View style={{ backgroundColor: 'black', width: '100%', height: 0.7, marginVertical: 5 }} />
        <SwipeListView
          style={{ marginHorizontal: 10 }}
          data={item.list}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          leftOpenValue={0}
          rightOpenValue={-75}
          previewRowKey={'0'}
          previewOpenValue={-40}
          previewOpenDelay={3000}
          onRowDidOpen={onItemOpen} />
      </View>
    )
  }


  const renderItem = ({ item, index }) => {

    const { descripbe, price, type, created_date, created_time, price_borrow } = item

    return (
      <TouchableHighlight
        onPress={() => {
          props.goToEdit(item)
        }}
        style={style.rowFront}
        underlayColor={'#fff'}
      >
        <View style={{ height: 50 }}>
          <View style={style.itemExpenses}>
            <Text style={[style.text2, { color: 'black' }]}>{Utils.TypeExpenses[type].name}</Text>
            <Text style={style.text}> {created_time}</Text>
          </View>
          <View style={style.itemExpenses}>
            <Text style={style.text}>{descripbe}</Text>
            <Text style={[style.text, { color: 'red' }]}>{Utils.numberWithCommas(parseFloat(price))} VND</Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  }




  const handleRemove = (id, id_borrow, price_borrow) => {
    console.log(id, fromDate, toDate)
    removeTask(id).then(task => {
      getListExpensesFromDateToDate(fromDate, toDate).then(task => {
        if (id_borrow != '')
          deleteBorrow(id_borrow, price_borrow)
        let list = task.filter(item => item.type != 9 && item.type != 10 && item.type != 11 && item.type != 12)
        filterDate(list)
      })
    })
  }

  const renderHiddenItem = (data, rowMap) => {

    return (
      <View style={style.rowBack}>
        <TouchableOpacity
          style={[style.actionButton, style.deleteBtn]}
          onPress={() => handleRemove(data.item.id, data.item.id_borrow, data.item.price_borrow)}
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
      const list = listSearch.filter(item => item.descripbe.toLowerCase().includes(search.toLowerCase()))
      setListExpenses(list)
    } else {
      setListExpenses(listSearch)
    }

  }


  return (
    <View style={style.container}>
      <View style={{ marginTop: 10, marginHorizontal: 10, flexDirection: 'row' }}>
        <Text style={{ fontWeight: 'bold', color: '#50a1e3' }}>Từ</Text>
        <TouchableOpacity onPress={toggleModalFromDate}>
          <Text style={{ fontWeight: 'bold' }}> {fromDate ? momentFormat(fromDate) : momentFormat(new Date().getTime())}</Text>
        </TouchableOpacity>
        <Text style={{ fontWeight: 'bold', color: '#50a1e3' }}> Đến </Text>
        <TouchableOpacity onPress={toggleModalToDate}>
          <Text style={{ fontWeight: 'bold' }}>{toDate ? momentFormat(toDate) : momentFormat(new Date().getTime())}</Text>
        </TouchableOpacity>
      </View>
      <View style={{ margin: 10 }}>
        <TextInput placeholder="tìm kiếm" style={style.borderSearch} onChangeText={(text) => handleSearch(text)} />
      </View>
      <FlatList
        style={{ marginTop: 10 }}
        data={listExpenses}
        renderItem={itemExpenses} />
      <View style={{ position: 'absolute', bottom: 10, width: '100%', borderTopWidth: 0.5, borderColor: '#50a1e3' }}>
        <Text style={{ marginTop: 10, marginLeft: 5, color: '#50a1e3', fontSize: 18 }}>Tổng tiền chi: {Utils.numberWithCommas(sumExpenses)} VND</Text>
      </View>
      <TouchableOpacity style={{ position: 'absolute', bottom: 60, right: 20 }} onPress={() => props.goToAdd()}>
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