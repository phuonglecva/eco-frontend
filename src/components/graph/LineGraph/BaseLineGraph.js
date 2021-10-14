import { Line } from '@ant-design/charts';
import { Modal, Select, Button, Radio } from 'antd';
import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts'
import CanvasDemo from '../Canvas/CanvasDemo';
const BaseLineGraph = (props) => {
    const [visible, setVisible] = useState(false)
    const [graphType, setGraphType] = useState("line")
    const { config, data, barData, checkList, setConfig, setCheckList, subData } = props
    console.log(props)
    const refreshConfig = () => {
        if (data && barData) {
            let tempData = data.filter((value) => {
                const key = value.key
                console.log(key)
                return checkList[key] == true
            })
            let tempBarData = barData.data.filter((value) => {
                const key = value.key
                // console.log(key)
                return checkList[key] == true
            })
            setConfig({ ...config, data: tempData, barData: { ...barData, data: tempBarData } })
        }
    }
    useEffect(() => {
        refreshConfig()
    }, [checkList])
    return (
        <div style={{ width: "100%", textAlign: "center", display: "inline-block", }}>
            <h2 style={{ color: "#34568B", marginTop: "20px", fontFamily: 'Georgia, Times, "Times New Roman", self-serif', textTransform: "uppercase", fontWeight: "bolder" }}>{props.title}</h2>
            <div className="graph-area">
                <Button style={{ float: "left", margin: "5px" }} onClick={() => setVisible(true)}>Chọn chỉ tiêu</Button>
                <Select defaultValue={graphType} onChange={setGraphType} style={{ float: "right", margin: "5px", backgroundColor: "red" }}>
                    <Select value="line" >Biểu đồ đường</Select>
                    <Select value="bar" >Biểu đồ cột</Select>
                </Select>
                <div style={{ clear: 'both' }}>
                    <div className="line-graph">
                        {(graphType === 'line') && <Line {...config} />}
                        {(graphType === 'bar') && <CanvasDemo {...config} />}
                    </div>
                    {/* {(graphType === 'bar') && <BaseBarGraph {...config} />} */}
                    <Modal
                        title="Chọn chỉ tiêu"
                        centered
                        visible={visible}
                        // onCancel={() => setVisible(false)}
                        onOk={() => {
                            console.log(checkList)
                            refreshConfig()
                            setVisible(false)
                        }}
                        width={500}
                    >

                        <ul>
                            {subData.map((val, idx) => {
                                return (
                                    <li key={idx} onClick={(e) => {
                                        setCheckList(checkList.map((val, i) => {
                                            return (i === idx) ? !val : val
                                        }))
                                        // console.log(checkList)
                                    }}>
                                        <Radio checked={checkList[idx]} />
                                        <a>{val.name}</a></li>
                                )
                            })}
                        </ul>
                    </Modal>
                </div>
            </div>
        </div>
    )
}

export default BaseLineGraph;