import React, { useState, useEffect } from 'react';
import { Pie } from '@ant-design/charts';
import { Select } from 'antd'
import { pipelineTopicExpression } from '@babel/types';

const DemoPie = (props) => {
    const Option = Select;
    const [currrentData, setCurrentData] = useState([])
    const [defaultYear, setDefaultYear] = useState()
    var [data, setData] = useState([
        {
            type: 'Nam',
            value: 27,
        },
        {
            type: 'Nu',
            value: 25,
        },
    ]);
    useEffect(() => {
        // let data = Array.from({ length: 10 }, (idx, value) => ({
        //     year: value + 2000,
        //     data: [
        //         { type: 'Nam', value: Math.floor(Math.random() * 100) },
        //         { type: 'Nữ', value: Math.floor(Math.random() * 100) },
        //         { type: 'Nữ', value: Math.floor(Math.random() * 100) },
        //     ]
        // }));
        // setData(data)
        // console.log(data)
        console.log("Props", props)
        let { timeline, data } = props
        let temp = []
        for (let i = 0; i < timeline.length; i++) {
            temp.push({
                year: timeline[i],
                data: [
                    { type: 'Nữ', value: data.nu[i] },
                    { type: 'Nam', value: data.nam[i] },
                ]
            })
        }
        setData(temp)
        setCurrentData(temp.slice(-1,)[0].data)
    }, [])
    const config = {
        appendPadding: 10,
        data: currrentData,
        angleField: 'value',
        colorField: 'type',
        radius: 1,
        innerRadius: 0.6,
        label: {
            type: 'inner',
            offset: '-30%',
            content: function content(_ref) {
                var percent = _ref.percent;
                return ''.concat((percent * 100).toFixed(0), '%');
            },
            style: {
                fontSize: 10,
                textAlign: 'center',
            },
        },
        statistic: {
            title: false,
            content: {
                style: {
                    whiteSpace: 'pre-wrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    fontSize: "1.2em",
                    color: " #8a3ab9",
                },
                content: `Tỷ lệ thất nghiệp\n ${props.title}`,
            },
        },
        interactions: [{ type: 'element-active' }, { type: 'element-active' }],
    };
    const handleChange = (value) => {
        for (let i = 0; i < data.length; i++) {
            if (data[i].year == value) {
                setCurrentData(data[i].data)
            }
        }
    }
    return (
        <div style={{ textAlign: "center", display: "inline-block", width: "30%", marginBottom: "100px", height: "auto" }}>
            <div className="selectArea" style={{ float: "right" }}>
                <Select defaultValue={props.timeline.slice(-1,)[0]} style={{ width: "100%" }} onChange={handleChange}>
                    {data.map((value, idx) => {
                        return (
                            <Option value={value.year}>{value.year}</Option>
                        )
                    })}
                </Select>
            </div>
            <div style={{ height: "inherit" }}>
                <h3 style={{ marginLeft: "20px", fontFamily: "unset" }}>{props.title}</h3>
                <Pie {...config} style={{ height: "35vh" }} />
            </div>
        </div>
    )

};

export default DemoPie;