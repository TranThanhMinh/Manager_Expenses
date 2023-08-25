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

const Report = (props) => {
  const { t } = useTranslation()
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
  let list1 = []
  let list2 = []

  const { width } = Dimensions.get("window");
  const height = 256;

  useEffect(() => {

  }, [])


  useEffect(() => {
    if (isVisible) {
      const now = new Date();
      const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
      //   console.log(firstDay); // 👉️ Sat Oct 01 2022 ...
      const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      //  console.log(lastDay); // 👉️ Mon Oct 31 2022 ...
      let first = new Date(firstDay).getTime()
      let last = new Date(lastDay).getTime()
      getWallet()
      getListDate(first, last)

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
              name: 'Ăn uống',
              color: 'green',
              price: ct1,
              percentage: (ct1 / sumOut) * 100,
            }
            isFound(item)

          } else if (i.type == 2) {
            ct12 = ct12 + parseFloat(i.price)
            let item = {
              name: 'cà phê',
              color: 'black',
              price: ct12,
              percentage: (ct12 / sumOut) * 100,
            }
            isFound(item)

          }

          else if (i.type == 3) {
            ct2 = ct2 + parseFloat(i.price)
            let item = {
              name: 'Đi chợ',
              color: 'red',
              price: ct2,
              percentage: (ct2 / sumOut) * 100,
            }

            isFound(item)

          } else if (i.type == 4) {
            ct3 = ct3 + parseFloat(i.price)
            let item = {
              name: 'Hoá đơn điện/nước',
              color: '#A98D8D',
              price: ct3,
              percentage: (ct3 / sumOut) * 100,
            }
            isFound(item)

          }
          else if (i.type == 5) {
            ct31 = ct31 + parseFloat(i.price)
            let item = {
              name: 'Hoá đơn điện thoại',
              color: '#EBD22F',
              price: ct31,
              percentage: (ct31 / sumOut) * 100,
            }
            isFound(item)

          }
          else if (i.type == 6) {
            ct4 = ct4 + parseFloat(i.price)
            let item = {
              name: 'Quần áo',
              color: '#3B3538',
              price: ct4,
              percentage: (ct4 / sumOut) * 100,
            }
            isFound(item)

          } else if (i.type == 7) {
            ct5 = ct5 + parseFloat(i.price)
            let item = {
              name: 'Xăng dầu',
              color: '#18EB87',
              price: ct5,
              percentage: (ct5 / sumOut) * 100,
            }
            isFound(item)
          }
          else if (i.type == 8) {
            ct52 = ct52 + parseFloat(i.price)
            let item = {
              name: 'Thuê nhà',
              color: 'blue',
              price: ct52,
              percentage: (ct52 / sumOut) * 100,
            }
            isFound(item)
          }
          else if (i.type == 9) {
            ct53 = ct53 + parseFloat(i.price)
            let item = {
              name: ' phí',
              color: 'blue',
              price: ct53,
              percentage: (ct53 / sumOut) * 100,
            }
            isFound(item)
          }
          else if (i.type == 10) {

            ct6 = ct6 + parseFloat(i.price)
            let item = {
              name: 'Khác',
              color: '#4A6BED',
              price: ct6,
              percentage: (ct6 / sumOut) * 100,
            }
            isFound(item)

          }
          else if (i.type == 13) {
            ct7 = ct7 + parseFloat(i.price)
            let item = {
              name: 'Trả nợ',
              color: '#BA16DB',
              price: ct7,
              percentage: (ct7 / sumOut) * 100,
            }
            isFound(item)
          }
          else if (i.type == 14) {

            ct72 = ct72 + parseFloat(i.price)
            let item = {
              name: 'Cho vay',
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
              name: 'Đi vay',
              color: 'green',
              price: tt1,
              percentage: (tt1 / sumIn) * 100,
            }
            isFound2(item)


          } else if (i.type == 15) {
            tt2 = tt2 + parseFloat(i.price)
            let item = {
              name: 'Thu nợ',
              color: 'red',
              price: tt2,
              percentage: (tt2 / sumIn) * 100,
            }
            isFound2(item)

          }
          else if (i.type == 17) {
            tt3 = tt3 + parseFloat(i.price)
            let item = {
              name: 'Tiền lương',
              color: '#EBD22F',
              price: tt3,
              percentage: (tt3 / sumIn) * 100,
            }
            isFound2(item)

          } 
          else if (i.type == 18) {
            tt4 = tt4 + parseFloat(i.price)
            let item = {
              name: 'Tiền lãi',
              color: '#3B3538',
              price: tt4,
              percentage: (tt4 / sumIn) * 100,
            }
            isFound2(item)

          } else if (i.type == 19) {
            tt41 = tt41 + parseFloat(i.price)
            let item = {
              name: 'Tiền thưởng',
              color: '#A43232',
              price: tt41,
              percentage: (tt41 / sumIn) * 100,
            }
            isFound2(item)

          }
          else if (i.type == 20) {
            tt5 = tt5 + parseFloat(i.price)
            let item = {
              name: 'Khác',
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
          <Text style={{ fontSize: 16, color: 'black' }}>{name}</Text>
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
          <Text style={{ fontSize: 16, color: Color.black}}>{name}</Text>
          <Text style={{ fontSize: 16, color: color }}> ({prencent.toFixed(2)})%</Text>

        </View>
        <Text style={{ fontSize: 18, color: 'green' }}>{Utils.numberWithCommas(price)} <Text style={style.textUnit}>{t('text.unit')}</Text></Text>
      </View>

    )
  }

  const renderItem = ({ item }) => {
    const { name, color, price } = item
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ width: 10, height: 10, backgroundColor: color, margin: 5 }} />
        <Text style={{ fontSize: 16 }}>{name}</Text>
      </View>
    )
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
    setFromDate(!isFromDate);
  };

  const toggleModalToDate = () => {
    setToDate(!isToDate);
  };

  return (
    <View style={style.container}>
      <View style={[style.container2, { marginTop: insets.top }]}>
        <View style={{ flexDirection: 'row', padding: 10, backgroundColor: Color.blue, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={style.text2}>{t('text.report')}</Text>
        </View>
        <View style={{ padding: 15, flexDirection: 'row', justifyContent: 'center', backgroundColor: 'white' }}>
          <Text style={style.textFromDate}>{t('from')}</Text>
          <TouchableOpacity onPress={toggleModalFromDate}>
            <Text style={style.textDate}> {fromDate ? momentFormat(fromDate) : momentFormat(new Date().getTime())}</Text>
          </TouchableOpacity>
          <Text style={style.textFromDate}> {t('to')} </Text>
          <TouchableOpacity onPress={toggleModalToDate}>
            <Text style={style.textDate}>{toDate ? momentFormat(toDate) : momentFormat(new Date().getTime())}</Text>
          </TouchableOpacity>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <Text style={[style.text,{color: Color.blue }]}>{t('text.expense')} {Utils.numberWithCommas(sumOUT)} <Text style={style.textUnit}>{t('text.unit')}</Text></Text>
            {
              listCT.length > 0 ?
                <View style={{
                  backgroundColor: Color.white,
                  paddingHorizontal: 10,
                }}>
                  <View
                    style={{
                      paddingVertical: 20,
                      flexDirection: 'row',

                      backgroundColor: Color.white
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
            <Text style={[style.text,{color: 'green'}]}>{t('text.income')} {Utils.numberWithCommas(sumIN)} <Text style={style.textUnit}>{t('text.unit')}</Text></Text>
            {
              listTT.length > 0 ?
                <View style={{
                  backgroundColor: 'white',
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
          <View style={style.borderCalendar}>
            <Calendar onDateChange={onFromDateChange} />
          </View>
        </Modal>
        <Modal isVisible={isToDate}>
          <View style={style.borderCalendar}>
            <Calendar onDateChange={onToDateChange} />
          </View>
        </Modal>


      </View>
    </View>
  )
}

export default Report;