import ReportBox from "./ReportBox";

const ReportList = () => {
    return (
        <section>
            <ReportBox mode='edit'/>
            {new Array(3).fill(0).map((el, idx) => (
                <ReportBox mode="readonly" key={idx}/>
            ))}
        </section>
    )
}

export default ReportList;