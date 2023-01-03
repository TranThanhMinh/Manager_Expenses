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
    name: "Ăn uống"
  },
  {
    id: 1,
    name: "Cà phê"
  },
  {
    id: 2,
    name: "Hóa đơn điện"
  },
  {
    id: 3,
    name: "Hóa đơn nước"
  },
  {
    id: 4,
    name: "Hóa đơn điện thoại"
  },
  {
    id: 5,
    name: "Quần áo"
  },
  {
    id: 6,
    name: "Xăng dầu"
  },
  {
    id: 7,
    name: "Thuê nhà"
  },
  {
    id: 8,
    name: "Chi phí"
  },
  {
    id: 9,
    name: "Đi vay"
  },
  {
    id: 10,
    name: "Trả nợ"
  },
  {
    id: 11,
    name: "Cho vay"
  },
  {
    id: 12,
    name: "Thu nợ"
  },
  {
    id: 13,
    name: "Khác"
  },
]


module.exports = Utils;