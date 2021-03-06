import React, { useEffect, useState } from 'react';
import { Line } from '@ant-design/charts';
import axios from 'axios'
import BaseForecast from './BaseForecast';

const ExportForecast = (props) => {
    const defaultAlpha = 0.9
    const [mixData, setMixData] = useState({})
    const [forecastData, setForecastData] = useState({
        timeline: [],

    })
    const [forecastAvg, setForecastAvg] = useState(0.0)
    const fetchData = React.useCallback(async () => {
        // const importURL = "https://aic-group.bike/api/v1/dong-nai/export"
        // const importForecastURL = `https://aic-group.bike/api/v1/dong-nai/export/forecast/12?alpha=${defaultAlpha}`
        const importURL = `${process.env.REACT_APP_API_URL}/export`
        const importForecastURL = `${process.env.REACT_APP_API_URL}/export/forecast/12?alpha=${defaultAlpha}`
        
        const getImport = axios.get(importURL)
        const getImportForecast = axios.get(importForecastURL)

        axios.all([getImport, getImportForecast]).then(
            axios.spread((...allData) => {
                const exportData = allData[0].data
                const importForecastData = allData[1].data
                const { timeline, total_export } = exportData.data
                const { lower, upper } = importForecastData.data
                const exportForecast = importForecastData.data.export
                const forecastTimeline = importForecastData.data.timeline
                setForecastData({ data: exportForecast, timeline: forecastTimeline })
                // count and set forecastAvg
                const avg = (exportForecast[0] + exportForecast[1] + exportForecast[2]) / 3
                setForecastAvg(avg)

                let addedId = total_export.value.length - 4

                let mixData = {
                    line: [],
                    area: [],
                    forecastLine: []
                }
                total_export.value.forEach((value, index) => {
                    let month = timeline[index].split("/")[0]
                    let year = timeline[index].split("/")[1]
                    let time = [year, month].join("-")
                    mixData.line.push({
                        month: time,
                        value: parseFloat(value)
                    })

                    if (index === addedId) {
                        mixData.area.push({
                            month: time,
                            value: [parseFloat(value), parseFloat(value)]
                        })
                        mixData.forecastLine.push({
                            month: time,
                            value: parseFloat(value)
                        })
                    } else if (index < addedId) {
                        mixData.area.push({
                            month: time,
                            value: [null, null]
                        })
                        mixData.forecastLine.push({
                            month: time,
                            value: null
                        })

                    }

                })

                exportForecast.forEach((value, index) => {
                    let month = forecastTimeline[index].split("/")[0]
                    let year = forecastTimeline[index].split("/")[1]
                    let time = [year, month].join("-")
                    mixData.area.push({
                        month: time,
                        value: [parseFloat(lower[index]).toFixed(2), parseFloat(upper[index]).toFixed(2)]
                    })
                    mixData.line.push({
                        month: time,
                        value: null
                    })
                    mixData.forecastLine.push({
                        month: time,
                        value: parseFloat(value)
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
        D??? b??o kim ng???ch xu???t kh???u trong 3 th??ng k??? ti???p t??? {forecastData.timeline[0]} ?????t trung b??nh {(forecastAvg).toFixed(2)} tri???u ????.
    </li>
    return (
        <BaseForecast unit="%" mixData={mixData} defaultAlpha={defaultAlpha} name="xu???t kh???u" title={props.title} forecastData={forecastData} forecastText={forecastText}/>
    )
};
export default ExportForecast;