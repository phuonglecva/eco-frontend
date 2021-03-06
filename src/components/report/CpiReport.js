import { Select, Button, Radio } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Table } from 'ant-table-extensions';
import ExportExcel from './ExportTable';
const { Option } = Select;


const CpiReport = () => {
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
        let url = `${process.env.REACT_APP_API_URL}/cpi-report?month=${month}&year=${year}`
        axios.get(url)
            .then((response) => {
                let data = response.data
                const { name, timeline, value, columns } = data
                setYearList(data.year_list)
                setMonthList(data.month_list)

                setFinalData(data.data)
                setColumns(columns)
            })
    }


    const fetchFromToData = () => {
        // let url = `https://aic-group.bike/api/v1/dong-nai/cpi-report?fromMonth=${fromMonth}&fromYear=${fromYear}&toMonth=${toMonth}&toYear=${toYear}`
        let url = `${process.env.REACT_APP_API_URL}/cpi-report?fromMonth=${fromMonth}&fromYear=${fromYear}&toMonth=${toMonth}&toYear=${toYear}`
        axios.get(url)
            .then((response) => {
                let data = response.data
                const { name, timeline, value, columns } = data
                setYearList(data.year_list)
                setMonthList(data.month_list)

                setFinalData(data.data)
                setColumns(columns)
            })
    }


    useEffect(() => {
        console.log("running")
        if (timeType === "single") {
            fetchData()
        } else {
            fetchFromToData()
        }
    }, [toggle])
    const [timeType, setTimeType] = useState("single")
    return (
        <div style={{marginBottom: "200px"}}>
            <div className="radio">
                <Radio.Group value={timeType} onChange={(e) => {
                    setTimeType(e.target.value)
                }}>
                    <Radio value="single">Ch???n Theo th??ng</Radio>
                    <Radio value="fromTo">Ch???n Theo kho???ng</Radio>
                </Radio.Group>
            </div>
            <div className="select">
                {(timeType === "single") && <div style={{ display: "inline" }}>

                    <h4 style={{ display: "inline" }}>D??? li???u ch??? s??? gi?? t???nh ?????ng nai v??o </h4>
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
                    }}>Xem b??o c??o</Button>
                </div>}
                {(timeType === "fromTo") && <div style={{ display: "inline" }}>

                    <h4 style={{ display: "inline" }}>D??? li???u ch??? s??? gi?? t???nh ?????ng nai </h4>
                    <div className="from" style={{ display: "inline" }}>
                        <span>t???: </span>
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
                        <span>?????n: </span>
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
                    }}>Xem b??o c??o</Button>
                </div>}
                <Button onClick={() => {
                    const title = (timeType === "single") ? `Ch??? s??? kim ng???ch nh???p kh???u v??o th??ng ${month}-${year}` : `Ch??? s??? kim ng???ch nh???p kh???u v??o t??? ${fromMonth}-${fromYear} ?????n ${toMonth}-${toYear}`
                    ExportExcel(columns, finalData, title)
                }}>Xu???t d??? li???u</Button>
            </div>
            <Table
                columns={columns}
                dataSource={finalData}
                bordered
                size="middle"
                scroll={{ x: 'calc(600px + 50%)', y: 350 }}
                searchable
                searchableProps={{ debounce: true, fuzzySearch:true }}
            />
        </div>
    )
}

export default CpiReport;