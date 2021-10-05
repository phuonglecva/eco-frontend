import React, { useState, useEffect } from 'react';
import { Bar } from '@ant-design/charts';
import axios from 'axios';
import '../../css/Graph.css';
import { Modal } from 'antd';

const Demo = (props) => {
    const [barName, setBarName] = useState('')
    const [data, setData] = useState([])

    React.useEffect(() => {
        console.log("props", props)
        let { timeline, title } = props
        let values = props.data
        let temp = []

        for (const [key, list_val] of Object.entries(values)) {
            list_val.forEach((val, idx) => {
                temp.push({
                    label: timeline[idx],
                    type: key,
                    value: val
                })
            })
        }
        setBarName(title)
        setData(temp)
    }, [])

    var config = {
        data: data,
        isGroup: true,
        xField: 'value',
        yField: 'label',
        seriesField: 'type',
        marginRatio: 0,
        label: {
            position: 'middle',
            layout: [
                { type: 'interval-adjust-position' },
                { type: 'interval-hide-overlap' },
                { type: 'adjust-color' },
            ],
        },
        slider: {}
    };

    const [visible, setVisible] = useState(false)
    return (
        <div id="barChart">
            <h3 onClick={() => {
                setVisible(true)
            }}>{barName}</h3>
            <Bar {...config} />
            <Modal
                centered
                visible={visible}
                onOk={() => setVisible(false)}
                onCancel={() => setVisible(false)}
                width={1000}
                cancelButtonProps={{ style: { display: 'none' } }}
            >
                <div style={{ textAlign: "center" }}>
                    <h3>{barName}</h3>
                    <Bar {...config} />
                </div>
            </Modal>
        </div>
    )
};

export default Demo;