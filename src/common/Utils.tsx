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
  return moment(timestamp * 1000).format("HH:mm")
}
Utils.formatDateDefault = (timestamp) => {
  return moment(timestamp * 1000).format("DD-MM-YYYY")
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

Utils.TypeExpenses = [
  {
    id: 0,
    name: "Ăn uống",
    type:'0'
  },
  {
    id: 1,
    name: "Cà phê",
    type:'0'
  },
  {
    id: 2,
    name: "Hóa đơn điện",
    type:'0'
  },
  {
    id: 3,
    name: "Hóa đơn nước",
    type:'0'
  },
  {
    id: 4,
    name: "Hóa đơn điện thoại",
    type:'0'
  },
  {
    id: 5,
    name: "Quần áo",
    type:'0'
  },
  {
    id: 6,
    name: "Xăng dầu",
    type:'0'
  },
  {
    id: 7,
    name: "Thuê nhà",
    type:'0'
  },
  {
    id: 8,
    name: "Chi phí",
    type:'0'
  },
  {
    id: 9,
    name: "Đi vay",
    type:'1'
  },
  {
    id: 10,
    name: "Trả nợ",
    type:'0'
  },
  {
    id: 11,
    name: "Cho vay",
    type:'0'
  },
  {
    id: 12,
    name: "Thu nợ",
    type:'1'
  },
  {
    id: 13,
    name: "Tiền lương",
    type:'1'
  },
  {
    id: 14,
    name: "Tiền lãi",
    type:'1'
  },
  {
    id: 15,
    name: "Tiền thưởng",
    type:'1'
  },
]


module.exports = Utils;