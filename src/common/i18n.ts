import i18n from "i18next";

import { useTranslation, initReactI18next } from "react-i18next";

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        // the translations
        // (tip move them in a JSON file and import them,
        // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
        resources: {
            en: {
                translation: {
                    "Welcome to React": "Welcome to React and react-i18next",
                    'ponus': 'Bonus',
                    'before': 'Previous',
                    'after': 'Next',
                    'txt_search': 'Search by description',
                    'mywallet': 'My wallet',
                    'from': 'From',
                    'to': 'To',
                    'daily_transaction': 'Daily transaction',
                    'tab_1': 'Home',
                    'tab_2': 'Lend - borrow',
                    'tab_3': 'Report',
                    'tab_4': 'Setting',
                    'date': 'Day',
                    'listHistory': 'History List',
                    'change_languge':'Select Languge',
                    'language':'EN',
                    'vietnam':'VietNamese',
                    'english':'English',
                    'button.update':'Update',
                    'button.add':'Add',
                    'button.delete':'Delete',
                    'text.balance':'Total balance: ',
                    'text.history':'Transaction history',
                    'text.unit':'đ',
                    // ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy']
                    'textcn':'Sunday',
                    'textt2':'Monday',
                    'textt3':'Tuesday',
                    'textt4':'Wednesday',
                    'textt5':'Thursday',
                    'textt6':'Friday',
                    'textt7':'Saturday', 
                    'textmonth1':'January',
                    'textmonth2':'February',
                    'textmonth3':'March',
                    'textmonth4':'April',
                    'textmonth5':'May',
                    'textmonth6':'June',
                    'textmonth7':'July',
                    'textmonth8':'August',
                    'textmonth9':'September',
                    'textmonth10':'October',
                    'textmonth11':'November',
                    'textmonth12':'December',

                    'text.select.month':'Select month ',
                    'text.select.year':'Select year ',
                    'text.lend.borrow':'You have no lend-borrow!',
                    'text.not.record':'You not have any record',
                    }
            },
            vi: {
                translation: {
                    "Welcome to React": "Welcome to React and react-i18next",
                    'ponus': 'Tiền thưởng',
                    'before': 'Trước',
                    'after': 'Tiếp',
                    'txt_search': 'tìm kiếm theo mô tả',
                    'mywallet': 'Ví của tôi',
                    'from': 'Từ',
                    'to': 'Đến',
                    'daily_transaction': 'Giao dịch hàng ngày',
                    'tab_1': 'Tổng quan',
                    'tab_2': 'Cho vay - Đi vay',
                    'tab_3': 'Báo cáo',
                    'tab_4': 'Cài đặt',
                    'date': 'Ngày',
                    'listHistory': 'Danh sách lịch sử',
                    'change_languge':'Thay đổi ngôn ngữ',
                    'language':'VN',
                    'vietnam':'Việt Nam',
                    'english':'Tiếng Anh',
                    'button.update':'Sửa',
                    'button.add':'Thêm',
                    'button.delete':'Xóa',
                    'text.balance':'Tổng số dư: ',
                    'text.history':'Lịch sử giao dịch',
                    'text.unit':'đ',
                    'textcn':'Chủ nhật',
                    'textt2':'Thứ 2',
                    'textt3':'Thứ 3',
                    'textt4':'Thứ 4',
                    'textt5':'Thứ 5',
                    'textt6':'Thứ 6',
                    'textt7':'Thứ 7',
                    'textmonth1':'Tháng 1',
                    'textmonth2':'Tháng 2',
                    'textmonth3':'Tháng 3',
                    'textmonth4':'Tháng 4',
                    'textmonth5':'Tháng 5',
                    'textmonth6':'Tháng 6',
                    'textmonth7':'Tháng 7',
                    'textmonth8':'Tháng 8',
                    'textmonth9':'Tháng 9',
                    'textmonth10':'Tháng 10',
                    'textmonth11':'Tháng 11',
                    'textmonth12':'Tháng 12',
                    'text.select.month':'Chọn tháng ',
                    'text.select.year':'Chọn năm ',

                    'text.lend.borrow':'Bạn không có khoản vay-mượn nào!',
                    'text.not.record':'Bạn không có ghi chép nào!',
                }
            }
        },
        fallbackLng: 'vi',

        interpolation: {
            escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
        }
    });

export default i18n;
