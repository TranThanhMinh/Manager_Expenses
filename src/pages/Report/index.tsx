import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, ScrollView, Dimensions } from 'react-native'

import { Utils, Color } from "../../common";
import style from "./style";
import { useIsFocused } from "@react-navigation/native";
import Pie from 'react-native-pie'
import moment from 'moment';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Calendar from '../../component/Calendar'
import Modal from "react-native-modal";
import { getListwalletDefault } from "../../data/WalletServices";
import {
  getListExpensesFromDateToDate, deleteBorrow
} from "../../data/ExpensesServices ";
import { LineChart } from "react-native-gifted-charts";
import { useTranslation, initReactI18next } from "react-i18next"
import { useTheme } from "react-native-paper";
import Banner from "../../component/Banner";
import * as Icon from "react-native-feather"

const Report = (props) => {
  const { t } = useTranslation()
  const { colors } = useTheme()
  const insets = useSafeAreaInsets();
  const [wallet, setWallet] = useState([]);
  const isVisible = useIsFocused();

  const [listExpenses, setListExpenses] = useState([])
  const [listDaily, setListDaily] = useState([])
  const [sumIN, setSumIN] = useState(0)
  const [sumOUT, setSumOUT] = useState(0)

  const [precent_money, setPrecentMoney] = useState(0)
  const [fromDate, setSelectedFromDate] = useState(0)
  const [toDate, setSelectedToDate] = useState(0)

  const [isFromDate, setFromDate] = useState(false);
  const [isToDate, setToDate] = useState(false);
  const [isInfo, setInfo] = useState(false);

  const [listCT, setListCt] = React.useState([]);
  const [listTT, setListTt] = React.useState([]);
  const [listExpensesDaily, setListExpensesDaily] = useState([])

  const [select, setSelect] = useState([{ name: t('text.day'), index: 0 }]);
  let list1 = []
  let list2 = []
  let first = 0
  const { width } = Dimensions.get("window");
  const height = 256;
  let listDate = [{ name: t('text.day'), index: 0 }, { name: t('text.weeks'), index: 1 }, { name: t('text.month'), index: 2 }, { name: t('text.select.day'), index: 3 }]


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
      console.log(select)
    }
  }, [select])

  useEffect(() => {
    if (isVisible) {
      const item = select[0]
      if (item.index == 0)
      getDay()
    else if (item.index == 1)
      getWeeks()
    else if (item.index == 2)
      getMonths()
    else {
      //getWeeks()
      console.log(select)
    }
      getWallet()
   

    } else
      setListExpenses([])

  }, [isVisible]);


  const getWallet = () => {
    getListwalletDefault(true).then(task => {
      if (task.length > 0)
        setWallet(task)
      else addWalletDefault()
    })
  }

  const addWalletDefault = () => {
    getListwalletDefault(true).then(task => {
      setWallet(task)
    })
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


  const getListDate = (fromdate, toDate) => {
    let from = moment(momentFormat(fromdate), "DD-MM-YYYY").toDate().getTime()
    setSelectedFromDate(from)
    setSelectedToDate(toDate)
    getListExpensesFromDateToDate(from, toDate).then(task => {
      filterDate(task)
      filterDailay(task)
    })
  }

  const filterDailay = (list) => {

    let newList = Object.values(list.reduce((acc, item) => {
      if (!acc[item.created_date]) acc[item.created_date] = {
        created_date: item.created_date,
        list: []
      };
      acc[item.created_date].list.push(item);
      return acc;
    }, {}))
    // setListExpensesDaily(newList.sort(biggestToSmallest))
    // if (list.length == 0) {
    //   // setSumExpenses(0)
    //   // setSumIN(0)
    //   // setSumOUT(0)
    // }
    const listDaily = []
    newList.sort(biggestToSmallest).map((item) => {
      let sum = 0
      let sumout = 0
      let sumin = 0

      item.list.map((item2) => {

        if (item2.in_out == 0)
          sumout = sumout + parseFloat(item2.price)
        else sumin = sumin + parseFloat(item2.price)
        // console.log('minh2', JSON.stringify(item2.price),' ',item2.type)
      })
      sum = sumin - sumout

      listDaily.push({ value: sum, date: item.created_date })

    })
    setListDaily(listDaily)
    console.log(listDaily)
  }

  function biggestToSmallest(a, b) {
    return b.created_date - a.created_date;
  }

  const isFound = (val) => {
    if (list1.some(item => val.name == item.name)) {
      list1 = list1.filter(item => val.name != item.name);
    }
    list1.push(val);
  }

  const isFound2 = (val) => {
    if (list2.some(item => val.name == item.name)) {
      list2 = list2.filter(item => val.name != item.name);
    }
    list2.push(val);
  }

  const filterDate = (list) => {
    console.log(list)
    setListExpenses(list)
    let sumIn = 0
    let sumOut = 0

    let ct1 = 0
    let ct12 = 0
    let ct2 = 0
    let ct3 = 0
    let ct31 = 0
    let ct4 = 0
    let ct5 = 0
    let ct52 = 0
    let ct53 = 0
    let ct6 = 0
    let ct7 = 0
    let ct72 = 0


    let tt1 = 0
    let tt2 = 0
    let tt3 = 0
    let tt4 = 0
    let tt41 = 0
    let tt5 = 0

    if (list.length == 0) {
      setSumIN(0)
      setSumOUT(0)
      setListCt([])
      setListTt([])

    } else {
      list.map((i) => {
        if (i.in_out == 0)
          sumOut = sumOut + parseFloat(i.price)
        else sumIn = sumIn + parseFloat(i.price)

        if (i.price > 0) {
          if (i.type == 1) {
            ct1 = ct1 + parseFloat(i.price)
            let item = {
              name: t('text.eat.drink'),
              color: 'green',
              price: ct1,
              percentage: (ct1 / sumOut) * 100,
            }
            isFound(item)

          } else if (i.type == 2) {
            ct12 = ct12 + parseFloat(i.price)
            let item = {
              name: t('text.coffee'),
              color: 'black',
              price: ct12,
              percentage: (ct12 / sumOut) * 100,
            }
            isFound(item)

          }

          else if (i.type == 3) {
            ct2 = ct2 + parseFloat(i.price)
            let item = {
              name: t('text.market'),
              color: 'red',
              price: ct2,
              percentage: (ct2 / sumOut) * 100,
            }

            isFound(item)

          } else if (i.type == 4) {
            ct3 = ct3 + parseFloat(i.price)
            let item = {
              name: t('text.electricity.water.bill'),
              color: '#A98D8D',
              price: ct3,
              percentage: (ct3 / sumOut) * 100,
            }
            isFound(item)

          }
          else if (i.type == 5) {
            ct31 = ct31 + parseFloat(i.price)
            let item = {
              name: t('text.telephone.bill'),
              color: '#EBD22F',
              price: ct31,
              percentage: (ct31 / sumOut) * 100,
            }
            isFound(item)

          }
          else if (i.type == 6) {
            ct4 = ct4 + parseFloat(i.price)
            let item = {
              name: t('text.clothes'),
              color: '#3B3538',
              price: ct4,
              percentage: (ct4 / sumOut) * 100,
            }
            isFound(item)

          } else if (i.type == 7) {
            ct5 = ct5 + parseFloat(i.price)
            let item = {
              name: t('text.petroleum'),
              color: '#18EB87',
              price: ct5,
              percentage: (ct5 / sumOut) * 100,
            }
            isFound(item)
          }
          else if (i.type == 8) {
            ct52 = ct52 + parseFloat(i.price)
            let item = {
              name: t('text.rent'),
              color: 'blue',
              price: ct52,
              percentage: (ct52 / sumOut) * 100,
            }
            isFound(item)
          }
          else if (i.type == 9) {
            ct53 = ct53 + parseFloat(i.price)
            let item = {
              name: t('text.expense.2'),
              color: 'blue',
              price: ct53,
              percentage: (ct53 / sumOut) * 100,
            }
            isFound(item)
          }
          else if (i.type == 10) {

            ct6 = ct6 + parseFloat(i.price)
            let item = {
              name: t('text.other'),
              color: '#4A6BED',
              price: ct6,
              percentage: (ct6 / sumOut) * 100,
            }
            isFound(item)

          }
          else if (i.type == 13) {
            ct7 = ct7 + parseFloat(i.price)
            let item = {
              name: t('text.pay'),
              color: '#BA16DB',
              price: ct7,
              percentage: (ct7 / sumOut) * 100,
            }
            isFound(item)
          }
          else if (i.type == 14) {

            ct72 = ct72 + parseFloat(i.price)
            let item = {
              name: t('text.loan'),
              color: '#56B332',
              price: ct72,
              percentage: (ct72 / sumOut) * 100,
            }
            console.log('14', i.price)
            isFound(item)
          }
          else if (i.type == 12) {
            tt1 = tt1 + parseFloat(i.price)
            let item = {
              name: t('text.borrow'),
              color: 'green',
              price: tt1,
              percentage: (tt1 / sumIn) * 100,
            }
            isFound2(item)


          } else if (i.type == 15) {
            tt2 = tt2 + parseFloat(i.price)
            let item = {
              name: t('text.debt'),
              color: 'red',
              price: tt2,
              percentage: (tt2 / sumIn) * 100,
            }
            isFound2(item)

          }
          else if (i.type == 17) {
            tt3 = tt3 + parseFloat(i.price)
            let item = {
              name: t('text.salary'),
              color: '#EBD22F',
              price: tt3,
              percentage: (tt3 / sumIn) * 100,
            }
            isFound2(item)

          }
          else if (i.type == 18) {
            tt4 = tt4 + parseFloat(i.price)
            let item = {
              name: t('text.interest'),
              color: '#3B3538',
              price: tt4,
              percentage: (tt4 / sumIn) * 100,
            }
            isFound2(item)

          } else if (i.type == 19) {
            tt41 = tt41 + parseFloat(i.price)
            let item = {
              name: t('text.ponus'),
              color: '#A43232',
              price: tt41,
              percentage: (tt41 / sumIn) * 100,
            }
            isFound2(item)

          }
          else if (i.type == 20) {
            tt5 = tt5 + parseFloat(i.price)
            let item = {
              name: t('text.other'),
              color: 'blue',
              price: tt5,
              percentage: (tt5 / sumIn) * 100,
            }
            isFound2(item)
          }
        }

      })
      setSumIN(sumIn)
      setSumOUT(sumOut)
      setListCt(list1)
      setListTt(list2)
      let prencent_money = 100 - (sumOut / sumIn) * 100
      setPrecentMoney(prencent_money)

    }

  }

  const momentFormat = (date) => {
    return moment(date).format("DD-MM-YYYY")
  }


  const renderItem2 = ({ item }) => {
    const { name, color, price } = item
    let prencent = (price / sumOUT) * 100
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 5 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
          <Text style={{ fontSize: 16, color: colors.title }}>{name}</Text>
          <Text style={{ fontSize: 16, color: color }}> ({prencent.toFixed(2)})%</Text>

        </View>
        <Text style={{ fontSize: 18, color: Color.blue }}>{Utils.numberWithCommas(price)} <Text style={style.textUnit}>{t('text.unit')}</Text></Text>
      </View>

    )
  }

  const renderItem3 = ({ item }) => {
    const { name, color, price } = item
    let prencent = (price / sumIN) * 100
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 5 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
          <Text style={{ fontSize: 16, color: colors.title }}>{name}</Text>
          <Text style={{ fontSize: 16, color: color }}> ({prencent.toFixed(2)})%</Text>

        </View>
        <Text style={{ fontSize: 18, color: 'green' }}>{Utils.numberWithCommas(price)} <Text style={style.textUnit}>{t('text.unit')}</Text></Text>
      </View>

    )
  }

  const renderItem = ({ item }) => {
    const { name, color, price } = item
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', alignContent: 'center' }}>
        <Text style={{ width: 10, height: 10, backgroundColor: color, margin: 5 }} />
        <Text style={{ fontSize: 16, color: colors.title }}>{name}</Text>
      </View>
    )
  }

  
  const itemSelectDate = ({ item ,index}) => {
    const check = select[0].index == item.index
    return (
      <TouchableOpacity style={check ? style.selectTimeOn : style.selectTime} onPress={() => selectDate(item, !check,index)}>
        <Text style={{ color: colors.title }}>{item.name}</Text>
      </TouchableOpacity>
    )
  }

  const selectDate = (i, check,index) => {
    if (check) {
      setSelect([...new Set([{ name: i.name, index: index }])])
    } else {
      //  setSelect(select.filter(item=>item =! i))
    }
  }


  const ItemDivider = () => {
    return (
      <View
        style={{
          height: 0.5,
          flex: 1,
          backgroundColor: "#607D8B",
        }}
      />
    );
  }

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

  return (
    <View style={style.container}>
      <View style={[style.container2, { marginTop: insets.top, backgroundColor: colors.background }]}>
        <View style={{ flexDirection: 'row', padding: 10, backgroundColor: Color.blue, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={style.text2}>{t('text.report')}</Text>
        </View>
        <Banner />

        <View style={{ backgroundColor: colors.viewBackground, padding: 5 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 5 }}>
            <FlatList
              data={listDate}
              horizontal={true}
              renderItem={itemSelectDate} />
          </View>
          <View style={{ padding: 15, flexDirection: 'row', justifyContent: 'center', backgroundColor: colors.viewBackground }}>

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
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <View style={[style.bgView, { backgroundColor: colors.viewBackground }]}>
              <Text style={[style.text, { color: Color.blue }]}>{t('text.expense')} {Utils.numberWithCommas(sumOUT)} <Text style={style.textUnit}>{t('text.unit')}</Text></Text>
              {
                listCT.length > 0 ?
                  <View style={{
                    paddingHorizontal: 10,
                  }}>
                    <View
                      style={{
                        paddingVertical: 20,
                        flexDirection: 'row',
                      }}
                    >
                      <Pie
                        radius={80}
                        innerRadius={50}
                        sections={listCT}
                        strokeCap={'butt'}
                      />
                      <View style={{ marginLeft: 10 }}>
                        <FlatList
                          data={listCT}
                          showsVerticalScrollIndicator={false}
                          renderItem={renderItem}
                        />
                      </View>
                    </View>
                    <View>
                      <FlatList
                        data={listCT}
                        renderItem={renderItem2}
                        ItemSeparatorComponent={ItemDivider} />
                    </View>
                  </View> : null

              }
            </View>
            <View style={[style.bgView, { backgroundColor: colors.viewBackground }]}>
              <Text style={[style.text, { color: 'green' }]}>{t('text.income')} {Utils.numberWithCommas(sumIN)} <Text style={style.textUnit}>{t('text.unit')}</Text></Text>
              {
                listTT.length > 0 ?
                  <View style={{
                    paddingHorizontal: 10,
                  }}>
                    <View
                      style={{
                        paddingVertical: 20,
                        flexDirection: 'row',
                      }}
                    >
                      <Pie
                        radius={80}
                        innerRadius={50}
                        sections={listTT}
                        strokeCap={'butt'} />

                      <View style={{ marginLeft: 10 }}>
                        <FlatList
                          data={listTT}
                          renderItem={renderItem}
                        />
                      </View>
                    </View>
                    <View>
                      <FlatList
                        data={listTT}
                        renderItem={renderItem3}
                        ItemSeparatorComponent={ItemDivider} />
                    </View>
                  </View>
                  : null
              }
            </View>
            {/* <Text style={{ fontWeight: 'bold', color: 'white', padding: 10, backgroundColor: '#50a1e3' }}>Biểu đồ theo dõi mỗi ngày</Text> */}


            <View>
              {/* <LineChart
                areaChart
                data={listDaily}
                width={width}
                hideDataPoints
                spacing={20}
                color="#50a1e3"

                startFillColor="#50a1e3"
                endFillColor="#50a1e3"
                //   startOpacity={1}
                // endOpacity={0.2}
                //initialSpacing={0}
                noOfSections={6}
                height={300}
                yAxisColor="white"
                yAxisThickness={0}
                rulesType="solid"
                rulesColor="gray"
                yAxisTextStyle={{ color: 'gray' }}
                yAxisTextNumberOfLines={1}
                //  yAxisLabelWidth={40}
                yAxisSide='right'
                xAxisColor="lightgray"
                pointerConfig={{
                  //   pointerStripHeight: 160,
                  pointerStripColor: 'lightgray',
                  pointerStripWidth: 2,
                  pointerColor: 'lightgray',
                  radius: 6,
                  pointerLabelWidth: 100,
                  pointerLabelHeight: 90,
                  // activatePointersOnLongPress: true,
                  // autoAdjustPointerLabelPosition: false,
                  pointerLabelComponent: items => {
                    return (
                      <View
                        style={style.detailinfo}>
                        <Text
                          style={style.textdetail}>
                          {momentFormat(items[0].date)}
                        </Text>
                        <View
                        >
                          <Text style={[style.textPrive, { color: items[0].value >= 0 ? 'green' : 'red' }]}>
                            {'$' + Utils.numberWithCommas(items[0].value)}
                          </Text>
                        </View>
                      </View>
                    );
                  },
                }}
              /> */}
            </View>
            <View>


            </View>
          </View>
        </ScrollView>
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


      </View>
    </View>
  )
}

export default Report;