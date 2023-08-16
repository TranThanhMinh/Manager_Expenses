import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TextInput, TouchableOpacity, TouchableHighlight, Button } from "react-native"
import { useIsFocused } from "@react-navigation/native";
import { Color } from "../../common";
import { useSelector, useDispatch } from "react-redux";
import style from "./style";
import { getFloodReports } from "../../redux/actions/danang";
import { Data } from "../../model/types.d";
import { FloodReports } from "../../model/types.d";
import urid from 'urid';
import { updateWallet, addWallet, getListwalletDefault } from "../../data/WalletServices";
import {
  removeTask2, getListExpensesFromDateToDate, deleteBorrow, updateBorrow2
} from "../../data/ExpensesServices ";
import moment from 'moment';
import * as ActionTypes from '../../redux/actions/ActionTypes'
import { SwipeListView } from 'react-native-swipe-list-view';
import CalendarPicker from 'react-native-calendar-picker';
import Modal from "react-native-modal";
import ButtonAdd from "../../component/ButtonAdd";
import { Utils } from "@common";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AlarmClock from "react-native-alarm-clock";
import SelectDropdown from 'react-native-select-dropdown'

import * as Icon from "react-native-feather"
const Home = (props) => {
  const insets = useSafeAreaInsets();
  let fisrt = {
    id: -1,
    name: 'Tất cả',
    type: '0'
  }
  const addfirst = [fisrt, ...Utils.TypeExpenses]

  const [wallet, setWallet] = useState([]);
  const isVisible = useIsFocused();
  const { danangReducer } = useSelector(state => state)
  const dispatch = useDispatch();
  const [listExpenses, setListExpenses] = useState([])
  const [listSearch, setListSearch] = useState([])
  const [selectDropdown, setSelectDropdown] = useState(addfirst)
  const [data, setData] = useState<FloodReports>()
  const [sumExpenses, setSumExpenses] = useState(0)
  const [sumIN, setSumIN] = useState(0)
  const [sumOUT, setSumOUT] = useState(0)
  const [fromDate, setSelectedFromDate] = useState(0)
  const [toDate, setSelectedToDate] = useState(0)
  const [isFromDate, setFromDate] = useState(false);
  const [isToDate, setToDate] = useState(false);
  const [textSearch, setTextSearch] = useState('');

  const [isType, setIsType] = useState(true)

  const [type, setType] = useState(0)
  const [edit, setEdit] = useState(false);
  let collect = 0
  let payout = 0
  let first = 0


  const session = ["Buổi sáng", "Buổi trưa", "Buổi tối"]

  // let date = new Date();
  // date.setDate(date.getDate() + 1);
  // date.setHours(13, 55);
  // AlarmClock.createAlarm(date.toISOString(), 'My Custom Alarm');

  useEffect(() => {
    if (isVisible) {
      const now = new Date();
      const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
      //   console.log(firstDay); // 👉️ Sat Oct 01 2022 ...
      const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      //  console.log(lastDay); // 👉️ Mon Oct 31 2022 ...
      if (first == 0)
        first = new Date(firstDay).getTime()
      let last = new Date(lastDay).getTime()
      getListDate(first, last)
      getWallet()

    } else
      setListExpenses([])
    setListSearch([])

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

  const getWallet = () => {
    getListwalletDefault(true).then(task => {
      if (task.length > 0)
        setWallet(task)
      else addWalletDefault()
    })
  }

  const addWalletDefault = () => {
    addWallet(urid(), 'Ví của tôi', 0, new Date().getTime().toString(), true)
    getListwalletDefault(true).then(task => {
      setWallet(task)
    })
  }

  const getListDate = (fromdate, toDate) => {
    let from = moment(momentFormat(fromdate), "DD-MM-YYYY").toDate().getTime()
    setSelectedFromDate(from)
    setSelectedToDate(toDate)
    getListExpensesFromDateToDate(from, toDate).then(task => {
      filterDate(task)
      setListSearch(task)
    })

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
    setListExpenses(newList.sort(biggestToSmallest))
    if (list.length == 0) {
      setSumExpenses(0)
      setSumIN(0)
      setSumOUT(0)
    }

  }

  function biggestToSmallest(a, b) {
    return b.created_date - a.created_date;
  }

  const momentFormat = (date) => {
    return moment(date).format("DD-MM-YYYY")
  }

  const momentFormatTime = (date) => {
    return moment(date).format("HH:mm")
  }

  const itemExpenses = ({ item, index }) => {
    let sumIn = 0
    let sumOut = 0
    let sum = 0
    item.list.map((i) => {
      if (i.in_out == 0)
        sumOut = sumOut + parseFloat(i.price)
      else sumIn = sumIn + parseFloat(i.price)
    })

    sum = sumIn - sumOut
    collect = collect + sumIn
    payout = payout + sumOut
    if (index == listExpenses.length - 1) {
      setSumExpenses(sum)
      setSumIN(collect)
      setSumOUT(payout)
    }

    const { list } = item

    let lis = [...list].reverse()

    return (
      <View style={{ margin: 5 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 5 }}>
          <Text style={{
            fontSize: 17,
          }}>Ngày {momentFormat(parseFloat(item.created_date))}</Text>
          <Text style={{
            fontSize: 17, color: sum >= 0 ? 'green' : 'red', fontWeight: 'bold'
          }}>{Utils.numberWithCommas(sum)} VND</Text>
        </View>

        <View style={{ backgroundColor: 'black', height: 0.7, margin: 5 }} />
        <SwipeListView
          style={{ marginHorizontal: 10 }}
          data={lis}
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

    const { descripbe, price, type, created_date, created_time, price_borrow, in_out } = item

    return (
      <TouchableHighlight
        onPress={() => {
          props.goToEdit({ item: item, wallet: wallet[0], add: false })
        }}
        style={style.rowFront}
        underlayColor={'#fff'}
      >
        <View style={{ height: 50 }}>
          <View style={style.itemExpenses}>
            <Text style={[style.text2, { color: 'black' }]}>{selectDropdown[(type + 1)].name}</Text>
            <Text style={style.text}> {created_time}</Text>
          </View>
          <View style={style.itemExpenses}>
            <Text style={style.text}>{descripbe}</Text>
            <Text style={[style.text, { color: in_out == 0 ? 'red' : 'green' }]}>{Utils.numberWithCommas(parseFloat(price))} VND</Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  }

  const handleRemove = (data) => {
    const { id, id_borrow, price_borrow, price, type, in_out } = data.item
    removeTask2(id).then(task => {
      task.map(item => {
        if (item.in_out == 0) {
          updateWallet(wallet[0].default, wallet[0].money + parseFloat(item.price))
        } else {
          updateWallet(wallet[0].default, wallet[0].money - parseFloat(item.price))
        }
      })

      if (task.length > 0) {
        deleteBorrow(task[0].id_borrow)
      }


      if (type == 13) {
        updateBorrow2(id_borrow, price_borrow)
      } else if (type == 15) {
        updateBorrow2(id_borrow, price_borrow)
      }

      if (in_out == 0) {
        updateWallet(wallet[0].default, wallet[0].money + parseFloat(price))
      } else {
        updateWallet(wallet[0].default, wallet[0].money - parseFloat(price))
      }
      getListExpensesFromDateToDate(fromDate, toDate).then(task => {
        getWallet()
        filterDate(task)
      })
    })
  }

  const renderHiddenItem = (data, rowMap) => {
    return (
      <View style={style.rowBack}>
        <TouchableOpacity
          style={[style.actionButton, style.deleteBtn]}
          onPress={() => handleRemove(data)}
        >
          <Text style={style.btnText}>Xóa</Text>
        </TouchableOpacity>
      </View>
    )
  }

  const onItemOpen = data => {
  };

  const create = () => {
    let date = new Date();
    date.setDate(date.getDate() );
    date.setHours(16, 37);
  
    AlarmClock.createAlarm(date.toDateString(), 'My Custom Alarm');
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
    if (search > -1) {
      const list = listSearch.filter(item => item.type == search)
      filterDate(list)
    } else {
      filterDate(listSearch)
    }

  }

  const onSearch = (search) => {
    console.log(search)
    if (search != '') {
      const list = listSearch.filter(item => item.descripbe.toLowerCase().includes(search.toLowerCase()))
      filterDate(list)
    } else {
      filterDate(listSearch)
    }

  }


  return (
    <View style={[style.container]}>
      <View style={[style.container2, { marginTop: insets.top }]}>
        <View style={{ flexDirection: 'row', padding: 5, backgroundColor: '#50a1e3', alignItems: 'center' }}>
          <View>
            <Text style={[style.text2, { color: 'white', borderColor: 'white', borderWidth: 1, borderRadius: 5, padding: 3 }]}>{wallet.length > 0 ? wallet[0].name : 'Chưa có ví'}</Text>
          </View>
          <Text style={[style.text2, { color: 'white' }]}>: {wallet.length > 0 ? Utils.numberWithCommas(wallet[0].money) : 0} VND </Text>
        </View>
        <View style={{ marginTop: 10, marginHorizontal: 10, flexDirection: 'row', justifyContent: 'center' }}>
          <Text style={{ fontWeight: 'bold', color: '#50a1e3' }}>Từ</Text>
          <TouchableOpacity onPress={toggleModalFromDate}>
            <Text style={{ fontWeight: 'bold' }}> {fromDate ? momentFormat(fromDate) : momentFormat(new Date().getTime())}</Text>
          </TouchableOpacity>
          <Text style={{ fontWeight: 'bold', color: '#50a1e3' }}> Đến </Text>
          <TouchableOpacity onPress={toggleModalToDate}>
            <Text style={{ fontWeight: 'bold' }}>{toDate ? momentFormat(toDate) : momentFormat(new Date().getTime())}</Text>
          </TouchableOpacity>

        </View>
        {/* <View >
      <Button title="Create Alarm at 1:55PM" onPress={() => create()} />
    </View> */}
        <View style={{ marginTop: 10, marginHorizontal: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <TextInput
            style={style.borderSearch}
            placeholderTextColor={'#E1E1E1'}
            placeholder="tìm kiếm theo mô tả"
            onChangeText={text => onSearch(text)}
          />
          <SelectDropdown
            data={selectDropdown}
            disabled={edit}
            disableAutoScroll={false}
            defaultButtonText={selectDropdown[type].name}
            onSelect={(selectedItem, index) => {
              setIsType(true)
              handleSearch(selectedItem.id)
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

              return selectedItem.name
            }}
            rowTextForSelection={(item, index) => {
              return item.name
            }}
            buttonStyle={style.dropdown1BtnStyleFalse}
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

        <FlatList
          style={{ marginTop: 10 }}
          data={listExpenses}
          renderItem={itemExpenses} />

        <TouchableOpacity style={{ position: 'absolute', bottom: 25, right: 20 }} onPress={() => props.goToAdd({ wallet: wallet[0], add: true })}>
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
    </View>
  )
}

export default Home;