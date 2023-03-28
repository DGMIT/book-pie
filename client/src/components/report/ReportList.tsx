import axios from "axios";
import { useEffect, useState } from "react";
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

    useEffect(() => {
        handleFetch();
    }, []);
    
    return (
        <section>
            <ReportBox />
            {reportList && reportList.map((data: Report) => (
                <li key={data.bookReportId}>
                    <ReportBox data={data}/>
                </li>
            ))}
        </section>
    )
}

export default ReportList;