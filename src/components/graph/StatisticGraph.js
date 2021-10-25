import React from 'react'
import CpiLineGraph from './CpiLineGraph'
import '../css/Submenu.css'
import IipLineGraph from './IipLineGraph'
import ExportLineGraph from './ExportLineGraph'
import ImportLineGraph from './ImportLineGraph'
import ThuChiLineGraph from './ThuChiLineGraph'
import UnEmpLineGraph from './UnEmpLineGraph'
const StatisticGraph = () => {
    return (
        <div>
       
        <section className='charts'>
            <CpiLineGraph title="chỉ số giá tiêu dùng" />
            <IipLineGraph title="chỉ số sản xuất công nghiệp" />
            <ExportLineGraph title="Kim ngạch xuất khẩu" />
            <ImportLineGraph title="Kim ngạch nhập khẩu" />
            {/* <UnEmpLineGraph title="Tỉ lệ thất nghiệp" /> */}
            <ThuChiLineGraph title="Thu chi ngân sách" />
        </section>
        </div>
    )
}

export default StatisticGraph;