import React, { useEffect, useState, } from "react";
import { View, Image, TextInput, TouchableOpacity, Text } from "react-native";
import style from "./style";
import {
  addExpenses, getListExpensesBorrow, getListExpensesBorrow2, updateTask, updateBorrow, updateBorrow2,
  removeTask, deleteBorrow
} from "../../data/ExpensesServices ";
import { getListHistory } from "../../data/WalletServices";
import moment from 'moment';
import SelectDropdown from 'react-native-select-dropdown'
import urid from 'urid';
import { Utils, Color, String } from "../../common"
import * as Icon from "react-native-feather"
import Calendar from "../../component/Calendar";
import Modal from "react-native-modal";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation, initReactI18next } from "react-i18next";
import { useTheme } from "react-native-paper";
import { BannerAd, BannerAdSize, TestIds, InterstitialAd, AdEventType } from 'react-native-google-mobile-ads';
import Toast from 'react-native-simple-toast';
import { updateWallet, addWallet, getListwalletDefault } from "../../data/WalletServices";

const adUnitId = String.inters;

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing'],
});

const AddExpenses = (props) => {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation()
  const { colors } = useTheme()
  let item = props.item
  const [type, setType] = useState(1)
  const [isType, setIsType] = useState(true)
  const [typeBorrow, setTypeBorrow] = useState(0)
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
  const [inOutChange, setInOutChange] = useState(0)
  const [wallet, setWallet] = useState();
  const [money, setMoney] = useState(0);

  const [loaded, setLoaded] = useState(false);

  // No advert ready to show yet
  // if (!loaded) {
  //   return null;
  // }

  useEffect(() => {

    getListwalletDefault(true).then(task => {
      if (task.length > 0) {
        setWallet(task[0])
        if (!item.add) {
          setEdit(false)
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
          setInOutChange(item.item.in_out)
          setDate(item.item.created_date)
          if (item.item.type == 13) {
            getListExpensesBorrow(12).then(stask => {
              setListBorrow(stask)
              let price = parseFloat(stask[item.item.type_borrow].price_borrow) + parseFloat(item.item.price)
              setMoney(price)
            })
          } else if (item.item.type == 15) {
            getListExpensesBorrow(14).then(stask => {
              setListBorrow(stask)
              let price = parseFloat(stask[item.item.type_borrow].price_borrow) + parseFloat(item.item.price)
              setMoney(price)
            })
          }
        } else {
          setDate(new Date().getTime())
          setIdWallet(task[0].id)
        }
      }


    })



  }, [])


  useEffect(() => {
    setTimeout(() => {
      const unsubscribe = interstitial.addAdEventListener(AdEventType.LOADED, () => {
        setLoaded(true);
        interstitial.show()
      });
      // Start loading the interstitial straight away
      interstitial.load();
      // Unsubscribe from events on unmount
      return unsubscribe;
    }, 2000);
  }, []);

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
      } else if (type == 15) {
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
            console.log('updateWallet', wallet)
            if (inOut == 0)
              updateWallet(wallet.default, wallet.money - parseFloat(price))
            else updateWallet(wallet.default, wallet.money + parseFloat(price))
            if (type == 13 || type == 15) {
              updateBorrow(idBorrow, priceBorrow).then(task => {
                // props.goToBack()
              })
            } else {
              // props.goToBack()
            }
            Toast.show(t('txt.done'), Toast.LONG);
            setDescripbe('')
            setPrice('')
          })
      }
      else {
        let updatedate = moment(momentFormat(date), "DD-MM-YYYY").toDate().getTime()
        if (inOutChange == inOut) {
          if (inOut == 0)
            updateWallet(wallet.default, wallet.money + (parseFloat(price2) - parseFloat(price)))
          else updateWallet(wallet.default, wallet.money + (parseFloat(price) - parseFloat(price2)))
        } else {
          if (inOut == 0)
            updateWallet(wallet.default, wallet.money - (parseFloat(price2) + parseFloat(price)))
          else updateWallet(wallet.default, wallet.money + (parseFloat(price) + parseFloat(price2)))
        }

        if (type == 13 || type == 15) {
          updateBorrow(idBorrow, priceBorrow - priceBorrow2)
          updateTask(id, descripbe, price, priceBorrow, type, updatedate, inOut).then(task => {
            props.goToBack()
          })
        } else if (type == 12 || type == 14) {
          let paid = 0
          getListHistory(id).then(task => {
            task.map(item => {
              paid = paid + parseFloat(item.price)
            })
            updateTask(id, descripbe, price, parseFloat(price) - paid, type, updatedate, inOut).then(task => {
              props.goToBack()
            })
          })
        } else updateTask(id, descripbe, price, priceBorrow, type, updatedate, inOut).then(task => {
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
        <View style={{ backgroundColor: colors.viewBackground, borderRadius: 10 }}>
          <Calendar onDateChange={onDateChange} />
        </View>
      </Modal>
    )
  }

  return (
    <View style={style.container}>
      <View style={[style.container2, { marginTop: insets.top, backgroundColor: colors.background }]}>
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: Color.blue, padding: 10 }} onPress={() => props.goToBack()}>
          <Icon.ArrowLeft stroke={'white'} />
          <Text style={{ marginLeft: 10, color: 'white', fontSize: 20, fontWeight: 'bold' }}>{t('daily_transaction')}</Text>
        </TouchableOpacity>

        <View style={[style.body, { backgroundColor: colors.viewBackground }]}>
          <TouchableOpacity style={style.combobox} onPress={toggleModalToDate}>
            <Icon.Calendar stroke={Color.blue} />
            <Text style={[style.text2, { height: 20, fontSize: 18, color: colors.title }]}> {date ? momentFormat(date) : momentFormat(new Date().getTime())}</Text>
            {/* <Icon.Edit stroke={Color.blue} width={20} height={20} /> */}
          </TouchableOpacity>
          <View style={[style.combobox, { marginTop: 5 }]}>
            <Icon.AlignLeft stroke={Color.blue} />
            <SelectDropdown
              data={Utils.TypeExpenses}
              disabled={edit}
              disableAutoScroll={false}
              defaultButtonText={t(Utils.TypeExpenses[type].name)}
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
                        <Text style={[style.dropdown1RowTxtStyle, { color: colors.title }]}>{t(item.name)}</Text>
                        : <Text style={[style.dropdown1RowTxtStyleTitle, { color: colors.title }]}>{t(item.name)}</Text>
                    }
                  </View>
                );
              }}

              buttonTextAfterSelection={(selectedItem, index) => {
                setType(selectedItem.id)
                setInOut(parseInt(selectedItem.type))
                return t(selectedItem.name)
              }}
              rowTextForSelection={(item, index) => {
                return t(item.name)
              }}
              buttonStyle={[!isType ? style.dropdown1BtnStyleFalse : style.dropdown1BtnStyle, { backgroundColor: colors.viewBackground }]}
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
          {
            listBorrow.length > 0 ? (
              <View style={style.combobox}>
                <Icon.Sidebar stroke={Color.blue} />
                <SelectDropdown
                  data={listBorrow}
                  disabled={edit}
                  defaultButtonText={listBorrow[typeBorrow].descripbe + " - " + Utils.numberWithCommas(edit ? money : listBorrow[typeBorrow].price_borrow) + t('text.unit')}
                  onSelect={(selectedItem, index) => {
                    setIdBorrow(selectedItem.id)
                    setTypeBorrow(index)
                    setMoney(selectedItem.price_borrow)
                  }}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    setMoney(selectedItem.price_borrow)
                    return (selectedItem.descripbe + " - " + Utils.numberWithCommas(selectedItem.price_borrow) + t('text.unit'))
                  }}
                  rowTextForSelection={(item, index) => {
                    return (item.descripbe + " - " + Utils.numberWithCommas(item.price_borrow) + t('text.unit'))
                  }}

                  renderCustomizedRowChild={(item, index) => {
                    return (
                      <View><Text style={[style.dropdown1RowTxtStyle, { color: colors.title }]}>{item.descripbe + " - " + Utils.numberWithCommas(item.price_borrow) + t('text.unit')}</Text>
                      </View>
                    );
                  }}
                  buttonStyle={[style.dropdown1BtnStyle, { backgroundColor: colors.viewBackground, }]}
                  buttonTextStyle={[style.dropdown1BtnTxtStyle, { color: colors.title }]}
                  renderDropdownIcon={isOpened => {
                    return !edit ? isOpened ? <Icon.ChevronUp stroke={Color.blue} /> : <Icon.ChevronDown stroke={Color.blue} /> : null
                  }}
                  dropdownIconPosition={'right'}
                  dropdownStyle={style.dropdown1DropdownStyle}
                  rowStyle={[style.dropdown1RowStyle, { backgroundColor: colors.viewBackground, }]}
                  rowTextStyle={style.dropdown1RowTxtStyle2}
                />
              </View>
            ) : null
          }
          <View style={style.combobox}>
            <Icon.Edit3 stroke={Color.blue} />
            <TextInput style={[style.textInput, { borderColor: !isDescripbe ? 'red' : '#444', backgroundColor: colors.viewBackground, color: colors.title }]} value={descripbe} placeholder={t('text.description')} placeholderTextColor={Color.gray2} onChangeText={(text) => { setDescripbe(text), setIsDescripbe(true) }} />
          </View>
          <View style={style.combobox}>
            <Icon.DollarSign stroke={Color.blue} />
            <TextInput style={[style.textInput, { borderColor: !isPrice ? 'red' : '#444', backgroundColor: colors.viewBackground, color: colors.title }]} value={Utils.numberWithCommas(price)} placeholder={t('text.price')} placeholderTextColor={Color.gray2} keyboardType="numeric"
              onChangeText={(text) => {
                setIsPrice(true),
                  type == 13 || type == 15 ?
                    parseFloat(text.replace(/[^0-9]/g, '')) > money ? null : setPriceBorrow(parseFloat(text.replace(/[^0-9]/g, '')))
                    :
                    setPriceBorrow(parseFloat(text.replace(/[^0-9]/g, ''))),
                  type == 13 || type == 15 ?
                    parseFloat(text.replace(/[^0-9]/g, '')) > money ? console.log('haha', text, money) : setPrice(text.replace(/[^0-9]/g, ''))
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
                    <Text style={[style.button, { color: 'white' }]}> {t('button.add')} </Text>
                    :
                    <Text style={[style.button, { color: 'white' }]}> {t('button.update')} </Text>
                  }
                </TouchableOpacity>
              ) :
                (
                  <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
                    <TouchableOpacity style={style.btnDelete} onPress={handleRemove}>
                      <Icon.Trash2 stroke={'red'} width={20} height={20} />
                      <Text style={[style.button, { color: 'red' }]}>  {t('button.delete')} </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={style.btnUpdate} onPress={handleAdd}>
                      <Icon.Save stroke={'white'} width={20} height={20} />
                      <Text style={[style.button, { color: 'white' }]}> {t('button.update')} </Text>
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