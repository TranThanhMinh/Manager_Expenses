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
                    'before': 'Before',
                    'after': 'After',
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
                }
            },
            vi: {
                translation: {
                    "Welcome to React": "Welcome to React and react-i18next",
                    'ponus': 'Tiền thưởng',
                    'before': 'Trước',
                    'after': 'Sau',
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
                }
            }
        },
        fallbackLng: 'en',

        interpolation: {
            escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
        }
    });

export default i18n;
