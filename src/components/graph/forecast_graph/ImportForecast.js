import React, { useEffect, useState } from 'react';
import { Line } from '@ant-design/charts';
import axios from 'axios'
import BaseForecast from './BaseForecast';
import '../../css/LineGraph.css'
const ImportForecast = (props) => {
    const defaultAlpha = 0.9
    const [mixData, setMixData] = useState({})
    const [forecastData, setForecastData] = useState({
        timeline: [],
    })
    const [forecastAvg, setForecastAvg] = useState(0.0);

    const fetchData = React.useCallback(async () => {
        // const importURL = "https://aic-group.bike/api/v1/dong-nai/import"
        // const importForecastURL = `https://aic-group.bike/api/v1/dong-nai/import/forecast/12?alpha=${defaultAlpha}`
        const importURL = `${process.env.REACT_APP_API_URL}/import`
        const importForecastURL = `${process.env.REACT_APP_API_URL}/import/forecast/12?alpha=${defaultAlpha}`

        const getImport = axios.get(importURL)
        const getImportForecast = axios.get(importForecastURL)

        axios.all([getImport, getImportForecast]).then(
            axios.spread((...allData) => {
                const importData = allData[0].data
                const importForecastData = allData[1].data

                const { timeline, total_import } = importData.data
                const { lower, upper } = importForecastData.data
                const importForecast = importForecastData.data.import
                const forecastTimeline = importForecastData.data.timeline
                setForecastData({timeline: forecastTimeline})
                const avg = (importForecast[0] + importForecast[1] + importForecast[2]) / 3
                setForecastAvg(avg)

                let mixData = {
                    line: [],
                    area: [],
                    forecastLine: []
                }
                let addedId = total_import.value.length - 4

                total_import.value.forEach((value, index) => {
                    const month = timeline[index].split('/')[0]
                    const year = timeline[index].split('/')[1]
                    const time = [year, month].join('-')

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

                importForecast.forEach((value, index) => {
                    let month = forecastTimeline[index].split("/")[0]
                    let year = forecastTimeline[index].split("/")[1]
                    const time = [year, month].join("-")
                    mixData.area.push({
                        month: time,
                        value: [parseFloat(lower[index]), parseFloat(upper[index])]
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
    }, [])
    const forecastText = <li style={{ paddingLeft: "20px" }}>
        D??? b??o ch??? s??? gi?? ti??u d??ng chung trong 3 th??ng k??? ti???p t??? {forecastData.timeline[0]} ?????t trung b??nh {(forecastAvg).toFixed(2)}
    </li>
    return (
        <BaseForecast unit="%" mixData={mixData} defaultAlpha={defaultAlpha} name="nh???p kh???u" title={props.title} forecastText={forecastText}/>
    )
};
export default ImportForecast;