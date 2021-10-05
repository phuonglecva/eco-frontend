import { Table, Select, Button } from 'antd';
import { useState } from 'react';
const { Option } = Select;


const columns_name = [
    {"name": "Kì gốc", "child": []},
    {
        "name": "Chỉ số giá tháng báo cáo so với (%)",
        "child": [
                {"name": "Cùng tháng năm trước", "child": []},
                {"name": "Tháng 12 năm trước", "child": []},
                {"name": "Tháng trước", "child": []},
        ],
    },
    {"name": "Bình quân cùng kỳ", "child": []},
]

// const getConfig = (month, year)=>{
//     let data = 
// }
const getColumnConfig = (month, year) => {
    return {
        title: `Tháng ${month}/${year}`,
        children: [
            {
                title: 'Năm báo cáo',
                dataIndex: 'report_year',
                key: 'report_year',
                width: 150,
                children: [
                    {
                        title: 'Thực hiện tháng trước',
                        dataIndex: `_${month}_${year}_last_month`,
                        key: `_${month}_${year}_last_month`,
                        width: 100,
                        children: [
                            {
                                title: "Số lượng",
                                dataIndex: `_${month}_${year}_last_month_amount`,
                                width: 100
                            },
                            {
                                title: "Giá trị",
                                dataIndex: `_${month}_${year}_last_month_value`,
                                width: 100
                            },
                        ]
                    },
                    {
                        title: 'Uớc tính tháng báo cáo',
                        dataIndex: `_${month}_${year}_current_month`,
                        key: `_${month}_${year}_current_month`,
                        width: 100,
                        children: [
                            {
                                title: "Số lượng",
                                dataIndex: `_${month}_${year}_current_month_amount`,
                                width: 100
                            },
                            {
                                title: "Giá trị",
                                dataIndex: `_${month}_${year}_current_month_value`,
                                width: 100
                            },
                        ]
                    },
                    {
                        title: 'Cộng dồn từ đầu năm đến cuối tháng báo cáo	',
                        dataIndex: `_${month}_${year}_cumsum_month`,
                        key: `_${month}_${year}_cumsum_month`,
                        width: 100,
                        children: [
                            {
                                title: "Số lượng",
                                dataIndex: `_${month}_${year}_cumsum_month_amount`,
                                width: 100
                            },
                            {
                                title: "Giá trị",
                                dataIndex: `_${month}_${year}_cumsum_month_value`,
                                width: 100
                            },
                        ]
                    },
                ]
            },
        ],
    }
}

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

// for (let month = 1; month < 13; month++) {
//     for (let year = 2019; year < 2021; year++) {
//         columns.push(getColumnConfig(month, year))
//     }
// }

const data = [];
for (let i = 0; i < 20; i++) {
    data.push({
        tt: i,
        index_name: 'John Brown',
        unit: i + 1,
        street: 'Lake Park',
        building: 'C',
        number: 2035,
        companyAddress: 'Lake Street 42',
        companyName: 'SoftLake Co',
        gender: 'M',
        _1_2019_last_month_value: 100
    });
}

const BaseReport = () => {
    const [month, setMonth] = useState(1)
    const [year, setYear] = useState(2019)
    const [finalColumns, setFinalColumns] = useState(columns)
    
    return (
        <div>
            <div className="select">
                <h4 style={{display:"inline"}}>Dữ liệu chỉ số giá tỉnh đồng nai vào </h4>
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
                    let addedColumn = getColumnConfig(month, year)
                    setFinalColumns([...columns, addedColumn])
              }}>Xem báo cáo</Button>
            </div>
            <Table
                columns={finalColumns}
                dataSource={data}
                bordered
                size="middle"
                scroll={{ x: 'calc(600px + 50%)', y: 200 }}
            />
        </div>
    )
}

export default BaseReport;