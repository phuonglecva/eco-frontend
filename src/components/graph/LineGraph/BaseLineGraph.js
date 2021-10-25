import { Line } from '@ant-design/charts';
import { Modal, Select, Button, Radio, Row, Col, Card } from 'antd';
import React, { useEffect, useState } from 'react';
import { BarsOutlined, BarChartOutlined, LineChartOutlined, SyncOutlined } from '@ant-design/icons'
import CanvasDemo from '../Canvas/CanvasDemo';


const generateCompareConfig = (data) => {
    let newData = []
    if (data.length > 0) {
        newData = data.map((value) => {
            return { ...value, value: parseFloat(value.value + Math.random() * 5), cat: "Cả nước", key: 1 }
        })
    }

    return {
        data: (data.length === 0) ? [] : [...data, ...newData],
        xField: "month",
        yField: "value",
        seriesField: "cat",
        yAxis: {
            label: {
                formatter: function formatter(v) {
                    return ''.concat(v).replace(/\d{1,3}(?=(\d{3})+$)/g, function (s) {
                        return ''.concat(s, ',');
                    });
                },
            },
        },
        color: ['#1979C9', '#D62A0D', '#FAA219'],
        slider: {}
    }
}

const BaseLineGraph = (props) => {
    const [visible, setVisible] = useState(false)
    const [graphType, setGraphType] = useState("line")
    const { config, data, barData, checkList, setConfig, setCheckList, subData, compareConfig } = props
    // const [conf, setConf] = useState(null)
    const [cList, setCList] = useState([])

    let temp = data.filter((val) => {
        return val.key === 0
    })
    console.log(temp)
    const conf = (generateCompareConfig(temp))


    const refreshConfig = () => {
        if (data && barData) {
            let tempData = data.filter((value) => {
                const key = value.key
                return cList[key] == true
            })
            let tempBarData = barData.data.filter((value) => {
                const key = value.key
                // console.log(key)
                return cList[key] == true
            })
            setConfig({ ...config, data: tempData, barData: { ...barData, data: tempBarData } })
        }
    }
    useEffect(() => {
        if (cList.length === 0) {
            setCList(checkList)
        }
        // if (!conf) {
        // }
        refreshConfig()

        // console.log(cList)
    }, [cList])


    return (
        <>
            <div className="wrapper">
                <header className="main-head" style={{}}>
                    <h2 style={{
                        color: "#34568B", marginTop: "0", fontFamily: 'Georgia, Times, "Times New Roman", self-serif', textTransform: "uppercase", fontWeight: "bolder",
                        fontSize: "calc(5px + 1vw)"
                    }}>{props.title}</h2>
                </header>
                <div className="info-detail" style={{ textAlign: "left" }} >
                    {/* <p style={{}}>* {props.title} tháng hiện tại tăng 4.5%</p> */}
                </div>
                <div className="main-graph" style={{}}>
                    {/* <Card title={(
                        )}> */}
                    <h3 style={{ fontSize: "calc(3px + 1vw)" }}>Biểu đồ chỉ số giá tiêu dùng chung và các mặt hàng</h3>
                    <hr style={{ width: "80%" }} />
                    <div className="graph-area">
                        <div className="graph-select-area">
                            <Row gutter={[16, 16]}>
                                <Col span={4}>
                                    <BarsOutlined style={{
                                        fontSize: "2em",
                                        color: "blue"
                                    }} onClick={() => setVisible(true)} />
                                </Col>
                                <Col span={10} offset={10} style={{ textAlign: "right" }}>
                                    <Radio.Group style={{}}
                                        onChange={(e) => { setGraphType(e.target.value) }}
                                        defaultValue="line"
                                    >
                                        <Radio.Button value="line" style={{}}>
                                            <LineChartOutlined style={{}} />
                                        </Radio.Button>
                                        <Radio.Button value="bar">
                                            <BarChartOutlined />
                                        </Radio.Button>
                                    </Radio.Group>
                                </Col>
                            </Row>
                            {/* <Select
                                defaultValue={graphType} onChange={setGraphType}
                                style={{
                                    float: "right",
                                    margin: "5px",
                                    width: "25%"
                                }}>
                                <Select value="line" >
                                    <LineChartOutlined style={{ color: "red" }} />

                                </Select>
                                <Select value="bar" >
                                    <BarChartOutlined />

                                </Select>
                            </Select> */}
                        </div>
                        <div style={{ clear: 'both' }}>
                            <div>
                                {(graphType === 'line') && <Line {...config} />}
                            </div>
                            <div>
                                {(graphType === 'bar') && <CanvasDemo {...config} />}
                            </div>
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
                                                setCList(cList.map((val, i) => {
                                                    return (i === idx) ? !val : val
                                                }))
                                                // console.log(checkList)
                                            }}>
                                                <Radio checked={(cList.length === 0) ? checkList[idx] : cList[idx]} />
                                                <a>{val.name}</a></li>
                                        )
                                    })}
                                </ul>
                            </Modal>
                        </div>
                    </div>
                    {/* </Card> */}
                </div>
                <div className="compare-graph" style={{ textAlign: "center", }}>
                    <h3 style={{ fontSize: "calc(3px + 1vw)" }}>Biểu đồ so sánh với cả nước</h3>
                    <hr style={{ width: "80%" }} />
                    <div style={{ width: "80%", margin: "auto", height: "80%" }}>
                        {console.log(conf)}
                        {(conf) && <Line {...conf} />}
                    </div>
                </div>
                <div className="selection-graph" style={{ overflow: "auto", padding: "10px", textAlign: "center" }}>
                    {/* Selection */}
                    <Row>
                        <Col span={22} >
                            <h4>Chọn chỉ số</h4>
                        </Col>
                        <Col span={2} style={{ textAlign: "right" }}>
                            <SyncOutlined onClick={() => {
                                setCList(cList.map((val, idx) => {
                                    return idx === 0
                                }))
                            }} style={{ color: "blue" }} />
                        </Col>
                    </Row>
                    <hr style={{ width: "80%" }} />
                    <Row gutter={{ xs: [8, 8], sm: [16, 16], md: [24, 24], lg: [32, 32] }} style={{ height: "100%" }}>
                        {subData.map((val, idx) => {
                            let offset = (idx % 3 === 0) ? 0 : 3;
                            return (
                                <Col className="selection-box" style={{ marginBottom: "10px", boxShadow: "", padding: "4px" }} span={6} offset={offset} key={idx} onClick={(e) => {
                                    setCList(cList.map((val, i) => {
                                        return (i === idx) ? !val : val
                                    }))
                                }}>
                                    <Radio checked={(cList.length === 0) ? checkList[idx] : cList[idx]} />
                                    <a>{val.name}</a>
                                </Col>
                            )
                        })}
                    </Row>
                </div>
            </div>

            {/* <div style={{ width: "100%", textAlign: "center", display: "inline-block", }}>
                <h2 style={{ color: "#34568B", marginTop: "0", fontFamily: 'Georgia, Times, "Times New Roman", self-serif', textTransform: "uppercase", fontWeight: "bolder" }}>{props.title}</h2>
                <div className="graph-area">
                    <Button style={{ float: "left", margin: "5px" }} onClick={() => setVisible(true)}>Chọn chỉ tiêu</Button>
                    <Select defaultValue={graphType} onChange={setGraphType} style={{ float: "right", margin: "5px", backgroundColor: "red" }}>
                        <Select value="line" >Biểu đồ đường</Select>
                        <Select value="bar" >Biểu đồ cột</Select>
                    </Select>
                    <div style={{ clear: 'both' }}>
                        <div >
                            <div>
                                {(graphType === 'line') && <Line {...config} />}
                            </div>
                            <div>
                                {(graphType === 'bar') && <CanvasDemo {...config} />}
                            </div>
                        </div>
                    
                        <Modal
                            title="Chọn chỉ tiêu"
                            centered
                            visible={visible}
                            
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
                                           
                                        }}>
                                            <Radio checked={checkList[idx]} />
                                            <a>{val.name}</a></li>
                                    )
                                })}
                            </ul>
                        </Modal>
                    </div>
                </div>
            </div> */}
        </>
    )
}

export default BaseLineGraph;