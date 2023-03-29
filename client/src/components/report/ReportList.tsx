import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { getDate } from "../../common/getDate";
import { Report } from "../../models/report.model";
import ReportBox from "./ReportBox";

const ReportList = ({bookId}: {bookId: string}) => {
    const [isError, setIsError] = useState<boolean>(false);
    const [reportList, setReportList] = useState<Report[]>();
    //전체 독후감 리스트 받아오기
    const handleFetch = () => {
        axios
            .get("http://localhost:4000/report/" + bookId)
            .then((response) => {
                const data = response.data;
                if(data.result === 'OK') {
                    setReportList(data.reportList);
                    setIsError(false);
                }
            })
            .catch((error) => {
                setIsError(true);
            });
    };

    /**오늘 독후감을 썼는지 체크해주는 함수 */
    const checkTodayReportExist = () => {
        if(!reportList || reportList.length < 1) {
            return false;
        }

        const lastReport = reportList[0];
        console.log(lastReport.writtenDatetime);
        console.log(getDate(lastReport.writtenDatetime))
        if(getDate(lastReport.writtenDatetime) === getDate()) {
            return true;
        }

        return false;
    }

    useEffect(() => {
        handleFetch();
    }, []);
    
    return (
        <ul>
            {!checkTodayReportExist() && <li><ReportBox bookId={bookId}/></li>}
            {reportList && reportList.map((data: Report) => (
                <li key={data.bookReportId}>
                    <ReportBox bookId={bookId} data={data}/>
                </li>
            ))}
        </ul>
    )
}

export default ReportList;