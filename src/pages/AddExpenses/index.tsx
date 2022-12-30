import React, { useEffect, useState } from "react";
import { View, Image, TextInput, TouchableOpacity, Text } from "react-native";
import style from "./style";
import {
  addExpenses, getListExpenses, removeTask, updateTask, getListExpensesDate,
  getListExpensesFromDateToDate
} from "../../data/ExpensesServices ";
import moment from 'moment';
import SelectDropdown from 'react-native-select-dropdown'
import urid from 'urid';
import { Utils } from "@common"
import * as Icon from "react-native-feather"

const AddExpenses = (props) => {
  let item = props.item
  const [key, setKey] = useState(0)
  const [type, setType] = useState(0)
  const [descripbe, setDescripbe] = useState('')
  const [isDescripbe, setIsDescripbe] = useState(true)
  const [price, setPrice] = useState('')
  const [isPrice, setIsPrice] = useState(true)
  const [id, setId] = useState('')

  useEffect(() => {
    if (item != null) {
      console.log(item.type)
      setId(item.id)
      setDescripbe(item.descripbe)
      setPrice(item.price)

      setIsDescripbe(true)
      setIsPrice(true)
      setKey(item.title)
      setType(item.type)


    }
  }, [])

  const handleAdd = () => {
    if (descripbe == '') {
      setIsDescripbe(false)
    } else if (price == '') {
      setIsPrice(false)
    } else {
      let datetime = new Date().getTime()
      if (id == '') {
        addExpenses(urid(), key, momentFormatTime(datetime),
          moment(momentFormat(datetime), "DD-MM-YYYY").toDate().getTime(), descripbe, price, type).then(task => {
            props.goToBack()
          })

      }
      else {
        updateTask(id, key, descripbe, price, type).then(task => {
          props.goToBack()
        })
      }
    }

  }

  const momentFormat = (date) => {
    return moment(date).format("DD-MM-YYYY")
  }

  const momentFormatTime = (date) => {
    return moment(date).format("hh:mm")
  }



  return (

    <View style={style.container}>
      <View style={style.combobox}>
        <Icon.Grid stroke={'#50a1e3'} />
        <SelectDropdown
          data={Utils.session}
          defaultButtonText={Utils.session[key].name}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem.id)
            setKey(selectedItem.id)
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            setKey(selectedItem.id)
            return selectedItem.name
          }}
          rowTextForSelection={(item, index) => {
            return item.name
          }}
          buttonStyle={style.dropdown1BtnStyle}
          buttonTextStyle={style.dropdown1BtnTxtStyle}
          renderDropdownIcon={isOpened => {
            return isOpened ? <Icon.ChevronUp stroke={'#50a1e3'} /> : <Icon.ChevronDown stroke={'#50a1e3'} />
          }}
          dropdownIconPosition={'right'}
          dropdownStyle={style.dropdown1DropdownStyle}
          rowStyle={style.dropdown1RowStyle}
          rowTextStyle={style.dropdown1RowTxtStyle}
        />
      </View>

      <View style={style.combobox}>
        <Icon.Sidebar stroke={'#50a1e3'} />

        <SelectDropdown
          data={Utils.TypeExpenses}
          defaultButtonText={Utils.TypeExpenses[type].name}
          onSelect={(selectedItem, index) => {
            setType(selectedItem.id)
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            setType(selectedItem.id)
            return selectedItem.name
          }}
          rowTextForSelection={(item, index) => {
            return item.name
          }}
          buttonStyle={style.dropdown1BtnStyle}
          buttonTextStyle={style.dropdown1BtnTxtStyle}
          renderDropdownIcon={isOpened => {
            return isOpened ? <Icon.ChevronUp stroke={'#50a1e3'} /> : <Icon.ChevronDown stroke={'#50a1e3'} />
          }}
          dropdownIconPosition={'right'}
          dropdownStyle={style.dropdown1DropdownStyle}
          rowStyle={style.dropdown1RowStyle}
          rowTextStyle={style.dropdown1RowTxtStyle}
        />

      </View>
      <View style={style.combobox}>
        <Icon.Edit3 stroke={'#50a1e3'} />
        <TextInput style={[style.textInput, { borderColor: !isDescripbe ? 'red' : '#444' }]} value={descripbe} placeholder="Mô tả" onChangeText={(text) => { setDescripbe(text), setIsDescripbe(true) }} />
      </View>
      <View style={style.combobox}>
        <Icon.DollarSign stroke={'#50a1e3'} />
        <TextInput style={[style.textInput, { borderColor: !isPrice ? 'red' : '#444' }]} value={price} placeholder="Nhâp giá" keyboardType="numeric" onChangeText={(text) => { setPrice(text), setIsPrice(true) }} />
      </View>
      <TouchableOpacity style={style.button} onPress={handleAdd}>
        {id == '' ? <Text style={{ color: 'white' }}>Thêm chi tiêu</Text> :
          <Text style={{ color: 'white' }}>Sửa chi tiêu</Text>}
      </TouchableOpacity>
    </View>
  )
}

export default AddExpenses;