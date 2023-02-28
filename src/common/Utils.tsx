import { NavigationActions } from 'react-navigation';
import { Dimensions, Platform } from 'react-native'

// Acquiring the plugin 
const moment = require('moment');


function Utils() { };

// Utils.formatDateDefault = function (timestamp) {
//     return moment(timestamp).local().format("YYYY/MM/DD HH:mm");
// }

// Utils.formatTimeDefault = function (timestamp) {
//    return moment(timestamp).local().format("HH:mm");
// }

Utils.formatTimeDefault = (timestamp) => {
  return moment(timestamp).format("HH:mm")
}
Utils.formatDateDefault = (timestamp) => {
  return moment(timestamp).format("DD-MM-YYYY")
}
Utils.getTimes = () => Math.floor(new Date().getTime() / 1000)

Utils.numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

Utils.session = [{
  id: 0,
  name: "Buổi sáng"
}, {
  id: 1,
  name: "Buổi trưa"
}, {
  id: 2,
  name: "Buổi tối"
}]

Utils.getName =(id)=>{
 let item = Utils.TypeExpenses.filter(item => item.id == id)
  return item[0].name
}

Utils.TypeExpenses = [
  {
    id: 0,
    name: "---Chi tiền---",
    type:'0'
  },
  {
    id: 1,
    name: "Ăn uống",
    type:'0'
  },
  {
    id: 2,
    name: "Cà phê",
    type:'0'
  },
  {
    id: 3,
    name: "Đi chợ",
    type:'0'
  },
  {
    id: 4,
    name: "Hóa đơn điện/nước",
    type:'0'
  },
  {
    id: 5,
    name: "Hóa đơn điện thoại",
    type:'0'
  },
  {
    id: 6,
    name: "Quần áo",
    type:'0'
  },
  {
    id: 7,
    name: "Xăng dầu",
    type:'0'
  },
  {
    id: 8,
    name: "Thuê nhà",
    type:'0'
  },
  {
    id: 9,
    name: "Chi phí",
    type:'0'
  },
  {
    id: 10,
    name: "Khác",
    type:'0'
  },
  {
    id: 11,
    name: "---Vay Nợ---",
    type:'0'
  },
  {
    id: 12,
    name: "Đi vay",
    type:'1'
  },
  {
    id: 13,
    name: "Trả nợ",
    type:'0'
  },
  {
    id: 14,
    name: "Cho vay",
    type:'0'
  },
  {
    id: 15,
    name: "Thu nợ",
    type:'1'
  },
  {
    id: 16,
    name: "---Thu Tiền---",
    type:'0'
  },
  {
    id: 17,
    name: "Tiền lương",
    type:'1'
  },
  {
    id: 18,
    name: "Tiền lãi",
    type:'1'
  },
  {
    id: 19,
    name: "Tiền thưởng",
    type:'1'
  },
  {
    id: 20,
    name: "Khác",
    type:'1'
  },
]


module.exports = Utils;