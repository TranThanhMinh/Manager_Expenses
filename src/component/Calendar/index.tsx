import React from "react";
import {View} from 'react-native'
import CalendarPicker from 'react-native-calendar-picker';
import { Utils,String } from "@common";
import { useTranslation, initReactI18next } from "react-i18next";

const Calendar =(props)=>{
    const {t} = useTranslation()

   const listDay = [t('textcn'),t('textt2'), t('textt3'), t('textt4'), t('textt5'), t('textt6'), t('textt7')]
   const listMonths =[t('textmonth1'), t('textmonth2'), t('textmonth3'), t('textmonth4'), t('textmonth5'), t('textmonth6'), t('textmonth7'), t('textmonth8'), t('textmonth9'), t('textmonth10'), t('textmonth11'), t('textmonth12')]

    return(
        <View>
             <CalendarPicker
              previousTitle = {t('before')}
              nextTitle={t('after')}
              selectMonthTitle={t('text.select.month')}
              selectYearTitle ={t('text.select.year')}
              weekdays={listDay}
              months={listMonths}
              onDateChange={props.onDateChange}
            />
        </View>
    )
}

export default Calendar;