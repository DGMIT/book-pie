import moment from 'moment';
import 'moment/locale/ko';

/**
 * 날짜 string 을 받아 포맷팅.
 * @param datetime 매개변수 없으면 오늘 날짜 반환
 * @returns "YYYY. MM. DD. (dd)" 형식의 날짜 string
 */
export const getDate = (datetime?: string) => {
    let m;
    if(datetime) {
        m = moment(datetime);
    } else {
        m = moment();
    }
    return m.format("YYYY. MM. DD. (dd)");
};