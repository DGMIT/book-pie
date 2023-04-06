import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { getDate } from "../../lib/getDate";
import { Report } from "../../models/report.model";
import ReportBox from "./ReportBox";
import ErrorMsgBox from "../common/ErrorMsgBox";
import { getErrorMessage } from "../../lib/getErrorMessage";
import { reportAxios } from "../../lib/axiosInstance";

const ReportList = ({
  bookId,
  endPageNum,
}: {
  bookId: string;
  endPageNum: number;
}) => {
  const [isError, setIsError] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState<string>("");
  const [reportList, setReportList] = useState<Report[]>();
  //전체 독후감 리스트 받아오기
  const getReportList = async () => {
    try {
      const response = await reportAxios.get("/" + bookId);
      const data = response.data;
      setReportList(data);
      setIsError(false);
    } catch (error) {
      const { response } = error as unknown as AxiosError;
      setIsError(true);
      setErrMsg(getErrorMessage(response?.status));
    }
  };

  /**오늘 독후감을 썼는지 체크해주는 함수 */
  const checkTodayReportExist = () => {
    if (!reportList || reportList.length < 1) {
      return false;
    }

    const lastReport = reportList[0];
    if (getDate(lastReport.writtenDatetime) === getDate()) {
      return true;
    }

    return false;
  };

  useEffect(() => {
    getReportList();
  }, []);

  return (
    <>
      {isError && <ErrorMsgBox errMsg={errMsg} />}
      <ul>
        {!checkTodayReportExist() && (
          <li>
            <ReportBox bookId={bookId} endPageNum={endPageNum} />
          </li>
        )}
        {reportList &&
          reportList.map((data: Report) => (
            <li key={data.reportId}>
              <ReportBox bookId={bookId} data={data} endPageNum={endPageNum} />
            </li>
          ))}
      </ul>
    </>
  );
};

export default ReportList;
