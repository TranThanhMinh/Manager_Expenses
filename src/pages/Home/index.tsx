import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TextInput, TouchableOpacity, TouchableHighlight, Button } from "react-native"
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

const Home = () => {
  const { danangReducer } = useSelector(state => state)
  const dispatch = useDispatch();
  const [id, setId] = useState('')
  const [listExpenses, setListExpenses] = useState([])
  const [title, setTitle] = useState('')
  const [key, setKey] = useState(0)
  const [descripbe, setDescripbe] = useState('')
  const [isDescripbe, setIsDescripbe] = useState(true)
  const [price, setPrice] = useState('')
  const [isPrice, setIsPrice] = useState(true)
  const [data, setData] = useState<FloodReports>()
  const [sumExpenses, setSumExpenses] = useState(0)
  const [fromDate, setSelectedFromDate] = useState(0)
  const [toDate, setSelectedToDate] = useState(0)
  const [isFromDate, setFromDate] = useState(false);
  const [isToDate, setToDate] = useState(false);

  let sum = 0
  const session = ["Buổi sáng", "Buổi trưa", "Buổi tối"]

  useEffect(() => {
    //  dispatch(getFloodReports());
    let date = new Date().getTime()
  // getListDate(date, date)
 getList()
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
  }, [danangReducer])

  const getList = () => {
    getListExpenses().then(task => {
      console.log(task)
      setListExpenses(task)
    })

    setId('')
    setDescripbe('')
    setPrice('')
  }

  const getListDate = (fromdate, toDate) => {
    console.log('date 2', fromdate, toDate)
    setSelectedFromDate(fromdate)
    setSelectedToDate(toDate)
    getListExpensesFromDateToDate(fromdate, toDate).then(task => {
      setListExpenses(task)
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
    console.log(item)
    const { title, descripbe, price, id, created_date,created_time } = item
    sum = sum + parseFloat(price)
    if (index == listExpenses.length - 1)
      setSumExpenses(sum)
    return (
      <TouchableHighlight
        onPress={() => {
          setId(id),
          setDescripbe(descripbe),
          setPrice(price),
          setTitle(title),
          setIsDescripbe(true)
          setIsPrice(true)
          title == "Buổi sáng" ? setKey(0) : title == 'Buổi trưa' ? setKey(1) : setKey(2)
        }}
        style={style.rowFront}
        underlayColor={'#fff'}
      >
        <View>
          <View style={style.itemExpenses}>
            <Text style={style.text}>{title}</Text>
            <Text style={style.text}>{momentFormat(parseFloat(created_date))} {created_time}</Text>
          </View>
          <View style={style.itemExpenses}>
            <Text style={style.text}>{descripbe}</Text>
            <Text style={style.text}>{numberWithCommas(parseFloat(price))} VND</Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  }

  const handleAdd = () => {
    if (descripbe == '') {
      setIsDescripbe(false)
    } else if (price == '') {
      setIsPrice(false)
    } else {
      let datetime = new Date().getTime()
      if (id == '') {
        addExpenses(urid(), title, momentFormatTime(datetime), moment(momentFormat(datetime), "DD-MM-YYYY").toDate().getTime(), descripbe, price, '1')
      }
      else {
        updateTask(id, title, descripbe, price)
      }
      getListDate(fromDate, toDate)
      //    getList()
    }

  //  momentFormatTime(datetime), moment(momentFormat(datetime), "DD-MM-YYYY").toDate().getTime().toString()
  }

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const addBook = () => {
    return (
      <View>
        <View style={{ marginHorizontal: 5 }}>
          <SelectDropdown
            data={session}
            defaultValueByIndex={key}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index)
              setTitle(selectedItem)
            }}

            buttonTextAfterSelection={(selectedItem, index) => {
              //    console.log('buttonTextAfterSelection', selectedItem)
              setTitle(selectedItem)
              return selectedItem
            }}
            rowTextForSelection={(item, index) => {
              return item
            }}
            buttonStyle={style.dropdown1BtnStyle}
            buttonTextStyle={style.dropdown1BtnTxtStyle}
            renderDropdownIcon={isOpened => {
              return <Icon name={isOpened ? 'rocket' : 'chevron-down'} color={'#444'} size={18} />;
            }}
            dropdownIconPosition={'right'}
            dropdownStyle={style.dropdown1DropdownStyle}
            rowStyle={style.dropdown1RowStyle}
            rowTextStyle={style.dropdown1RowTxtStyle}
          />
        </View>

        {/* <TextInput style={style.textInput} value={title} placeholder="Buổi trong ngày" onChangeText={(text) => setTitle(text)} /> */}
        <TextInput style={[style.textInput, { borderColor: !isDescripbe ? 'red' : '#444' }]} value={descripbe} placeholder="Mô tả" onChangeText={(text) => { setDescripbe(text), setIsDescripbe(true) }} />
        <TextInput style={[style.textInput, { borderColor: !isPrice ? 'red' : '#444' }]} value={price} placeholder="Nhâp giá" keyboardType="numeric" onChangeText={(text) => { setPrice(text), setIsPrice(true) }} />
        <TouchableOpacity style={style.button} onPress={handleAdd}>
          {id == '' ? <Text style={{ color: 'white' }}>Thêm chi tiêu</Text> :
            <Text style={{ color: 'white' }}>Sửa chi tiêu</Text>}

        </TouchableOpacity>
      </View>
    )
  }

  const handleRemove = (id) => {
    removeTask(id)
    // getList()
    getListDate(fromDate,toDate)
  }

  const renderHiddenItem = (data, rowMap) => (
    <View style={style.rowBack}>
      <TouchableOpacity
        style={[style.actionButton, style.deleteBtn]}
        onPress={() => handleRemove(data.item.id)}
      >
        <Text style={style.btnText}>Xóa</Text>
      </TouchableOpacity>
    </View>
  );

  const onItemOpen = data => {
    console.log('This row opened', data);
  };

  const onFromDateChange = (date) => {
    console.log('onFromDateChange', date)
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

  return (
    <View style={style.container}>
      {addBook()}
      <View style={{ marginTop: 10, marginLeft: 5, flexDirection: 'row' }}>
        <Text style={{ fontWeight: 'bold', color: '#50a1e3' }}>Chi tiêu ngày</Text>
        <TouchableOpacity onPress={toggleModalFromDate}>
          <Text style={{ fontWeight: 'bold' }}> {fromDate ? momentFormat(fromDate) : momentFormat(new Date().getTime())}</Text>
        </TouchableOpacity>
        <Text> đến </Text>
        <TouchableOpacity onPress={toggleModalToDate}>
          <Text style={{ fontWeight: 'bold' }}>{toDate ?  momentFormat(toDate) : momentFormat(new Date().getTime())}</Text>
        </TouchableOpacity>
      </View>
      <SwipeListView
        style={{ marginBottom: 40, marginTop: 5 }}
        data={listExpenses}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        leftOpenValue={0}
        rightOpenValue={-75}
        previewRowKey={'0'}
        previewOpenValue={-40}
        previewOpenDelay={3000}
        onRowDidOpen={onItemOpen} />
      <View style={{ position: 'absolute', bottom: 10, left: 10 }}>
        <Text style={{ color: 'red' }}>Tổng tiền: {numberWithCommas(sumExpenses)} VND</Text>
      </View>
      <Modal isVisible={isFromDate}>
        <View style={{ backgroundColor: 'white' }}>
          <CalendarPicker
            onDateChange={onFromDateChange}
          />
        </View>
      </Modal>
      <Modal isVisible={isToDate}>
        <View style={{ backgroundColor: 'white' }}>
          <CalendarPicker
            onDateChange={onToDateChange}
          />
        </View>
      </Modal>
    </View>
  )
}

export default Home;