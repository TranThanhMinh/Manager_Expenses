import React from "react";
import {View} from 'react-native'
import CalendarPicker from 'react-native-calendar-picker';
import { Utils,String } from "@common";

const Calendar =(props)=>{
    return(
        <View>
             <CalendarPicker
              previousTitle = {String.before}
              nextTitle={String.affter}
              weekdays={Utils.listDay}
              months={Utils.listMonths}
              onDateChange={props.onDateChange}
            />
        </View>
    )
}

export default Calendar;