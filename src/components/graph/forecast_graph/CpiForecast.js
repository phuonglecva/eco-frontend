import React, { useEffect, useState } from 'react';
import { Line, Mix } from '@ant-design/charts';
import axios from 'axios'
import BaseForecast from './BaseForecast';

const CpiForecast = (props) => {
    const defaultAlpha = 0.9
    const [mixData, setMixData] = useState({})
    const [forecastData, setForecastData] = useState()
    const fetchData = React.useCallback(() => {
        // const cpisURL = "https://aic-group.bike/api/v1/dong-nai/cpies"
        // const cpiForecastURL = `https://aic-group.bike/api/v1/dong-nai/cpis/forecast/12?alpha=${defaultAlpha}`
        const cpisURL = `${process.env.REACT_APP_API_URL}/cpies`
        const cpiForecastURL = `${process.env.REACT_APP_API_URL}/cpis/forecast/12?alpha=${defaultAlpha}`

        const getCPI = axios.get(cpisURL)
        const getCPIForecast = axios.get(cpiForecastURL)
        axios.all([getCPI, getCPIForecast]).then(
            axios.spread((...allData) => {
                const cpiData = allData[0].data
                const forecastData = allData[1].data
                setForecastData(forecastData.data)

                let { cpi, timeline } = cpiData.data
                let data = []
                let mixData = {
                    "line": [],
                    "forecastLine": [],
                    "area": [],

                }
                let cpi_length = cpi[0].val.length
                cpi[0].val.forEach((val, index) => {

                    mixData["line"].push({
                        month: timeline[index],
                        value: parseFloat((parseFloat(val) - 100))
                    })
                    if (index === cpi_length - 4) {
                        mixData["area"].push({
                            month: timeline[index],
                            value: [parseFloat(parseFloat(val) - 100), parseFloat(parseFloat(val) - 100)]
                        })
                        mixData["forecastLine"].push({
                            month: timeline[index],
                            value: parseFloat(parseFloat(val) - 100)
                        })
                    } else if (index < cpi_length - 4) {
                        mixData["area"].push({
                            month: timeline[index],
                            value: [null, null]
                        })
                        mixData["forecastLine"].push({
                            month: timeline[index],
                            value: null
                        })
                    }
                })

                const { upper, lower } = forecastData.data
                const forcastTimeline = forecastData.data.timeline
                cpi = forecastData.data.cpi
                console.log("upper, lower, cpi, timeline: ", upper, lower, cpi, timeline)

                upper.forEach((up, index) => {
                    const month = forcastTimeline[index].split("/")[0]
                    const year = forcastTimeline[index].split("/")[1]
                    const time = [year, month].join("-")

                    mixData["area"].push({
                        month: time,
                        value: [parseFloat(parseFloat(lower[index]).toFixed(2)), parseFloat(parseFloat(upper[index]).toFixed(2))]
                    })
                    mixData["forecastLine"].push({
                        month: time,
                        value: parseFloat(parseFloat(cpi[index]).toFixed(2))
                    })
                    if (index >= 3) {
                        mixData["line"].push({
                            month: time,
                            value: null
                        })
                    }
                    // console.log(mixData)
                })
                console.log(mixData)
                setMixData(mixData)
            })
        )
    }, [])

    React.useEffect(() => {
        fetchData()
    }, [])


    return (
        <BaseForecast unit="%" forecastData={forecastData} mixData={mixData} defaultAlpha={defaultAlpha} name="cpi" title={props.title} />
    )
};
export default CpiForecast;