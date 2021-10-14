import { Table, Select, Button, Radio } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import ExportExcel from './ExportTable';
const { Option } = Select;



const ImportReport = () => {
    const [month, setMonth] = useState(1)
    const [year, setYear] = useState(2019)
    const [toggle, setToggle] = useState(true)
    const [finalData, setFinalData] = useState([])
    const [yearList, setYearList] = useState([])
    const [monthList, setMonthList] = useState([])
    const [fromMonth, setFromMonth] = useState(1)
    const [toMonth, setToMonth] = useState(1)
    const [fromYear, setFromYear] = useState(2019)
    const [toYear, setToYear] = useState(2020)

    const [data, setData] = useState([])
    const [columns, setColumns] = useState([])
    const fetchData = () => {

        let url = (timeType === 'single') ? `${process.env.REACT_APP_API_URL}/import-report?month=${month}&year=${year}` :
            `${process.env.REACT_APP_API_URL}/import-report?fromMonth=${fromMonth}&fromYear=${fromYear}&toMonth=${toMonth}&toYear=${toYear}`
        axios.get(url)
            .then((response) => {
                let data = response.data
                const { year_list, month_list, columnsData, columns } = data
                setYearList(data.year_list)
                console.log(year_list, month_list)
                setMonthList(data.month_list)
                console.log(data.columns)
                setFinalData(columnsData)
                setColumns(columns)
            })
    }


    useEffect(() => {
        console.log("running")
        fetchData()
    }, [toggle])
    const [timeType, setTimeType] = useState("single")
    return (
        <div>
            <div className="radio">
                <Radio.Group value={timeType} onChange={(e) => {
                    setTimeType(e.target.value)
                }}>
                    <Radio value="single">Chọn Theo tháng</Radio>
                    <Radio value="fromTo">Chọn Theo khoảng</Radio>
                </Radio.Group>
            </div>
            <div className="select">
                {(timeType === "single") && <div style={{ display: "inline" }}>

                    <h4 style={{ display: "inline" }}>Dữ liệu chỉ số giá tỉnh đồng nai vào </h4>
                    <Select defaultValue={`${month}`} onChange={setMonth}>
                        {monthList.map((val) => {
                            return <Option value={val}>{val}</Option>
                        })}
                    </Select>
                    <Select defaultValue={`${year}`} onChange={setYear}>
                        {yearList.map((val) => {
                            return <Option value={val}>{val}</Option>
                        })}
                    </Select>
                    <Button style={{ marginLeft: "10px" }} type={'primary'} onClick={() => {
                        setToggle(!toggle)
                    }}>Xem báo cáo</Button>
                </div>}
                {(timeType === "fromTo") && <div style={{ display: "inline" }}>

                    <h4 style={{ display: "inline" }}>Dữ liệu chỉ số giá tỉnh đồng nai </h4>
                    <div className="from" style={{ display: "inline" }}>
                        <span>từ: </span>
                        <Select defaultValue={`${fromMonth}`} onChange={setFromMonth}>
                            {monthList.map((val) => {
                                if ((parseFloat(fromYear) == parseFloat(toYear)) && (parseFloat(val) > parseFloat(toMonth))) {
                                    return null
                                } else {
                                    return <Option value={val}>{val}</Option>
                                }
                            })}
                        </Select>
                        <Select defaultValue={`${fromYear}`} onChange={setFromYear}>
                            {yearList.map((val) => {
                                if (parseFloat(val) <= parseFloat(toYear)) {
                                    return <Option value={val}>{val}</Option>
                                }
                            })}
                        </Select>

                    </div>
                    <div className="to" style={{ display: "inline" }}>
                        <span>đến: </span>
                        <Select defaultValue={`${toMonth}`} onChange={setToMonth}>
                            {monthList.map((val) => {
                                if ((parseFloat(fromYear) == parseFloat(toYear)) && (parseFloat(val) < parseFloat(fromMonth))) {
                                    return null
                                } else {
                                    return <Option value={val}>{val}</Option>
                                }
                            })}
                        </Select>
                        <Select defaultValue={`${toYear}`} onChange={setToYear}>
                            {yearList.map((val) => {
                                if (parseFloat(val) >= parseFloat(fromYear)) {
                                    return <Option value={val}>{val}</Option>
                                }
                            })}
                        </Select>

                    </div>
                    <Button style={{ marginLeft: "10px" }} type={'primary'} onClick={() => {
                        setToggle(!toggle)
                    }}>Xem báo cáo</Button>
                </div>}
                <Button onClick={() => {
                    const title = (timeType === "single") ? `Chỉ số kim ngạch nhập khẩu vào tháng ${month}-${year}` : `Chỉ số kim ngạch nhập khẩu vào từ ${fromMonth}-${fromYear} đến ${toMonth}-${toYear}`
                    ExportExcel(columns, finalData, title)
                }}>Xuất dữ liệu</Button>
            </div>
            <Table
                columns={columns}
                dataSource={finalData}
                bordered
                size="middle"
                scroll={{ x: 'calc(600px + 50%)', y: 350 }}
            />
        </div>
    )
}

export default ImportReport;