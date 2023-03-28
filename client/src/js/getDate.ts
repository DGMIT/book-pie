import moment from 'moment';
import 'moment/locale/ko';

export const getDate = (time?: string) => {
    let m;
    if(time) {
        m = moment(time.slice(0, 10));
    } else {
        m = moment();
    }
    return m.format("YYYY. MM. DD. (dd)");
};