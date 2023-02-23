import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, ScrollView } from 'react-native'
import * as Icon from "react-native-feather"
import { getListHistory } from "../../data/WalletServices";
import { Utils } from "../../common";
import style from "./style";
import { useIsFocused } from "@react-navigation/native";
import Pie from 'react-native-pie'
import moment from 'moment';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import CalendarPicker from 'react-native-calendar-picker';
import Modal from "react-native-modal";
import { updateWallet, addWallet, getListwalletDefault } from "../../data/WalletServices";
import {
  removeTask, getListExpensesFromDateToDate, deleteBorrow
} from "../../data/ExpensesServices ";

const Report = (props) => {
  const insets = useSafeAreaInsets();
  const [wallet, setWallet] = useState([]);
  const isVisible = useIsFocused();

  const [listExpenses, setListExpenses] = useState([])
  const [sumIN, setSumIN] = useState(0)
  const [sumOUT, setSumOUT] = useState(0)

  const [precent_money, setPrecentMoney] = useState(0)
  const [fromDate, setSelectedFromDate] = useState(0)
  const [toDate, setSelectedToDate] = useState(0)

  const [isFromDate, setFromDate] = useState(false);
  const [isToDate, setToDate] = useState(false);

  const [listCT, setListCt] = React.useState([]);
  const [listTT, setListTt] = React.useState([]);


  const [precent_ct1, setPrecentCt1] = useState(0)
  const [precent_ct2, setPrecentCt2] = useState(0)
  const [precent_ct3, setPrecentCt3] = useState(0)
  const [precent_ct4, setPrecentCt4] = useState(0)
  const [precent_ct5, setPrecentCt5] = useState(0)
  const [precent_ct6, setPrecentCt6] = useState(0)
  const [precent_ct7, setPrecentCt7] = useState(0)

  const [precent_tt1, setPrecentTt1] = useState(0)
  const [precent_tt2, setPrecentTt2] = useState(0)
  const [precent_tt3, setPrecentTt3] = useState(0)
  const [precent_tt4, setPrecentTt4] = useState(0)
  const [precent_tt5, setPrecentTt5] = useState(0)


  let list1 = []
  let list2 = []

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
    })
  }

  const isFound = (val) => {
    if (!list1.some(item => val.name == item.name)) {
      list1.push(val);
    } else {
      list1 = list1.filter(item => val.name != item.name);
      list1.push(val);
    }
  }

  const isFound2 = (val) => {
    if (!list2.some(item => val.name == item.name)) {
      list2.push(val);
    } else {
      list2.filter(item => val.name != item.name);
      list2.push(val);
    }

  }

  const filterDate = (list) => {
    setListExpenses(list)
    let sumIn = 0
    let sumOut = 0

    let ct1 = 0
    let ct2 = 0
    let ct3 = 0
    let ct4 = 0
    let ct5 = 0
    let ct6 = 0
    let ct7 = 0


    let tt1 = 0
    let tt2 = 0
    let tt3 = 0
    let tt4 = 0
    let tt5 = 0


    if (list.length == 0) {
      setSumIN(0)
      setSumOUT(0)
    } else {
      list.map((i) => {
        if (i.in_out == 0)
          sumOut = sumOut + parseFloat(i.price)
        else sumIn = sumIn + parseFloat(i.price)

        if (i.type == 1 || i.type == 2) {
          ct1 = ct1 + parseFloat(i.price)
          let item = {
            name: 'Ăn uống-cà phê',
            color: 'green',
            price: ct1
          }
          isFound(item)

        } else if (i.type == 3) {
          ct2 = ct2 + parseFloat(i.price)
          let item = {
            name: 'Đi chợ',
            color: 'red',
            price: ct2
          }

          isFound(item)

        } else if (i.type == 4 || i.type == 5) {
          ct3 = ct3 + parseFloat(i.price)
          let item = {
            name: 'Hoá đơn điện/nước-điện thoại',
            color: '#EBD22F',
            price: ct3
          }
          isFound(item)

        } else if (i.type == 6) {
          ct4 = ct4 + parseFloat(i.price)
          let item = {
            name: 'Quần áo',
            color: '#3B3538',
            price: ct4
          }
          isFound(item)

        } else if (i.type == 7 || i.type == 8 || i.type == 9) {
          ct5 = ct5 + parseFloat(i.price)
          let item = {
            name: 'Xăng dầu-Thuê nhà-Chi phí',
            color: 'blue',
            price: ct5
          }
          isFound(item)
        } else if (i.type == 10) {

          ct6 = ct6 + parseFloat(i.price)
          let item = {
            name: 'Khác',
            color: '#4A6BED',
            price: ct6
          }
          isFound(item)

        }
        else if (i.type == 13 || i.type == 14) {
          ct7 = ct7 + parseFloat(i.price)
          let item = {
            name: 'Trả nợ-Cho vay',
            color: '#56B332',
            price: ct7
          }
          isFound(item)
        }

        else if (i.type == 12) {
          tt1 = tt1 + parseFloat(i.price)
          let item = {
            name: 'Đi vay',
            color: 'green',
            price: tt1
          }
          isFound2(item)


        } else if (i.type == 15) {
          tt2 = tt2 + parseFloat(i.price)
          let item = {
            name: 'Thu nợ',
            color: 'red',
            price: tt2
          }
          isFound2(item)

        }
        else if (i.type == 17) {
          tt3 = tt3 + parseFloat(i.price)
          let item = {
            name: 'Tiền lương',
            color: '#EBD22F',
            price: tt3
          }
          isFound2(item)

        } else if (i.type == 18 || i.type == 19) {
          tt4 = tt4 + parseFloat(i.price)
          let item = {
            name: 'Tiền lãi-Tiền thưởng',
            color: '#3B3538',
            price: tt4
          }
          isFound2(item)

        } else if (i.type == 20) {
          tt5 = tt5 + parseFloat(i.price)
          let item = {
            name: 'Khác',
            color: 'blue',
            price: tt5
          }
          isFound2(item)
        }

      })


      setListCt(list1)
      setListTt(list2)
      let prencent_money = 100 - (sumOut / sumIn) * 100
      //let prencent_Out = 100 - (parseFloat(wallet[0].money) / sumIn) * 100

      let prencent_ct1 = (ct1 / sumOut) * 100
      let prencent_ct2 = (ct2 / sumOut) * 100
      let prencent_ct3 = (ct3 / sumOut) * 100
      let prencent_ct4 = (ct4 / sumOut) * 100
      let prencent_ct5 = (ct5 / sumOut) * 100
      let prencent_ct6 = (ct6 / sumOut) * 100
      let prencent_ct7 = (ct7 / sumOut) * 100



      let prencent_tt1 = (tt1 / sumIn) * 100
      let prencent_tt2 = (tt2 / sumIn) * 100
      let prencent_tt3 = (tt3 / sumIn) * 100
      let prencent_tt4 = (tt4 / sumIn) * 100
      let prencent_tt5 = (tt5 / sumIn) * 100

      setSumIN(sumIn)
      setSumOUT(sumOut)
      //setPrecentSumOUT(prencent_Out)
      setPrecentMoney(prencent_money)
      setPrecentCt1(prencent_ct1)
      setPrecentCt2(prencent_ct2)
      setPrecentCt3(prencent_ct3)
      setPrecentCt4(prencent_ct4)
      setPrecentCt5(prencent_ct5)
      setPrecentCt6(prencent_ct6)
      setPrecentCt7(prencent_ct7)

      setPrecentTt1(prencent_tt1)
      setPrecentTt2(prencent_tt2)
      setPrecentTt3(prencent_tt3)
      setPrecentTt4(prencent_tt4)
      setPrecentTt5(prencent_tt5)
    }

  }

  const momentFormat = (date) => {
    return moment(date).format("DD-MM-YYYY")
  }


  const renderItem2 = ({ item }) => {
    const { name, color, price } = item
    return (

      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 5 }}>
        <Text style={{ fontSize: 12, width: 170 }}>{name}</Text>
        <Text style={{ fontSize: 15 }}>{Utils.numberWithCommas(price)} VND</Text>
      </View>
    )
  }

  const renderItem = ({ item }) => {
    const { name, color, price } = item
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ width: 10, height: 10, backgroundColor: color, margin: 5 }} />
        <Text style={{ fontSize: 10 }}>{name}</Text>
      </View>
    )
  }

  const ItemDivider = () => {
    return (
      <View
        style={{
          height: 0.5,
          width: "100%",
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
        <View style={{ flexDirection: 'row', padding: 5, backgroundColor: '#50a1e3', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={[style.text2, { color: 'white' }]}>Báo cáo</Text>
        </View>
        <View style={{ padding: 10, flexDirection: 'row', justifyContent: 'center', backgroundColor: 'white' }}>
          <Text style={{ fontWeight: 'bold', color: '#50a1e3' }}>Từ</Text>
          <TouchableOpacity onPress={toggleModalFromDate}>
            <Text style={{ fontWeight: 'bold' }}> {fromDate ? momentFormat(fromDate) : momentFormat(new Date().getTime())}</Text>
          </TouchableOpacity>
          <Text style={{ fontWeight: 'bold', color: '#50a1e3' }}> Đến </Text>
          <TouchableOpacity onPress={toggleModalToDate}>
            <Text style={{ fontWeight: 'bold' }}>{toDate ? momentFormat(toDate) : momentFormat(new Date().getTime())}</Text>
          </TouchableOpacity>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Text style={{ fontWeight: 'bold', color: 'red', margin: 10 }}>CHI TIỀN: {Utils.numberWithCommas(sumOUT)} VND</Text>
          {
            listCT.length > 0 ?
              <View style={{
                backgroundColor: 'white',
                paddingHorizontal: 10,
              }}>
                <View
                  style={{
                    paddingVertical: 20,
                    flexDirection: 'row',

                    backgroundColor: 'white'
                  }}
                >
                  <Pie
                    radius={80}
                    innerRadius={50}
                    sections={[
                      {
                        percentage: precent_ct1,
                        color: 'green',
                      },
                      {
                        percentage: precent_ct2,
                        color: 'red',
                      },
                      {
                        percentage: precent_ct3,
                        color: '#EBD22F',
                      },
                      {
                        percentage: precent_ct4,
                        color: '#3B3538',
                      },
                      {
                        percentage: precent_ct5,
                        color: 'blue',
                      },
                      {
                        percentage: precent_ct6,
                        color: '#4A6BED',
                      },

                      {
                        percentage: precent_ct7,
                        color: '#56B332',
                      },
                    ]}
                    strokeCap={'butt'}
                  />
                  <View style={{ marginLeft: 10 }}>
                    <FlatList
                      data={listCT}
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
          <Text style={{ fontWeight: 'bold', color: 'green', margin: 10 }}>THU TIỀN: {Utils.numberWithCommas(sumIN)} VND</Text>
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

                    sections={[
                      {
                        percentage: precent_tt1,
                        color: 'green',
                      },
                      {
                        percentage: precent_tt2,
                        color: 'red',
                      },
                      {
                        percentage: precent_tt3,
                        color: '#EBD22F',
                      },
                      {
                        percentage: precent_tt4,
                        color: '#3B3538',
                      },
                      {
                        percentage: precent_tt5,
                        color: 'blue',
                      },

                    ]}
                    strokeCap={'butt'}

                  />


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
                    renderItem={renderItem2}
                    ItemSeparatorComponent={ItemDivider} />
                </View>
              </View> : null
          }
        </View>
        </ScrollView>
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

export default Report;