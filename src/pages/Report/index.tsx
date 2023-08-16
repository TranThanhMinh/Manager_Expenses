import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, ScrollView, Dimensions } from 'react-native'
import * as Icon from "react-native-feather"
import { getListHistory } from "../../data/WalletServices";
import { Utils } from "../../common";
import style from "./style";
import { useIsFocused } from "@react-navigation/native";
import Pie from 'react-native-pie'
import moment from 'moment';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Rect, Text as TextSVG, Svg } from "react-native-svg";
import CalendarPicker from 'react-native-calendar-picker';
import Modal from "react-native-modal";
import { updateWallet, addWallet, getListwalletDefault } from "../../data/WalletServices";
import {
  removeTask, getListExpensesFromDateToDate, deleteBorrow
} from "../../data/ExpensesServices ";
import { BarChart, LineChart, PieChart } from "react-native-gifted-charts";

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
  const [isInfo, setInfo] = useState(false);

  const [listCT, setListCt] = React.useState([]);
  const [listTT, setListTt] = React.useState([]);

  let list1 = []
  let list2 = []

  const { width } = Dimensions.get("window");
  const height = 256;


  const chartConfig = {
    backgroundGradientFrom: "#50a1e3",
    backgroundGradientTo: "#50a1e3",
    color: (opacity = 1) => `white`,
    strokeWidth: 5, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
  };

  let [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0, visible: false, value: 0 })

  // const data = {
  //   labels: ["18/8/2023", "20/8/2023"],
  //   datasets: [
  //     {
  //       data: [-10, -2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
  //     }
  //   ]
  // };

  const ptData = [
    { value: 1700000, date: '1 Apr 2022' },
    { value: 1800000, date: '2 Apr 2022' },
    { value: 50000, date: '3 Apr 2022' },
    { value: 300000, date: '3 Apr 2022' },
    { value: 20000000, date: '3 Apr 2022' },

  ];



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

          } else if (i.type == 18) {
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
          <Text style={{ fontSize: 12, color: 'black' }}>{name}</Text>
          <Text style={{ fontSize: 12, color: color }}> ({prencent.toFixed(2)})%</Text>

        </View>
        <Text style={{ fontSize: 15, color: 'red' }}>{Utils.numberWithCommas(price)} VND</Text>
      </View>

    )
  }

  const renderItem3 = ({ item }) => {
    const { name, color, price } = item
    let prencent = (price / sumIN) * 100
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 5 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
          <Text style={{ fontSize: 12, color: 'black' }}>{name}</Text>
          <Text style={{ fontSize: 12, color: color }}> ({prencent.toFixed(2)})%</Text>

        </View>
        <Text style={{ fontSize: 15, color: 'green' }}>{Utils.numberWithCommas(price)} VND</Text>
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
                      sections={listCT}
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
                      sections={listTT}
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
                      renderItem={renderItem3}
                      ItemSeparatorComponent={ItemDivider} />
                  </View>
                </View>
                : null
            }

            <View>
              <LineChart
                areaChart
                data={ptData}
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
               // yAxisTextNumberOfLines={1}
                // yAxisLabelWidth={40}
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
                        style={{

                          width: 120,
                          justifyContent: 'center',
                          paddingVertical:5,
                          borderRadius: 16,
                          backgroundColor: 'white',
                          // marginTop: -30,
                          // marginLeft: -40,
                        }}>
                        <Text
                          style={{
                            fontSize: 14,
                            marginBottom: 6,
                            textAlign: 'center',
                         
                          }}>
                          {items[0].date}
                        </Text>

                        <View
                         >
                          <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>
                            {'$' + Utils.numberWithCommas(items[0].value)}
                          </Text>
                        </View>
                      </View>
                    );
                  },
                }}
              />
            </View>
            <View>
              {/* <LineChart
                bezier
                data={data}
                width={width}
                height={height}
                yAxisLabel="$"
                yAxisSuffix="k"
                chartConfig={chartConfig}
             
                verticalLabelRotation={10}
                decorator={()=>{
                  return tooltipPos.visible ? <View>
                        <Svg>
                            <Rect x={tooltipPos.x - 15} 
                                y={tooltipPos.y + 10} 
                                strokeWidth="3"
                                width="40" 
                                height="60"
                             
                            
                                fill="rgb(0,0,255)"
                            
                                stroke="rgb(0,0,0)"
                             />
                                <TextSVG
                                    x={tooltipPos.x + 5}
                                    y={tooltipPos.y + 30}
                                    fill="white"
                                    fontSize="16"
                                    fontWeight="bold"
                                    textAnchor="middle">
                                    {tooltipPos.value}
                                </TextSVG>

                                <TextSVG
                                    x={tooltipPos.x + 5}
                                    y={tooltipPos.y + 60}
                                    fill="white"
                                    fontSize="16"
                                    fontWeight="bold"
                                    textAnchor="middle">
                                    {tooltipPos.value}
                                </TextSVG>
                        </Svg>
                    </View> : null
                }
                }
                onDataPointClick={(data) => {

                  let isSamePoint = (tooltipPos.x === data.x 
                                      && tooltipPos.y === data.y)

                  isSamePoint ? setTooltipPos((previousState) => {
                      return { 
                                ...previousState,
                                value: data.value,
                                visible: !previousState.visible
                             }
                  })
                      : 
                  setTooltipPos({ x: data.x, value: data.value, y: data.y, visible: true });

              }}
               
                formatXLabel={label => label.toUpperCase()}
              /> */}

            </View>
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