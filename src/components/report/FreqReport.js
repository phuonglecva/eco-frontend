import React, { useEffect, useState } from 'react';
import { Collapse } from 'antd'
import axios from 'axios';
import { arrayTypeAnnotation } from '@babel/types';
import BaseReport from './BaseReport';
import CpiReport from './CpiReport';
import IipReport from './IipReport';
import ImportReport from './ImportReport';
import ExportReport from './ExportReport';
import UnemploymentReport from './UnemploymentReport';
import ThuchiReport from './ThuchiReport';

const { Panel } = Collapse;

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const FreqReport = (props) => {
    const [data, setData] = useState({})

    const fetchData = async () => {
        // let url1 = ("https://aic-group.bike/api/v1/dong-nai/cpies")
        // let url2 = ("https://aic-group.bike/api/v1/dong-nai/iips")
        // let url3 = ("https://aic-group.bike/api/v1/dong-nai/export")
        // let url4 = ("https://aic-group.bike/api/v1/dong-nai/import")
        // let url5 = ("https://aic-group.bike/api/v1/dong-nai/unemployment")

        // let dataStr = ['cpi', 'iip', 'import', 'export', 'unemployment']
        // let getUrls = []
        // Array.from([url1, url2, url3, url4, url5]).forEach((url) => {
        //     getUrls.push(axios.get(url))
        // })
        // await axios.all(getUrls).then(
        //     axios.spread((...allData) => {
        //         console.log(allData)
        //         let data = allData.map((value) => value.data)
        //         setData(data)
        //     })
        // )
        // console.log(data)
    }
    useEffect(() => {
        fetchData()
    }, [])
    return (
        <div className="freq-report">
            <h3>Báo cáo định kỳ các chỉ số kinh tế xã hội</h3>
            <div className="indicator-list">
                {/* <ul>
                    <li><a>Chỉ số giá tiêu dùng</a></li>
                    <li><a>Chỉ số sản xuất công nghiệp</a></li>
                    <li><a>Chỉ số kim ngạch xuất khẩu</a></li>
                    <li><a>Chỉ số kim ngạch nhập khẩu</a></li>
                    <li><a>Tỷ lệ thất nghiệp</a></li>
                </ul> */}
                <Collapse accordion>
                    <Panel header="Chỉ số giá tiêu dùng" key="1">
                        <CpiReport />
                    </Panel>
                    <Panel header="Chỉ số sản xuất công nghiệp" key="2">
                        <IipReport />
                    </Panel>
                    <Panel header="Chỉ số kim ngạch xuất khẩu" key="3">
                        <ExportReport />
                    </Panel>
                    <Panel header="Chỉ số kim ngạch nhập khẩu" key="4">
                        <ImportReport />
                    </Panel>
                    <Panel header="Tỷ lệ thất nghiệp" key="5">
                        <UnemploymentReport />
                    </Panel>
                    <Panel header="Thu chi ngân sách" key="6">
                        <ThuchiReport />
                    </Panel>
                </Collapse>
            </div>
        </div>
    )
}

export default FreqReport;