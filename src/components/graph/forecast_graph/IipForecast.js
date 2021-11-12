import React, { useEffect, useState } from 'react';
import { Line } from '@ant-design/charts';
import axios from 'axios'
import BaseForecast from './BaseForecast';

const IipForecast = (props) => {
    const defaultAlpha = 0.9
    const [mixData, setMixData] = useState({})
    const [forecastData, setForecastData] = useState({
        timeline: [],
    })
    const [forecastAvg, setForecastAvg] = useState(0.0)

    const fetchData = React.useCallback(async () => {
        // const iipForecastUrl = `https://aic-group.bike/api/v1/dong-nai/iips/forecast/6?alpha=${defaultAlpha}`
        // const iipDataUrl = "https://aic-group.bike/api/v1/dong-nai/iips"
        const iipForecastUrl = `${process.env.REACT_APP_API_URL}/iips/forecast/12?alpha=${defaultAlpha}`
        const iipDataUrl = `${process.env.REACT_APP_API_URL}/iips`

        const getIip = axios.get(iipDataUrl)
        const getIipForecast = axios.get(iipForecastUrl)
        axios.all([getIip, getIipForecast]).then(
            axios.spread((...allData) => {
                // console.log("allData: ", allData)
                const iipData = allData[0].data
                const iipForecastData = allData[1].data

                const { iip, timeline } = iipData.data
                const { lower, upper } = iipForecastData.data
                let forecastTimeline = iipForecastData.data.timeline
                let iipForecast = iipForecastData.data.iip
                setForecastData({ timeline: forecastTimeline })
                // count and set forecast Avg
                const avg = (iipForecast[0] + iipForecast[1] + iipForecast[2]) / 3
                setForecastAvg(avg)

                let mixData = {
                    "line": [],
                    "area": [],
                    "forecastLine": []
                }
                let timelen = timeline.length
                timeline.forEach((time, idx) => {
                    mixData['line'].push({
                        month: time,
                        value: parseFloat(iip[idx])
                    })
                    if (idx === timelen - 4) {
                        mixData["area"].push({
                            month: time,
                            value: [parseFloat(iip[idx]), parseFloat(iip[idx])]
                        })
                        mixData['forecastLine'].push({
                            month: time,
                            value: parseFloat(iip[idx])
                        })
                    } else if (idx < timelen - 4) {
                        mixData["area"].push({
                            month: time,
                            value: [null, null]
                        })
                        mixData['forecastLine'].push({
                            month: time,
                            value: null
                        })
                    }
                })

                forecastTimeline.forEach((t, idx) => {
                    const month = t.split("/")[0]
                    const year = t.split("/")[1]
                    const time = [year, month].join('-')
                    mixData['line'].push({
                        month: time,
                        value: null
                    })
                    mixData['area'].push({
                        month: time,
                        value: [parseFloat(lower[idx]), parseFloat(upper[idx])]
                    })
                    mixData['forecastLine'].push({
                        month: time,
                        value: parseFloat(iipForecast[idx])
                    })
                })

                setMixData(mixData)

            })
        )


    }, [])

    React.useEffect(() => {
        fetchData()
    }, [fetchData])
    const forecastText = <li style={{ paddingLeft: "20px" }}>
        Dự báo chỉ số sản xuất toàn ngành công nghiệp trong 3 tháng kế tiếp từ {forecastData.timeline[0]} {(forecastAvg > 0) ? "tăng trung bình" : "giảm trung bình"} {(forecastAvg).toFixed(2)} %
    </li>
    return (
        <BaseForecast unit="%" mixData={mixData} defaultAlpha={defaultAlpha} name="sản xuất công nghiệp" title={props.title} forecastText={forecastText}/>
    )
};
export default IipForecast;