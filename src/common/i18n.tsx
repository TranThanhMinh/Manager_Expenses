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
                    'tab_1': 'Daily transaction',
                    'tab_2': 'Lend - borrow',
                    'tab_3': 'Report',
                    'date': 'Day',
                    'listHistory': 'History List'
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
                    'tab_1': 'Giao dịch hàng ngày',
                    'tab_2': 'Cho vay - Đi vay',
                    'tab_3': 'Báo cáo',
                    'date': 'Ngày',
                    'listHistory': 'Danh sách lịch sử'
                }
            }
        },
        lng: global.multilanguge, // if you're using a language detector, do not define the lng option
        fallbackLng: global.multilanguge,

        interpolation: {
            escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
        }
    });

export default i18n;
