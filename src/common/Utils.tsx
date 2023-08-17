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

Utils.listDay = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy']
Utils.listMonths =['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12']

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


export const bezierCommand = (
  point: Array<number>,
  i: number,
  a: Array<Array<number>>,
) => {
  // start control point
  const [cpsX, cpsY] = controlPoint(a[i - 1], a[i - 2], point);
  // end control point
  const [cpeX, cpeY] = controlPoint(point, a[i - 1], a[i + 1], true);
  return `C ${cpsX},${cpsY} ${cpeX},${cpeY} ${point[0]},${point[1]}`;
};

const controlPoint = (
  current: Array<number>,
  previous: Array<number>,
  next: Array<number>,
  reverse?: any,
) => {
  // When 'current' is the first or last point of the array
  // 'previous' or 'next' don't exist.
  // Replace with 'current'
  const p = previous || current;
  const n = next || current;
  // The smoothing ratio
  const smoothing = 0.2;
  // Properties of the opposed-line
  const o = line(p, n);
  // If is end-control-point, add PI to the angle to go backward
  const angle = o.angle + (reverse ? Math.PI : 0);
  const length = o.length * smoothing;
  // The control point position is relative to the current point
  const x = current[0] + Math.cos(angle) * length;
  const y = current[1] + Math.sin(angle) * length;
  return [x, y];
};

const line = (pointA: Array<number>, pointB: Array<number>) => {
  const lengthX = pointB[0] - pointA[0];
  const lengthY = pointB[1] - pointA[1];
  return {
    length: Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)),
    angle: Math.atan2(lengthY, lengthX),
  };
};

export const svgPath = (points: Array<Array<number>>, command: Function) => {
  // build the d attributes by looping over the points
  const d = points.reduce(
    (acc, point, i, a) =>
      i === 0
        ? // if first point
          `M ${point[0]},${point[1]}`
        : // else
          `${acc} ${command(point, i, a)}`,
    '',
  );
  return d;
};


module.exports = Utils;