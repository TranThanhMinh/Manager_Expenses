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
import CalendarPicker from 'react-native-calendar-picker';
import Modal from "react-native-modal";
import { useSafeAreaInsets } from 'react-native-safe-area-context';


const AddExpenses = (props) => {
  const insets = useSafeAreaInsets();

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
  const [isDate, setIsDate] = useState(false);
  const [date, setDate] = useState(0);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    setDate(new Date().getTime())
    if (item != null) {
      console.log(item.type)
      setEdit(true)
      setId(item.id)
      setDescripbe(item.descripbe)
      setPrice(item.price)
      setPriceBorrow2(item.price_borrow)
      setPriceBorrow(item.price_borrow)
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
    return moment(date).format("HH:mm")
  }


  const handleAdd = () => {
    if (descripbe == '') {
      setIsDescripbe(false)
    } else if (price == '') {
      setIsPrice(false)
    } else {
      let datetime = new Date().getTime()
      if (id == '') {
        //  console.log(momentFormat(date), moment(momentFormat(date), "DD-MM-YYYY").toDate().getTime())
        addExpenses(urid(), momentFormatTime(datetime),
          moment(momentFormat(date), "DD-MM-YYYY").toDate().getTime(), descripbe, price, priceBorrow, type, typeBorrow, idBorrow).then(task => {
            if (type == 10 || type == 12) {
              updateBorrow(idBorrow, priceBorrow).then(task => {
                props.goToBack()
              })
            } else {
              props.goToBack()
            }
          })
      }
      else {
        if (type == 10 || type == 12) {
          updateBorrow(idBorrow, priceBorrow - priceBorrow2)
        }
        updateTask(id, descripbe, price, priceBorrow, type).then(task => {
          props.goToBack()
        })


      }
    }

  }

  const onDateChange = (date) => {
    setDate(date)
    toggleModalToDate()
  }

  const toggleModalToDate = () => {
    setIsDate(!isDate);
  };


  const selectDate = () => {
    return (
      <Modal isVisible={isDate}>
        <View style={{ backgroundColor: 'white' }}>
          <CalendarPicker
            previousTitle="Trước"
            nextTitle="Sau"
            weekdays={['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy']}
            months={['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12']}

            onDateChange={onDateChange}
          />
        </View>
      </Modal>
    )
  }

  return (
    <View style={[style.container,{marginTop:insets.top}]}>
      <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#50a1e3',padding:10 }} onPress={() => props.goToBack()}>
        <Icon.ArrowLeft stroke={'white'} />
        <Text style={{ marginLeft: 10, color: 'white' }}>Giao dịch hàng ngày</Text>
      </TouchableOpacity>

      <View style={style.body}>
        <TouchableOpacity style={style.combobox} onPress={toggleModalToDate}>
          <Icon.Calendar stroke={'#50a1e3'} />
          <Text style={[style.text, { borderColor: !isPrice ? 'red' : '#444' }]}> {date ? momentFormat(date) : momentFormat(new Date().getTime())}</Text>
        </TouchableOpacity>
        <View style={style.combobox}>
          <Icon.Sidebar stroke={'#50a1e3'} />
          <SelectDropdown
            data={Utils.TypeExpenses}
            disabled={edit}
            defaultButtonText={Utils.TypeExpenses[type].name}
            onSelect={(selectedItem, index) => {
              setType(selectedItem.id)
              if (selectedItem.id == 12) {
                getListExpensesBorrow(11).then(stask => {
                  setIdBorrow(stask[0].id)
                  setTypeBorrow(0)
                  setListBorrow(stask)
                })
              }
              else if (selectedItem.id == 10) {
                getListExpensesBorrow(9).then(stask => {
                  setIdBorrow(stask[0].id)
                  setTypeBorrow(0)
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
                disabled={edit}
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
        {selectDate()}
      </View>
    </View>
  )
}

export default AddExpenses;