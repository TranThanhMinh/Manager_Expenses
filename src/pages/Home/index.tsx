import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TextInput, TouchableOpacity } from "react-native"
import { Color } from "../../common";
import { useSelector, useDispatch } from "react-redux";
import style from "./style";
import { getFloodReports } from "../../redux/actions/danang";
import { Data } from "../../model/types.d";
import { FloodReports } from "../../model/types.d";
import urid from 'urid';
import { addTask, getListTasks } from "../../data/StorageServices";
import { addExpenses, getListExpenses } from "../../data/ExpensesServices ";
import moment from 'moment';
import * as ActionTypes from '../../redux/actions/ActionTypes'
import SelectDropdown from 'react-native-select-dropdown'
import Icon from 'react-native-vector-icons/FontAwesome';

const Home = () => {
  const { danangReducer } = useSelector(state => state)
  const dispatch = useDispatch();
  const [id, setId] = useState('')
  const [listExpenses, setListExpenses] = useState([])
  const [title, setTitle] = useState('')
  const [descripbe, setDescripbe] = useState('')
  const [price, setPrice] = useState('')
  const [data, setData] = useState<FloodReports>()
  const [sumExpenses, setSumExpenses] = useState(0)
  let sum = 0

  const session = ["Buổi sáng", "Buổi trưa", "Buổi tối"]

  useEffect(() => {
    //  dispatch(getFloodReports());
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
      // console.log(task)
      setListExpenses(task)
    })
  }

  const momentFormat = (date) => {
    return moment(date).format("YYYY-MM-DD hh:mm:ss")
  }


  const itemExpenses = ({ item, index }) => {
    // const i = item as Data
    const { title, descripbe, price } = item
    sum = sum + parseFloat(price)
    if (index == listExpenses.length - 1)
      setSumExpenses(sum)
    return (
      <TouchableOpacity style={style.itemExpenses} onPress={() => { console.log(title) }}>
        <Text style={style.text}>{title}</Text>
        <Text style={style.text}>{descripbe}</Text>
        <Text style={style.text}>{numberWithCommas(parseFloat(price))}</Text>
      </TouchableOpacity>
    )
  }

  const handleAdd = () => {
    addExpenses(urid(), title, descripbe, price, '1')
    getList()
  }

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const addBook = () => {
    return (
      <View style={{ width: '100%' }}>
        <SelectDropdown
          data={session}
          defaultValueByIndex={0}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index)
            setTitle(selectedItem)
          }}

          buttonTextAfterSelection={(selectedItem, index) => {
            console.log('buttonTextAfterSelection', selectedItem)
            setTitle(selectedItem)
            return selectedItem
          }}
          rowTextForSelection={(item, index) => {
            return item
          }}
          buttonStyle={style.dropdown1BtnStyle}
          buttonTextStyle={style.dropdown1BtnTxtStyle}
          renderDropdownIcon={isOpened => {
            return <Icon  name={isOpened ? 'rocket' : 'chevron-down'} color={'#444'} size={18} />;
          }}
          dropdownIconPosition={'right'}
          dropdownStyle={style.dropdown1DropdownStyle}
          rowStyle={style.dropdown1RowStyle}
          rowTextStyle={style.dropdown1RowTxtStyle}
        />
        {/* <TextInput style={style.textInput} value={title} placeholder="Buổi trong ngày" onChangeText={(text) => setTitle(text)} /> */}
        <TextInput style={style.textInput} value={descripbe} placeholder="Mô tả" onChangeText={(text) => setDescripbe(text)} />
        <TextInput style={style.textInput} value={price} placeholder="Nhâp giá" keyboardType="numeric" onChangeText={(text) => setPrice(text)} />
        <TouchableOpacity style={style.button} onPress={handleAdd}>
          <Text>Thêm chi tiêu</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', backgroundColor: Color.white, marginHorizontal: 5 }}>
      {addBook()}
      <View>
        <Text>Chi tiêu ngày {momentFormat(new Date().getTime())}</Text>
      </View>
      <FlatList
        data={listExpenses}
        renderItem={itemExpenses} />
      <View style={{ position: 'absolute', bottom: 10, left: 10 }}>
        <Text>Tổng tiền: {numberWithCommas(sumExpenses)} VND</Text>
      </View>
    </View>
  )
}

export default Home;