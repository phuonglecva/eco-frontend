import { Table, Select, Button } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
const { Option } = Select;



// const getColumnConfig;

let columns = [
    {
        title: 'TT',
        dataIndex: 'tt',
        key: 'tt',
        width: 40,
        fixed: 'left',
    },
    {
        title: 'Chỉ tiêu',
        dataIndex: 'index_name',
        key: 'index_name',
        width: 100,
        fixed: 'left',
    },
    {
        title: 'Đơn vị',
        dataIndex: 'unit',
        key: 'unit',
        width: 100,
        fixed: 'left',
    },

];
Array.from(Array(5).keys()).forEach((val) => {
    columns.push({
        title: `Name_${val}`,
        dataIndex: `name_${val}`,
        key: `name_${val}`,
        width: 100,
    })
})

// const data = [];
// for (let i = 0; i < 20; i++) {
//     data.push({
//         tt: i,
//         index_name: 'John Brown',
//         unit: i + 1,
//     });
// }

const CpiReport = () => {
    const [month, setMonth] = useState(1)
    const [year, setYear] = useState(2019)
    const [finalColumns, setFinalColumns] = useState(columns)
    const [finalData, setFinalData] = useState([])

    const fetchData = () => {
        let url = `http://localhost:5000/api/v1/dong-nai/cpi-report?month=${month}&year=${year}`
        axios.get(url)
            .then((response) => {
                let data = response.data
                const { name, timeline, value } = data
                console.log(value)

                let tempData = []
                for (let i = 0; i < name.length; i++) {
                    let idName = name[i]
                    let dataByName = {
                        tt: i + 1,
                        index_name: idName,
                        unit: '%',
                    }
                    
                    for (let j =0; j < value.length; j++) {
                        dataByName[`name_${j}`] = value[i][j]
                    }
                    tempData.push(dataByName)
                }
                setFinalData(tempData)
                console.log(tempData)
            })
    }
    useEffect(() => {
        fetchData()
    }, [])
    
    return (
        <div>
            <div className="select">
                <h4 style={{ display: "inline" }}>Dữ liệu chỉ số giá tỉnh đồng nai vào </h4>
                <Select defaultValue={`${month}`} onChange={setMonth}>
                    {Array.from(Array(12).keys()).map((val) => {
                        return <Option value={val + 1}>{val + 1}</Option>
                    })}
                </Select>
                <Select defaultValue={`${year}`} onChange={setYear}>
                    {Array.from(Array(2).keys()).map((val) => {
                        return <Option value={val + 2019}>{val + 2019}</Option>
                    })}
                </Select>
                <Button style={{ marginLeft: "10px" }} type={'primary'} onClick={() => {
                    console.log(month, year)
                }}>Xem báo cáo</Button>
            </div>
            <Table
                columns={columns}
                dataSource={finalData}
                bordered
                size="middle"
                scroll={{ x: 'calc(600px + 50%)', y: 200 }}
            />
        </div>
    )
}

export default CpiReport;