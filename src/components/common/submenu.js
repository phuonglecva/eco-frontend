import React, { useEffect, useState } from 'react';
import { Layout, Menu, Breadcrumb, Button, Row, Col, Card } from 'antd';
import {
    DashboardOutlined,
    DatabaseOutlined,
    ContainerOutlined,
    SettingFilled,
    CaretUpOutlined,
    CaretDownOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined
} from '@ant-design/icons';
import '../css/Submenu.css';
import StatisticGraph from '../graph/StatisticGraph';
import BarGraph from '../graph/VisExample';
// import Example from '../graph/LineExample'
import CpiLineGraph from '../graph/CpiLineGraph';
import IipLineGraph from '../graph/IipLineGraph';
import ThuChiLineGraph from '../graph/ThuChiLineGraph';
import ImportLineGraph from '../graph/ImportLineGraph';
import ExportLineGraph from '../graph/ExportLineGraph';
import UnEmpLineGraph from '../graph/UnEmpLineGraph';
import CpiForecast from '../graph/forecast_graph/CpiForecast';
import ExportForecast from '../graph/forecast_graph/ExportForecast';
import ImportForecast from '../graph/forecast_graph/ImportForecast';
import IipForecast from '../graph/forecast_graph/IipForecast';
import axios from 'axios';
import FreqReport from '../report/FreqReport';
import 'antd/dist/antd.css'
import AppFooter from './footer';

