import React, { useEffect, useState } from "react";
import { View, Image, TextInput, TouchableOpacity, Text } from "react-native";
import style from "./style";
import {
  addExpenses, getListExpensesBorrow, updateTask, updateBorrow
} from "../../data/ExpensesServices ";
import moment from 'moment';
import SelectDropdown from 'react-native-select-dropdown'
import urid from 'urid';
import { Utils } from "@common"
import * as Icon from "react-native-feather"

const AddExpenses = (props) => {
  let item = props.item
  const [type, setType] = useState(0)
  const [typeBorrow, setTypeBorrow] = useState(0)
  const [descripbe, setDescripbe] = useState('')
  const [isDescripbe, setIsDescripbe] = useState(true)
  const [price, setPrice] = useState('')
  const [priceBorrow, setPriceBorrow] = useState(0)
  const [priceBorrow2, setPriceBorrow2] = useState(0)
  const [isPrice, setIsPrice] = useState(true)
  const [id, setId] = useState('')
  const [idBorrow, setIdBorrow] = useState('')
  const [listBorrow, setListBorrow] = useState([])

  useEffect(() => {
    if (item != null) {
      console.log(item.type)
      setId(item.id)
      setDescripbe(item.descripbe)
      setPrice(item.price)
      setPriceBorrow2(item.price_borrow)
      setIsDescripbe(true)
      setIsPrice(true)
      setType(item.type)
      setTypeBorrow(item.type_borrow)
      setIdBorrow(item.id_borrow)
      if (item.type == 12) {
        getListExpensesBorrow(11).then(stask => {
          setListBorrow(stask)
        })
      }

    }
  }, [])

  const momentFormat = (date) => {
    return moment(date).format("DD-MM-YYYY")
  }

  const momentFormatTime = (date) => {
    return moment(date).format("hh:mm")
  }


  const handleAdd = () => {
    if (descripbe == '') {
      setIsDescripbe(false)
    } else if (price == '') {
      setIsPrice(false)
    } else {
      let datetime = new Date().getTime()
      if (id == '') {
        addExpenses(urid(), momentFormatTime(datetime),
          moment(momentFormat(datetime), "DD-MM-YYYY").toDate().getTime(), descripbe, price, priceBorrow, type, typeBorrow, idBorrow).then(task => {
            if (type == 12) {
              updateBorrow(idBorrow, priceBorrow).then(task => {
                props.goToBack()
              })
            } else {
              props.goToBack()
            }
          })


      }
      else {
        if (type == 12) {
          updateBorrow(idBorrow, priceBorrow - priceBorrow2)
        }
        updateTask(id, descripbe, price, priceBorrow, type).then(task => {
          props.goToBack()
        })


      }
    }

  }

  return (

    <View style={style.container}>
      <View style={style.combobox}>
        <Icon.Sidebar stroke={'#50a1e3'} />
        <SelectDropdown
          data={Utils.TypeExpenses}
          defaultButtonText={Utils.TypeExpenses[type].name}
          onSelect={(selectedItem, index) => {
            setType(selectedItem.id)
            if (selectedItem.id == 12) {
              getListExpensesBorrow(11).then(stask => {
                console.log(stask)
                setListBorrow(stask)
              })
            }
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
      {
        listBorrow.length > 0 ? (
          <View style={style.combobox}>
            <Icon.Sidebar stroke={'#50a1e3'} />
            <SelectDropdown
              data={listBorrow}
              defaultButtonText={listBorrow[typeBorrow].descripbe + " - " + Utils.numberWithCommas(listBorrow[typeBorrow].price_borrow) + ' VND'}
              onSelect={(selectedItem, index) => {
                setIdBorrow(selectedItem.id)
                setTypeBorrow(index)
              }}
              buttonTextAfterSelection={(selectedItem, index) => {

                return (selectedItem.descripbe + " - " + Utils.numberWithCommas(selectedItem.price_borrow) + ' VND')
              }}
              rowTextForSelection={(item, index) => {
                return (item.descripbe + " - " + Utils.numberWithCommas(item.price_borrow) + ' VND')
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
        ) : null
      }
      <View style={style.combobox}>
        <Icon.Edit3 stroke={'#50a1e3'} />
        <TextInput style={[style.textInput, { borderColor: !isDescripbe ? 'red' : '#444' }]} value={descripbe} placeholder="Mô tả" onChangeText={(text) => { setDescripbe(text), setIsDescripbe(true) }} />
      </View>
      <View style={style.combobox}>
        <Icon.DollarSign stroke={'#50a1e3'} />
        <TextInput style={[style.textInput, { borderColor: !isPrice ? 'red' : '#444' }]} value={price} placeholder="Nhâp giá" keyboardType="numeric"
          onChangeText={(text) => {
            setPrice(text),
              setIsPrice(true),
              type == 11 || 12 ? setPriceBorrow(parseFloat(text)) : null
          }} />
      </View>
      <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%', marginVertical: 10 }}>
        <TouchableOpacity style={style.button} onPress={handleAdd}>
          {id == '' ? <Text style={{ color: 'white' }}>Thêm chi tiêu</Text> :
            <Text style={{ color: 'white' }}>Sửa chi tiêu</Text>}
        </TouchableOpacity>
      </View>

    </View>
  )
}

export default AddExpenses;