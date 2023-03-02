import React, { useEffect, useState } from "react";
import { View, Image, TextInput, TouchableOpacity, Text } from "react-native";
import style from "./style";
import {
  addExpenses, getListExpensesBorrow,getListExpensesBorrow2, updateTask, updateBorrow,updateBorrow2,
  removeTask, deleteBorrow
} from "../../data/ExpensesServices ";
import { getListHistory } from "../../data/WalletServices";
import {
  updateWallet
} from "../../data/WalletServices";
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
  //console.log(item)
  const [type, setType] = useState(1)
  const [isType, setIsType] = useState(true)
  const [typeBorrow, setTypeBorrow] = useState(1)
  const [descripbe, setDescripbe] = useState('')
  const [isDescripbe, setIsDescripbe] = useState(true)
  const [price, setPrice] = useState('')
  const [price2, setPrice2] = useState('')
  const [priceBorrow, setPriceBorrow] = useState(0)
  const [priceBorrow2, setPriceBorrow2] = useState(0)
  const [isPrice, setIsPrice] = useState(true)
  const [id, setId] = useState('')
  const [idBorrow, setIdBorrow] = useState('')
  const [listBorrow, setListBorrow] = useState([])
  const [isDate, setIsDate] = useState(false);
  const [date, setDate] = useState(0);
  const [edit, setEdit] = useState(false);
  const [idWallet, setIdWallet] = useState('')
  const [inOut, setInOut] = useState(0)
  const [wallet, setWallet] = useState();
  const [money, setMoney] = useState(0);

  useEffect(() => {
    setDate(new Date().getTime())
    if (!item.add) {
      setWallet(item.wallet)
      setEdit(true)
      setId(item.item.id)
      setDescripbe(item.item.descripbe)
      setPrice(item.item.price)
      setPrice2(item.item.price)

      setPriceBorrow2(item.item.price_borrow)
      setPriceBorrow(item.item.price_borrow)
      setIsDescripbe(true)
      setIsPrice(true)
      setType(item.item.type)
      setTypeBorrow(item.item.type_borrow)
      setIdBorrow(item.item.id_borrow)
      setInOut(item.item.in_out)
      if (item.item.type == 13) {
        getListExpensesBorrow(12).then(stask => {
          setListBorrow(stask)
          console.log(stask[item.item.type_borrow].price_borrow, item.item.price)
          let price = parseFloat(stask[item.item.type_borrow].price_borrow) + parseFloat(item.item.price)
          setMoney(price)
        })
      }else if (item.item.type == 15) {
        getListExpensesBorrow(14).then(stask => {
          setListBorrow(stask)
          console.log(stask[item.item.type_borrow].price_borrow, item.item.price)
          let price = parseFloat(stask[item.item.type_borrow].price_borrow) + parseFloat(item.item.price)
          setMoney(price)
        })
      }
    } else {
      setIdWallet(item.wallet.id)
    }
  }, [])

  const momentFormat = (date) => {
    return moment(date).format("DD-MM-YYYY")
  }

  const momentFormatTime = (date) => {
    return moment(date).format("HH:mm")
  }

  const handleRemove = () => {
    removeTask(id).then(task => {
      task.map(item => {
        if (item.in_out == 0) {
          updateWallet(wallet.default, wallet.money + parseFloat(item.price))
        } else {
          updateWallet(wallet.default, wallet.money - parseFloat(item.price))
        }
      })

     
      if (task.length > 0) {
        deleteBorrow(task[0].id_borrow)
      }


      if (type == 13) {
        updateBorrow2(idBorrow, priceBorrow)
      }else if (type == 15) {
        updateBorrow2(idBorrow, priceBorrow)
      }

      if (inOut == 0) {
        updateWallet(wallet.default, wallet.money + parseFloat(price))
      } else {
        updateWallet(wallet.default, wallet.money - parseFloat(price))
      }
      props.goToBack()
    })
  }


  const handleAdd = () => {
    if (type == 0 || type == 11 || type == 16) {
      setIsType(false)
    }
    else if (descripbe == '') {
      setIsDescripbe(false)
    } else if (price == '') {
      setIsPrice(false)
    } else {
      let datetime = new Date().getTime()
      if (id == '') {
        addExpenses(urid(), momentFormatTime(datetime),
          moment(momentFormat(date), "DD-MM-YYYY").toDate().getTime(),
          descripbe, price, priceBorrow, type, typeBorrow, idBorrow, idWallet, inOut).then(task => {
            if (inOut == 0)
              updateWallet(item.wallet.default, item.wallet.money - parseFloat(price))
            else updateWallet(item.wallet.default, item.wallet.money + parseFloat(price))
            if (type == 13 || type == 15) {
              updateBorrow(idBorrow, priceBorrow).then(task => {
                props.goToBack()
              })
            } else {
              props.goToBack()
            }
          })
      }
      else {
        if (item.item.in_out == 0)
          updateWallet(item.wallet.default, item.wallet.money + (parseFloat(price2) - parseFloat(price)))
        else updateWallet(item.wallet.default, item.wallet.money + (parseFloat(price) - parseFloat(price2)))
        if (type == 13 || type == 15) {
          updateBorrow(idBorrow, priceBorrow - priceBorrow2)
          updateTask(id, descripbe, price, priceBorrow, type).then(task => {
            props.goToBack()
          })
        } else if (type == 12 || type == 14) {
          let paid = 0
          getListHistory(id).then(task => {
            task.map(item => {
              paid = paid + parseFloat(item.price)
            })
            updateTask(id, descripbe, price, parseFloat(price) - paid, type).then(task => {
              props.goToBack()
            })
          })
        } else updateTask(id, descripbe, price, priceBorrow, type).then(task => {
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
    <View style={style.container}>
      <View style={[style.container2, { marginTop: insets.top }]}>
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#50a1e3', padding: 10 }} onPress={() => props.goToBack()}>
          <Icon.ArrowLeft stroke={'white'} />
          <Text style={{ marginLeft: 10, color: 'white' }}>Giao dịch hàng ngày</Text>
        </TouchableOpacity>

        <View style={style.body}>
          <TouchableOpacity style={style.combobox} onPress={toggleModalToDate}>
            <Icon.Calendar stroke={'#50a1e3'} />
            <Text style={[style.text2, { height: 20, fontSize: 14 }]}> {date ? momentFormat(date) : momentFormat(new Date().getTime())}</Text>
            <Icon.Edit stroke={'#50a1e3'} width={20} height={20} />
          </TouchableOpacity>
          <View style={[style.combobox, { marginTop: 5 }]}>
            <Icon.AlignLeft stroke={'#50a1e3'} />
            <SelectDropdown
              data={Utils.TypeExpenses}
              disabled={edit}
              disableAutoScroll={false}
              defaultButtonText={Utils.TypeExpenses[type].name}
              onSelect={(selectedItem, index) => {
                setIsType(true)
                setType(selectedItem.id)
                setInOut(parseInt(selectedItem.type))
                setPrice('')
                if (selectedItem.id == 15) {
                  getListExpensesBorrow2(14).then(stask => {
                    setIdBorrow(stask[0].id)
                    setTypeBorrow(0)
                    setListBorrow(stask)
                    setMoney(stask[0].price_borrow)

                  })
                }

                else if (selectedItem.id == 13) {
                  getListExpensesBorrow2(12).then(stask => {
                    setIdBorrow(stask[0].id)
                    setTypeBorrow(0)
                    setListBorrow(stask)
                    setMoney(stask[0].price_borrow)
                  })
                } else {
                  setMoney(0)
                  setListBorrow([])
                }

              }}

              renderCustomizedRowChild={(item, index) => {
                return (
                  <View>
                    {
                      item.id != 0 && item.id != 11 && item.id != 16 ?
                        <Text style={style.dropdown1RowTxtStyle}>{item.name}</Text>
                        : <Text style={style.dropdown1RowTxtStyleTitle}>{item.name}</Text>
                    }
                  </View>
                );
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                setType(selectedItem.id)
                setInOut(parseInt(selectedItem.type))
                return selectedItem.name
              }}
              rowTextForSelection={(item, index) => {
                return item.name
              }}
              buttonStyle={!isType ? style.dropdown1BtnStyleFalse : style.dropdown1BtnStyle}
              buttonTextStyle={style.dropdown1BtnTxtStyle}
              renderDropdownIcon={isOpened => {
                return !edit ? isOpened ? <Icon.ChevronUp stroke={'#50a1e3'} /> : <Icon.ChevronDown stroke={'#50a1e3'} /> : null
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
                  defaultButtonText={listBorrow[typeBorrow].descripbe + " - " + Utils.numberWithCommas(edit ? money:listBorrow[typeBorrow].price_borrow ) + ' VND'}
                  onSelect={(selectedItem, index) => {
                    setIdBorrow(selectedItem.id)
                    setTypeBorrow(index)
                    setMoney(selectedItem.price_borrow)
                  }}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    return (selectedItem.descripbe + " - " + Utils.numberWithCommas(selectedItem.price_borrow) + ' VND')
                  }}
                  rowTextForSelection={(item, index) => {
                    return (item.descripbe + " - " + Utils.numberWithCommas(item.price_borrow) + ' VND')
                  }}

                  renderCustomizedRowChild={(item, index) => {
                    return (
                      <View><Text style={style.dropdown1RowTxtStyle}>{item.descripbe + " - " + Utils.numberWithCommas(item.price_borrow) + ' VND'}</Text>
                      </View>
                    );
                  }}
                  buttonStyle={style.dropdown1BtnStyle}
                  buttonTextStyle={style.dropdown1BtnTxtStyle}
                  renderDropdownIcon={isOpened => {
                    return !edit ? isOpened ? <Icon.ChevronUp stroke={'#50a1e3'} /> : <Icon.ChevronDown stroke={'#50a1e3'} /> : null
                  }}
                  dropdownIconPosition={'right'}
                  dropdownStyle={style.dropdown1DropdownStyle}
                  rowStyle={style.dropdown1RowStyle}
                  rowTextStyle={style.dropdown1RowTxtStyle2}
                />
              </View>
            ) : null
          }
          <View style={style.combobox}>
            <Icon.Edit3 stroke={'#50a1e3'} />
            <TextInput style={[style.textInput, { borderColor: !isDescripbe ? 'red' : '#444' }]} value={descripbe} placeholder="Mô tả" placeholderTextColor={'#E1E1E1'} onChangeText={(text) => { setDescripbe(text), setIsDescripbe(true) }} />
          </View>
          <View style={style.combobox}>
            <Icon.DollarSign stroke={'#50a1e3'} />
            <TextInput style={[style.textInput, { borderColor: !isPrice ? 'red' : '#444' }]} value={Utils.numberWithCommas(price)} placeholder="Nhâp giá" placeholderTextColor={'#E1E1E1'} keyboardType="numeric"
              onChangeText={(text) => {
                setIsPrice(true),
                  type == 13 || type == 15 ?
                    parseFloat(text.replace(/[^0-9]/g, '')) > money ? null : setPriceBorrow(parseFloat(text.replace(/[^0-9]/g, '')))
                    :
                    setPriceBorrow(parseFloat(text.replace(/[^0-9]/g, ''))),
                  type == 13 || type == 15 ?
                    parseFloat(text.replace(/[^0-9]/g, '')) > money ? console.log('haha',text,money) : setPrice(text.replace(/[^0-9]/g, ''))
                    :
                    setPrice(text.replace(/[^0-9]/g, ''))
              }} />
          </View>
          <View style={{ alignItems: 'center', marginVertical: 10 }}>
            {
              id == '' ? (
                <TouchableOpacity style={style.btnAdd} onPress={handleAdd}>
                  <Icon.Save stroke={'white'} width={20} height={20} />
                  {id == '' ?
                    <Text style={{ color: 'white' }}> Thêm </Text>
                    :
                    <Text style={{ color: 'white' }}> Sửa </Text>
                  }
                </TouchableOpacity>
              ) :
                (
                  <View style={{ flexDirection: 'row', justifyContent: 'center', }}>
                    <TouchableOpacity style={style.btnDelete} onPress={handleRemove}>
                      <Icon.Trash2 stroke={'red'} width={20} height={20} />
                      <Text style={{ color: 'red' }}> Xóa </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={style.btnUpdate} onPress={handleAdd}>
                      <Icon.Save stroke={'white'} width={20} height={20} />
                      <Text style={{ color: 'white' }}> Sửa </Text>
                    </TouchableOpacity>
                  </View>
                )
            }

          </View>
          {selectDate()}
        </View>
      </View>
    </View>
  )
}

export default AddExpenses;