const { SubMenu } = Menu;
const { Header, Content, Sider, Footer } = Layout;
function Sub() {
    const [content, setContent] = useState('');
    const [selectedKey, setSelectedKey] = useState({ key: 'dash' });
    const hideKeyList = ["freq_report", "export_report"]
    const [width, setWidth] = useState("75px")

    const [data, setData] = useState([
        {
            title: 'CPI',
            value: '2.61',
            unit: '%'
        },
        {
            title: 'IIP',
            value: "-1.75",
            unit: '%'

        },
        {
            title: 'Tỷ lệ thất nghiệp',
            value: '1.46',
            unit: '%'
        },
        {
            title: 'Nhập khẩu',
            value: '-124.5',
            unit: 'M VND'
        },
        {
            title: 'Xuất khẩu',
            value: '114.3',
            unit: 'M VND'
        },
    ]);

    const fetchData = React.useCallback(() => {
        const getCurrentStatusUrl = `${process.env.REACT_APP_API_URL}/current-status`
        axios.get(getCurrentStatusUrl).then((response) => {
            let resData = response.data.data
            console.log(resData)
            let tempData = []
            resData.slice(0, 2).forEach((val, idx) => {
                tempData.push({
                    title: val.name,
                    value: val.data,
                    unit: '%'
                })
            })
            resData.slice(2, 4).forEach((val, idx) => {
                tempData.push({
                    title: val.name,
                    value: val.data,
                    unit: 'tr. $'
                })
            })
            console.log(tempData)
            setData(tempData)
        }).catch((err) => {
            console.log(err)
        })
    })
    useEffect(() => {
        fetchData();
    }, [])
    const [showSubMenu, setShowSubMenu] = useState(true)
    return (
        <div>

            <Layout style={{ minHeight: "100vh" }}>

                <Sider collapsible collapsed={showSubMenu}
                    onCollapse={(val) => {
                        // window.location.reload(false)
                        if (width == "75px") {
                            setWidth("25%")
                        } else setWidth("75px")

                        setShowSubMenu(val)
                    }}
                    width={"25%"} className="site-layout-background line" style={{
                        // minWidth:"25%"
                    }}
                >
                    <div style={{ display: "fixed" }}>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['dash']}
                            // defaultOpenKeys={['data']}
                            style={{ height: '100%', borderRight: 0 }}
                            onSelect={(e) => {
                                setSelectedKey(e)
                            }}
                        >
                            <Menu.Item key="dash" icon={<DashboardOutlined />} title="Dashboard">DashBoard</Menu.Item>
                            <SubMenu key="data" icon={<DatabaseOutlined />} title="Thống kê các chỉ số kinh tế xã hội">
                                <Menu.Item key="cpies" title="Chỉ số giá tiêu dùng">Chỉ số giá tiêu dùng</Menu.Item>
                                <Menu.Item key="iips" title="Chỉ số sản xuất công nghiệp">Chỉ số sản xuất công nghiệp</Menu.Item>
                                <Menu.Item key="unemployment" title="Tỷ lệ thất nghiệp">Tỷ lệ thất nghiệp</Menu.Item>
                                <Menu.Item key="export" title="Kim ngạch xuất khẩu">Kim ngạch xuất khẩu</Menu.Item>
                                <Menu.Item key="import" title="Kim ngạch nhập khẩu">Kim ngạch nhập khẩu</Menu.Item>
                                <Menu.Item key="thuchi" title="Thu chi ngân sách">Thu Chi ngân sách</Menu.Item>
                            </SubMenu>
                            <SubMenu key="model" icon={<SettingFilled />} title="Các mô hình dự báo">
                                <Menu.Item key="cpi_model" title="Dự báo chỉ số giá tiêu dùng">Dự báo chỉ số giá tiêu dùng</Menu.Item>
                                <Menu.Item key="iip_model" title="Dự báo chỉ số sản xuất công nghiệp">Dự báo chỉ số sản xuất công nghiệp</Menu.Item>
                                <Menu.Item key="import_model" title="Dự báo kim ngạch nhập khẩu">Dự báo kim ngạch nhập khẩu</Menu.Item>
                                <Menu.Item key="export_model" title="Dự báo kim ngạch xuất khẩu">Dự báo kim ngạch xuất khẩu</Menu.Item>
                            </SubMenu>
                            <SubMenu key="report" icon={<ContainerOutlined />} title="Báo cáo">
                                <Menu.Item key="freq_report" title="Báo cáo định kỳ">Báo cáo định kỳ</Menu.Item>
                            </SubMenu>
                        </Menu>
                    </div>
                </Sider>


                <Layout style={{ padding: '0 12px 12px', marginTop: "100px", marginLeft: `${width}` }}>
                    <Content
                        className="site-layout-background site-content"
                        style={{
                            // padding: 12,
                            // margin: 0,
                            // fontSize: 12,
                        }}

                    >
                        <header>
                            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>

                                {/* <ul> */}
                                {(!hideKeyList.includes(selectedKey.key)) && data.map((item, id) => {
                                    return (
                                        <Col span={6}>
                                            <Card hoverable>
                                                <Card.Meta title={`${item.title}`}
                                                    description={(
                                                        <div style={{fontFamily:"", fontSize:"calc(3px + 1vw)"}}>
                                                            {`${item.value} ${item.unit}`}
                                                            {(parseFloat(item.value) > 0) ? <CaretUpOutlined className="icon" /> : <CaretDownOutlined className="icon" style={{ color: "red" }} />}
                                                        </div>
                                                    )} />
                                            </Card>
                                        </Col>
                                        // <li className="box-shadow">
                                        //     <h3 style={{ margin: "0px", fontFamily: "candara", color: "inherit" }}>{item.title}</h3>
                                        //     <div style={{ display: "flex", float: "right", color: "inherit" }}>
                                        //         <div>
                                        //             {(parseFloat(item.value) > 0) ? <CaretUpOutlined className="icon" /> : <CaretDownOutlined className="icon" style={{ color: "red" }} />}
                                        //         </div>
                                        //         <div>{item.value} {item.unit}</div>
                                        //     </div>
                                        // </li>
                                    )
                                })}
                                {/* </ul> */}
                            </Row>
                        </header>
                        <div style={{ width: "100%" }} className="graph-content">
                            {(selectedKey.key === 'dash') ? <StatisticGraph /> : ''}
                            {selectedKey.key == 'cpies' ? <CpiLineGraph title={(selectedKey) ? selectedKey.item.props.title : ''} width={width} /> : ''}
                            {selectedKey.key == 'iips' ? <IipLineGraph title={(selectedKey) ? selectedKey.item.props.title : ''} /> : ''}
                            {selectedKey.key == 'thuchi' ? <ThuChiLineGraph title={(selectedKey) ? selectedKey.item.props.title : ''} /> : ''}
                            {selectedKey.key == 'import' ? <ImportLineGraph title={(selectedKey) ? selectedKey.item.props.title : ''} /> : ''}
                            {selectedKey.key == 'export' ? <ExportLineGraph title={(selectedKey) ? selectedKey.item.props.title : ''} /> : ''}
                            {selectedKey.key == 'unemployment' ? <UnEmpLineGraph title={(selectedKey) ? selectedKey.item.props.title : ''} /> : ''}
                            {selectedKey.key == 'cpi_model' ? <CpiForecast title={(selectedKey) ? selectedKey.item.props.title : ''} /> : ''}
                            {selectedKey.key == 'export_model' ? <ExportForecast title={(selectedKey) ? selectedKey.item.props.title : ''} /> : ''}
                            {selectedKey.key == 'import_model' ? <ImportForecast title={(selectedKey) ? selectedKey.item.props.title : ''} /> : ''}
                            {selectedKey.key == 'iip_model' ? <IipForecast title={(selectedKey) ? selectedKey.item.props.title : ''} /> : ''}
                            {selectedKey.key == 'freq_report' ? <FreqReport /> : ''}
                            {/* {selectedKey.key == 'export_report' ? <div>Export Report</div> : ''} */}
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </div>
    )
};

export default Sub;

