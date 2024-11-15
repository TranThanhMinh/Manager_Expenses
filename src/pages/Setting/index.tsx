import React, { useState, useContext, useEffect } from 'react';
import { Text, View, TouchableOpacity, FlatList, Button, PermissionsAndroid, Alert, Platform } from 'react-native';
import style from './style';
import * as Icon from "react-native-feather"
import { Color } from '../../common';
import { useTranslation } from 'react-i18next';
import { Utils, String } from "@common";
import Modal from "react-native-modal";
import i18n from "i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColors, ThemeContext } from '@hooks'
import { useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { removeAll } from '../../data/ExpensesServices ';
import { updateWallet, getListwalletDefault } from "../../data/WalletServices";
import {
  addExpenses,  updateBorrow
} from "../../data/ExpensesServices ";
import { getListExpenses } from '../../data/ExpensesServices ';
import Banner from '../../component/Banner';
import { Linking } from 'react-native';
import Toast from 'react-native-simple-toast';
import XLSX from 'xlsx'
import Share from 'react-native-share';
import RNFS from 'react-native-fs';
import DocumentPicker from 'react-native-document-picker';


const Setting = ({ navigation, route }) => {
  const { t } = useTranslation()
  const insets = useSafeAreaInsets();
  const [visibleLanguage, setVisibleLanguage] = useState(false)
  const themeContext = useContext(ThemeContext)
  const { theme, setTheme } = useColors({ themeName: 'Light' })
  const [visibleColor, setVisibleColor] = useState(false);
  const [visibleRemove, setVisibleRemove] = useState(false);
  const [visibleExport, setVisibleExport] = useState(false);
  const [filePath, setFilePath] = useState('');
  const [wallet, setWallet] = useState();
  const [idWallet, setIdWallet] = useState('');
  const { colors } = useTheme()


  useEffect(() => {
    requestWritePermission()
    requestStoragePermission()
    getListwalletDefault(true).then(task => {
      if (task.length > 0) {
        setWallet(task[0])
        setIdWallet(task[0].id)
      }
    })

  }, [])

  const list = [
    {
      name: t('text.language'),
      icon: Icon.Globe,
      action: () => setVisibleLanguage(true),
      id: 'language'
    },
    {
      name: t('text.theme'),
      icon: Icon.Moon,
      action: () => setVisibleColor(true),
      id: 'theme'
    },
    {
      name: t('text.remove.data'),
      icon: Icon.Delete,
      action: () => setVisibleRemove(true),
      id: 'delete'
    },
    {
      name: t('text.revew.app'),
      icon: Icon.MessageSquare,
      action: () => Linking.openURL(String.link),
      id: 'theme'
    },
    {
      name: t('text.export'),
      icon: Icon.File,
      action: () => exportDataToExcel(),
      id: 'export'
    },
    {
      name: t('text.importexcel'),
      icon: Icon.Inbox,
      action: () => pickAndReadFile(),
      id: 'contact'
    },
  ]


  function changeTheme() {
    return (
      <Modal isVisible={visibleColor}>
        <View style={style.dialog}>
          <Text style={style.title}>{t('title.theme')}</Text>

          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={style.buttonLangagueVN} onPress={colorDark}>
              <Text style={style.textLangague}>{t('dark')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={style.buttonLangagueEN} onPress={colorLight}>
              <Text style={style.textLangague}>{t('light')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    )
  }


  function changeLanguge() {
    return (
      <Modal isVisible={visibleLanguage}>
        <View style={style.dialog}>
          <Text style={style.title}>{t('change_languge')}</Text>

          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={style.buttonLangagueVN} onPress={handleVN}>
              <Text style={style.textLangague}>{t('vietnam')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={style.buttonLangagueEN} onPress={handleEN}>
              <Text style={style.textLangague}>{t('english')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    )
  }


  const deleteData = () => {
    setVisibleRemove(false)
    removeAll().then(() => {
      updateWallet(wallet.default, 0)
      Toast.show(t('txt.removed'), Toast.LONG);
    })
  }

  function removeDatabase() {
    return (
      <Modal isVisible={visibleRemove}>
        <View style={style.dialog}>
          <Text style={style.title}>{t('text.remove.database')}</Text>

          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={style.buttonLangagueVN} onPress={deleteData}>
              <Text style={style.textLangague}>{t('text.remove.data.yes')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={style.buttonLangagueEN} onPress={() => setVisibleRemove(false)}>
              <Text style={style.textLangague}>{t('text.remove.data.no')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    )
  }


  const pickAndReadFile = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
  
      const filePath = result[0].uri;
      const fileContent = await RNFS.readFile(filePath, 'base64');
      const workbook = XLSX.read(fileContent, { type: 'base64' });
  
      const sheetName = workbook.SheetNames[0];
      const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
  
      

      sheetData.map((item)=>{
        console.log(item);
        insertExpenses(item)
      })
      Toast.show(t('txt.done'), Toast.LONG);

    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        console.log('User canceled the file picker.');
      } else {
        console.error('Error picking file:', error);
      }
    }
  };



  const insertExpenses =(item)=>{
    const {created_date,created_time,descripbe,id,id_borrow,id_wallet,in_out,price,price_borrow,type,type_borrow} = item
    addExpenses(id, created_time,
      created_date,
      descripbe, price, price_borrow, type, type_borrow, id_borrow, idWallet, in_out).then(task => {

      if (in_out == 0)
        updateWallet(wallet.default, wallet.money - parseFloat(price))
      else updateWallet(wallet.default, wallet.money + parseFloat(price))
      if (type == 13 || type == 15) {
        updateBorrow(idBorrow, priceBorrow).then(task => {
          // props.goToBack()
        })
      } else {
        // props.goToBack()
      }
   
    })
  }

  function exportFile() {
    return (
      <Modal isVisible={visibleExport}>
        <View style={style.dialog}>
          <Text style={style.title}>File path: {filePath}</Text>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={style.buttonLangagueVN} onPress={shareToFiles}>
              <Text style={style.textLangague}>{t('text.export.shared')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={style.buttonLangagueEN} onPress={() => setVisibleExport(false)}>
              <Text style={style.textLangague}>{t('text.export.close')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    )
  }


  const colorDark = () => {
    saveColor('Dark')

  }


  const colorLight = () => {
    saveColor('Light')

  }

  const shareToFiles = async () => {
    const shareOptions = {
      title: 'Share file',
      failOnCancel: false,
      saveToFiles: true,
      urls: [`file://${filePath}`], // base64 with mimeType or path to local file
    };

    // If you want, you can use a try catch, to parse
    // the share response. If the user cancels, etc.
    try {
      const ShareResponse = await Share.open(shareOptions);
      console.log('Result =>', ShareResponse);
      setVisibleExport(false)
      Toast.show(t('text.export.success'), Toast.LONG);
      // setResult(JSON.stringify(ShareResponse, null, 2));
    } catch (error) {
      console.log('Error =>', error);
      Toast.show(t('text.export.error'), Toast.LONG);
      setVisibleExport(false)
      //   setResult('error: '.concat(getErrorString(error)));
    }
  };

  const requestWritePermission = async () => {
    if (Platform.OS === 'android' && Platform.Version < 30) { // Android 10 and below
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                    title: "Storage Permission",
                    message: "App needs access to your storage to save files",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK",
                }
            );
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        } catch (err) {
            console.warn(err);
            return false;
        }
    }
    return true; // No permission needed for iOS or Android 11+
};

  const requestStoragePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: "Storage Permission",
            message: "App needs access to your storage to read files",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK"
          }
        );

        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.log('minh tran', err);
        return false;
      }
    }
    return true; // iOS does not need runtime permission for file access
  };

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

  // function to handle exporting
  const exportDataToExcel = async () => {
    const hasPermission = await requestWritePermission();
    if (!hasPermission) {
      console.log("Permission denied");
      return;
    }
    // require the module
    var RNFS = require('react-native-fs');
    getListExpenses().then(listExpenses => {

      if (listExpenses.length > 0) {
        let list = []
        listExpenses.map(item => {
          let sample_data_to_export = {
            created_date: item.created_date, created_time: item.created_time,
            descripbe: item.descripbe, id: item.id, id_borrow: item.id_borrow, id_wallet: item.id_wallet,
            in_out: item.in_out, price: item.price, price_borrow: item.price_borrow, type: item.type, type_borrow: item.type_borrow
          };
          list.push(sample_data_to_export)
        })
        let wb = XLSX.utils.book_new();
        let ws = XLSX.utils.json_to_sheet(list)
        XLSX.utils.book_append_sheet(wb, ws, "Users")
        const wbout = XLSX.write(wb, { type: 'binary', bookType: "xlsx" });
        const filePath = `${RNFS.DocumentDirectoryPath}/my_exported_file.xlsx`;
        // Write generated excel to Storage
        RNFS.writeFile(filePath, wbout, 'ascii').then((r) => {
        const filePath = `${RNFS.DocumentDirectoryPath}/my_exported_file.xlsx`;
         //  console.log('Success', filePath)
          setFilePath(filePath)
          setVisibleExport(true)
        }).catch((e: any) => {
          console.log('Error', e);
        });

      } else {
        Toast.show(t('txt.no.data'), Toast.LONG);
      }
    })


  }

  const saveColor = (color) => {
    try {
      AsyncStorage.setItem("color", color);
      setTheme(color)
      themeContext.toggleTheme()
    } catch (error) {
      console.log("color error 2")
    }
    setVisibleColor(false)
  }

  const handleEN = async () => {
    global.multilanguge = 'en'
    saveLanguge(global.multilanguge)
    setVisibleLanguage(false)
    i18n.changeLanguage(global.multilanguge)

    let language = await AsyncStorage.getItem("language");
    console.log('language', language)
  };

  const handleVN = () => {
    global.multilanguge = 'vi';
    saveLanguge(global.multilanguge)
    i18n.changeLanguage(global.multilanguge)
    setVisibleLanguage(false)
  };


  const saveLanguge = (language) => {
    try {
      AsyncStorage.setItem("language", language);
    } catch (error) {

    }
  }

  const Item = ({ item, index }) => {
    const { name, icon, action } = item
    const ItemIcon = icon
    const firstItem = index == 0
    const lastItem = index == list.length - 1
    return (
      <TouchableOpacity activeOpacity={0.7} key={index} style={[{ backgroundColor: colors.viewBackground, marginVertical: 4 },
      firstItem && { borderTopLeftRadius: 10, borderTopRightRadius: 10 },
      lastItem && { borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }]}
        onPress={item.action}>
        <View style={style.item}>
          <View style={[style.bgIcon, { backgroundColor: colors.background }]}>
            <ItemIcon strokeWidth={1} stroke={Color.blue} />
          </View>
          <View style={style.bgName}>
            <Text style={[style.text, { color: colors.title }]}>{name}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }


  return (

    <View style={[style.container]}>
      <View style={[style.container2, { marginTop: insets.top, backgroundColor: colors.background }]}>
        <View style={{ flexDirection: 'row', padding: 10, backgroundColor: Color.blue, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={style.text2}>{t('text.setting')}</Text>
        </View>
        <Banner />
        <FlatList
          data={list}
          style={style.bgList}
          renderItem={Item} />

        {changeLanguge()}
        {changeTheme()}
        {removeDatabase()}
        {exportFile()}
        <View>
          <Text style={style.version}>{t('text.version')} 1.0.1</Text>
        </View>
      </View>

    </View>

  )
}
export default Setting;