import React from "react";
import { View,Text } from 'react-native'
import CalendarPicker from 'react-native-calendar-picker';
import { Utils, String } from "@common";
import { useTranslation, initReactI18next } from "react-i18next";
import Color from "../../common/Color";

const Calendar = (props) => {
    const { t } = useTranslation()

    const listDay = [t('textcn'), t('textt2'), t('textt3'), t('textt4'), t('textt5'), t('textt6'), t('textt7')]
    const listMonths = [t('textmonth1'), t('textmonth2'), t('textmonth3'), t('textmonth4'), t('textmonth5'), t('textmonth6'), t('textmonth7'), t('textmonth8'), t('textmonth9'), t('textmonth10'), t('textmonth11'), t('textmonth12')]



    const customDayHeaderStylesCallback = ({dayOfWeek, month, year}) => {
        switch(dayOfWeek) { // can also evaluate month, year
          case 4: // Thursday
            return {
              style: {
                borderRadius: 12,
                backgroundColor: 'cyan',
              },
              textStyle: {
                color: 'blue',
                fontSize: 22,
                fontWeight: 'bold',
              }
            };
        }
      }

    const customDatesStylesCallback = date => {
        switch(date.isoWeekday()) {
          case 1: // Monday
            return {
              style:{
                backgroundColor: '#909',
              },
              textStyle: {
                color: '#0f0',
                fontWeight: 'bold',
              }
            };
          case 7: // Sunday
            return {
              textStyle: {
                color: 'red',
              }
            };
        }
      }


    return (
        <View>
            {/* <Text style={{borderRadius}} ></Text> */}
            <CalendarPicker
                previousTitle={t('before')}
                nextTitle={t('after')}
                selectMonthTitle={t('text.select.month')}
                selectYearTitle={t('text.select.year')}
                
                weekdays={listDay}
                months={listMonths}
                onDateChange={props.onDateChange}
                todayBackgroundColor= {Color.blue}
                backgroundColor={Color.blue}
                selectedDayColor={Color.white}
                selectedDayTextColor={Color.white}
                scaleFactor={375}
                textStyle={{
                    color: '#000000',
                    fontSize: 18,
                    
                }}
                // monthTitleStyle={{
                //     color:Color.blue,
                // }}
                // yearTitleStyle={{
                //     color:Color.blue,
                // }}
            />
        </View>
    )
}

export default Calendar;