import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TextInput, TouchableOpacity, TouchableHighlight, PermissionsAndroid, Alert, Platform } from "react-native"
import { useIsFocused } from "@react-navigation/native";
import { Color } from "../../common";
import { useSelector, useDispatch } from "react-redux";
import style from "./style";
import { FloodReports } from "../../model/types.d";
import urid from 'urid';
import { updateWallet, addWallet, getListwalletDefault } from "../../data/WalletServices";
import {
  removeTask2, getListExpensesFromDateToDate, deleteBorrow, updateBorrow2, getListExpenses
} from "../../data/ExpensesServices ";
import moment from 'moment';
import * as ActionTypes from '../../redux/actions/ActionTypes'
import { SwipeListView } from 'react-native-swipe-list-view';
import Modal from "react-native-modal";
import { Utils, String } from "@common";
import Calendar from "../../component/Calendar";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import SelectDropdown from 'react-native-select-dropdown'
import * as Icon from "react-native-feather"
import { useTranslation, initReactI18next } from "react-i18next";
import Empty from "../../component/Empty";
import { useTheme } from 'react-native-paper';
import Banner from "../../component/Banner";
import { Linking } from 'react-native';
import VersionCheck from 'react-native-version-check';

const Home = (props) => {
  const { t } = useTranslation()
  const insets = useSafeAreaInsets();
  let fisrt = {
    id: -1,
    name: 'text.title.all',
    type: '0'
  }
  const addfirst = [fisrt, ...Utils.TypeExpenses]
  const { colors } = useTheme()
  const [wallet, setWallet] = useState([]);
  const [sum, setSum] = useState(0);
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
  const [visible, setVisible] = useState(false);
  const [isType, setIsType] = useState(true)

  const [type, setType] = useState(0)
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [select, setSelect] = useState([{ name: t('text.day'), index: 0 }]);

  const [updateApp, setUpdateApp] = useState(false);

  let collect = 0
  let payout = 0
  let first = 0
  let listDate = [{ name: t('text.day'), index: 0 }, { name: t('text.weeks'), index: 1 }, { name: t('text.month'), index: 2 }, { name: t('text.select.day'), index: 3 }]

  useEffect(() => {
    permission_reqused_fn()
    VersionCheck.getCountry()
      .then(country => console.log(country));          // KR
    //console.log('KR',VersionCheck.getPackageName());        // com.reactnative.app
    // console.log(VersionCheck.getCurrentBuildNumber()); // 10
    // console.log(VersionCheck.getCurrentVersion());     // 0.1.1

    VersionCheck.needUpdate()
      .then(async res => {
       // console.log(res.isNeeded);    // true
        if (res.isNeeded) {
          setUpdateApp(true)
        }
      });
  }, [])

  useEffect(() => {
    const item = select[0]
    if (item.index == 0)
      getDay()
    else if (item.index == 1)
      getWeeks()
    else if (item.index == 2)
      getMonths()
    else {
      //getWeeks()
      //console.log(select)
    }
  }, [select])


  useEffect(() => {
    if (isVisible) {
      getListExpenses().then(list => {
        let spend = 0
        let collect = 0
        list.map((item) => {
          if (item.in_out == 0)
            spend = spend + parseFloat(item.price)
          else collect = collect + parseFloat(item.price)
        })
        let result = collect - spend
        setSum(result)
      })
      const item = select[0]
      if (item.index == 0)
        getDay()
      else if (item.index == 1)
        getWeeks()
      else if (item.index == 2)
        getMonths()
      else {
        //getWeeks()
       // console.log(select)
      }
      getWallet()

    } else
      setListExpenses([])
    setListSearch([])
    setTimeout(() => {
      setLoading(true)
    }, 2000);


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

  const permission_reqused_fn = async () => {
    try {
      const granted_read = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: "Storage Read Permisison: ",
          message: "This app requires storage permission for importing app data.",
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK'
        }
      );
      const granted_write = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: "Storage Write Permisison: ",
          message: "This app requires storage permission in order to store data on device.",
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK'
        }
      );
      if ((granted_write === PermissionsAndroid.RESULTS.GRANTED && granted_read === PermissionsAndroid.RESULTS.GRANTED) || Number(Platform.Version) >= 33) {

      }
      else {
        Alert.alert("Storage Permission is not granted.");
      }
    } catch (err) {
      Alert.alert("Storage Permission is not granted.");
    }
  }

  const getWeeks = () => {
    var curr = new Date; // get current date
    var first = curr.getDate() - curr.getDay();
    var firstdayOb = new Date(curr.setDate(first));
    var firstday = firstdayOb.toUTCString();
    var firstdayTemp = firstdayOb;
    var lastday = new Date(firstdayTemp.setDate(firstdayTemp.getDate() + 6)).toUTCString();
    // console.log('chu nhat',new Date(firstday).getTime());
    // console.log('thu 7 ',new Date(lastday).getTime());
    getListDate(new Date(firstday).getTime(), new Date(lastday).getTime())

  }

  const getMonths = () => {
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    //   console.log(firstDay); // 👉️ Sat Oct 01 2022 ...
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    //  console.log(lastDay); // 👉️ Mon Oct 31 2022 ...
    if (first == 0)
      first = new Date(firstDay).getTime()
    let last = new Date(lastDay).getTime()
    getListDate(first, last)
  }

  const getDay = () => {
    const date = new Date().getTime()
    getListDate(date, date)

  }

  const addWalletDefault = () => {
    addWallet(urid(), 'mywallet', 0, new Date().getTime().toString(), true)
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
      <View style={{ marginTop: 8, backgroundColor: colors.viewBackground }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ backgroundColor: Color.blue, width: 5, height: 50 }} />
            <Text style={{
              fontSize: 18, marginLeft: 10, fontWeight: 'bold', color: colors.title
            }}>{momentFormat(parseFloat(item.created_date))}</Text>
          </View>

          <Text style={{
            fontSize: 18, color: sum >= 0 ? 'green' : Color.red, fontWeight: 'bold', marginRight: 10
          }}>{Utils.numberWithCommas(sum)} <Text style={style.textUnit}>{t('text.unit')}</Text></Text>
        </View>

        <View style={{ backgroundColor: 'black', height: 0.3, margin: 5 }} />
        <SwipeListView
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
          props.goToEdit({ item: item, wallet: null, add: false })
        }}
        style={[style.rowFront, { backgroundColor: colors.viewBackground }]}
        underlayColor={'#fff'}
      >
        <View style={{ height: 50, paddingHorizontal: 10 }}>
          <View style={style.itemExpenses}>
            <Text style={[style.text2, { color: colors.title }]}>{t(selectDropdown[(type + 1)].name)}</Text>
            <Text style={[style.text, { color: colors.title }]}> {created_time}</Text>
          </View>
          <View style={style.itemExpenses}>
            <Text style={[style.text, { color: colors.title }]}>{descripbe}</Text>
            <Text style={[style.text, { fontSize: 18, color: in_out == 0 ? Color.red : 'green' }]}>{Utils.numberWithCommas(parseFloat(price))} <Text style={style.textUnit}>{t('text.unit')}</Text></Text>
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
        {/* <TouchableOpacity
          style={[style.actionButton, style.deleteBtn]}
          onPress={() => handleRemove(data)}
        >
          <Text style={style.btnText}>{t('button.delete')}</Text>
        </TouchableOpacity> */}
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
    if (select[0].index == 3)
      setFromDate(!isFromDate);
  };

  const toggleModalToDate = () => {
    if (select[0].index == 3)
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
    if (search != '') {
      const list = listSearch.filter(item => item.descripbe.toLowerCase().includes(search.toLowerCase()))
      filterDate(list)
    } else {
      filterDate(listSearch)
    }

  }

  function showUpdateApp() {
    return (
      <Modal isVisible={updateApp}>
        <View style={style.dialog}>
          <Text style={style.title}>{t('title_update_app')}</Text>
          <Text style={[style.textLangague, { marginBottom: 10 }]}>{t('update_app')}</Text>
          <View style={{ flexDirection: 'row' }}>

            <TouchableOpacity style={style.buttonLangagueEN} onPress={() => {
              Linking.openURL(String.link),
                setUpdateApp(false)
            }} >
              <Text style={[style.textLangague, { fontWeight: 'bold' }]}>{t('btn_update_app')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    )
  }


  function showLoading() {
    return (
      <View style={{ backgroundColor: 'white', position: 'absolute', alignItems: 'center', width: '100%', height: '100%' }}>
      </View>

    )
  }

  const itemSelectDate = ({ item, index }) => {
    const check = select[0].index == item.index
    // console.log(select, item)
    return (
      <TouchableOpacity style={check ? style.selectTimeOn : style.selectTime} onPress={() => selectDate(item, !check, index)}>
        <Text style={{ color: check ? 'white' : colors.title }}>{item.name}</Text>
      </TouchableOpacity>
    )
  }

  const selectDate = (i, check, index) => {
    if (check) {
      setSelect([...new Set([{ name: i.name, index: index }])])
    } else {
      //  setSelect(select.filter(item=>item =! i))
    }
  }


  return (
    <View style={[style.container]}>
      <View style={[style.container2, { top: insets.top, backgroundColor: colors.background }]}>
        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: Color.blue, padding: 10 }}>
          <Text style={[style.textBalance, { color: colors.title, fontWeight: 'bold' }]}>{t('text.balance')}</Text>
          <Text style={[style.textPrice, { color: 'white' }]}> {Utils.numberWithCommas(parseFloat(sum))} <Text style={style.textUnit}>{t('text.unit')}</Text> </Text>
          {/* <Text style={style.textHistory}> <Text style={[style.textBalance, { color: colors.title }]}>{t('text.balance')}</Text>{Utils.numberWithCommas(parseFloat(sum))} <Text style={style.textUnit}>{t('text.unit')}</Text> </Text> */}
        </View>
        <Banner />
        {/* <View style={[style.borderBalance, { backgroundColor: colors.viewBackground }]}>
          <Text style={[style.textBalance, { color: colors.title }]}>{t('text.balance')}</Text>
          <Text style={[style.textPrice, { color: sum > 0 ? 'green' : Color.blue }]}> {Utils.numberWithCommas(parseFloat(sum))} <Text style={style.textUnit}>{t('text.unit')}</Text> </Text>
        </View> */}
        <View style={{ backgroundColor: colors.viewBackground, padding: 5 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 5 }}>
            <FlatList
              data={listDate}
              horizontal={true}
              renderItem={itemSelectDate} />
          </View>
          <View style={{ marginTop: 5, marginHorizontal: 10, flexDirection: 'row', justifyContent: 'center' }}>
            <Text style={style.textFromDate}>{t('from')}</Text>
            <TouchableOpacity onPress={toggleModalFromDate} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={[style.textDate, { color: colors.title }]}> {fromDate ? momentFormat(fromDate) : momentFormat(new Date().getTime())}</Text>
              {
                select[0].index == 3 ? <Icon.Calendar stroke={colors.title} width={17} height={17} /> : null
              }

            </TouchableOpacity>
            <Text style={style.textFromDate}> {t('to')} </Text>
            <TouchableOpacity onPress={toggleModalToDate} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={[style.textDate, { color: colors.title }]}>{toDate ? momentFormat(toDate) : momentFormat(new Date().getTime())}</Text>
              {
                select[0].index == 3 ? <Icon.Calendar stroke={colors.title} width={17} height={17} /> : null
              }
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 10, marginHorizontal: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <TextInput
              style={[style.borderSearch, { color: colors.title }]}

              placeholderTextColor={Color.gray2}
              placeholder={t('txt_search')}
              onChangeText={text => onSearch(text)}
            />
            <SelectDropdown
              data={selectDropdown}
              disabled={edit}
              disableAutoScroll={false}
              defaultButtonText={t(selectDropdown[type].name)}
              onSelect={(selectedItem, index) => {
                setIsType(true)
                handleSearch(selectedItem.id)
              }}

              renderCustomizedRowChild={(item, index) => {
                return (
                  <View>
                    {
                      item.id != 0 && item.id != 11 && item.id != 16 ?
                        <Text style={[style.dropdown1RowTxtStyle, { color: colors.title }]}>{t(item.name)}</Text>
                        : <Text style={[style.dropdown1RowTxtStyleTitle, { color: colors.title }]}>{t(item.name)}</Text>
                    }
                  </View>
                );
              }}
              buttonTextAfterSelection={(selectedItem, index) => {

                return t(selectedItem.name)
              }}
              rowTextForSelection={(item, index) => {
                return t(item.name)
              }}
              buttonStyle={[style.dropdown1BtnStyleFalse, { backgroundColor: colors.viewBackground }]}
              buttonTextStyle={[style.dropdown1BtnTxtStyle, { color: colors.title }]}
              renderDropdownIcon={isOpened => {
                return !edit ? isOpened ? <Icon.ChevronUp stroke={Color.blue} /> : <Icon.ChevronDown stroke={Color.blue} /> : null
              }}
              dropdownIconPosition={'right'}
              dropdownStyle={style.dropdown1DropdownStyle}
              rowStyle={[style.dropdown1RowStyle, { backgroundColor: colors.viewBackground }]}
              rowTextStyle={style.dropdown1RowTxtStyle}
            />
          </View>
        </View>
        <View style={{ paddingHorizontal: 10 }}>
          {
            sumOUT != 0 ?
              <View style={{ flexDirection: 'row', alignContent: 'center', marginTop: 5 }}>
                <Text style={{ width: 80, fontSize: 18 }}>Tổng chi: </Text>
                <Text style={{ color: Color.red, fontSize: 18, fontWeight: 'bold' }}>{Utils.numberWithCommas(parseFloat(sumOUT))} {t('text.unit')}</Text>
              </View>
              : null

          }
          {
            sumIN != 0 ?
              <View style={{ flexDirection: 'row', alignContent: 'center', marginTop: 5 }}>
                <Text style={{ width: 80, fontSize: 18 }}>Tổng thu: </Text>
                <Text style={{ color: 'green', fontSize: 18, fontWeight: 'bold' }}>{Utils.numberWithCommas(parseFloat(sumIN))} {t('text.unit')}</Text>
              </View>
              : null

          }
        </View>
        {
          listExpenses != null && listExpenses.length > 0 ?
            <FlatList
              data={listExpenses}
              showsVerticalScrollIndicator={false}
              renderItem={itemExpenses} />
            :
            <Empty title={t('text.not.record')} />
        }


        {/* <TouchableOpacity style={{ position: 'absolute', bottom: 30, right: 30 }} onPress={() => props.goToAdd({ wallet: wallet[0], add: true })}>
          <ButtonAdd />
        </TouchableOpacity> */}
        <Modal isVisible={isFromDate}>
          <View style={[style.borderCalendar, { backgroundColor: colors.viewBackground }]}>

            <Calendar onDateChange={onFromDateChange} />
          </View>

        </Modal>
        <Modal isVisible={isToDate}>
          <View style={[style.borderCalendar, { backgroundColor: colors.viewBackground }]}>
            <Calendar onDateChange={onToDateChange} />

          </View>
        </Modal>
        {showUpdateApp()}
      </View>

      {

        !loading ?
          showLoading() :
          null
      }
    </View >
  )
}

export default Home;