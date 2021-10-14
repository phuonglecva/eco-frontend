import React, { useEffect, useState } from 'react';
import { Line, Mix } from '@ant-design/charts';
import axios from 'axios'
import '../../css/LineGraph.css'
const BaseForecast = (props) => {
    const { mixData, defaultAlpha, forecastData } = props;
    const mixConfig = {
        slider: {},
        appendPadding: 8,
        syncViewPadding: true,
        tooltip: { shared: true, showMarkers: false, showCrosshairs: true, offsetY: -50 },
        views: [
            {
                data: mixData?.area || [],
                axes: {
                    value: {
                        title: {
                            text: `Giá trị (${props.unit})`,
                            style: {
                                fontSize: 15,
                                fontWeight: "bold"
                            }
                        }
                    },
                    month: {
                        title: {
                            text: `Tháng`, style: {
                                fontSize: 15,
                                fontWeight: "bold"
                            }
                        }
                    }
                },
                meta: {
                    month: {
                        type: "time",
                        mask: "MM-YY",
                        nice: true,
                        // range: [0, 1]
                    },
                    value: {
                        // nice: true,
                        sync: true,
                        alias: `Khoảng dự báo ${props.name} (alpha=${defaultAlpha})`,
                    },
                    slider: true
                },
                // view1: prepare a area plot, mapping position to `time*temperature`
                geometries: [
                    {
                        type: 'area',
                        xField: 'month',
                        yField: 'value',
                        mapping: {},
                    },
                ],
            },
            {
                data: mixData?.line || [],
                axes: false,
                meta: {
                    month: {
                        type: "time",
                        mask: "MM-YY",
                        nice: true
                    },
                    value: {
                        sync: 'value',
                        alias: `Chỉ số ${props.name}`,
                    },
                    slider: true
                },
                // view2: prepare a line plot and point plot, mapping position to `time*temperature` (share data)
                geometries: [
                    {
                        type: 'line',
                        xField: 'month',
                        yField: 'value',
                        mapping: {},
                    },
                    {
                        type: 'point',
                        xField: 'month',
                        yField: 'value',
                        mapping: {
                            shape: 'circle',
                            style: {
                                fillOpacity: 1,
                            },
                        },
                    },
                ],
            },
            {
                data: mixData?.forecastLine || [],
                axes: false,
                meta: {
                    month: {
                        type: "time",
                        mask: "MM-YY",
                        nice: true
                    },
                    value: {
                        sync: 'value',
                        alias: `Chỉ số dự báo ${props.name}`,
                    },
                    slider: true
                },
                // view2: prepare a line plot and point plot, mapping position to `time*temperature` (share data)
                geometries: [
                    {
                        type: 'line',
                        xField: 'month',
                        yField: 'value',
                        mapping: {
                            color: 'red', style: {
                                fillOpacity: 0.5
                            }
                        },
                    },
                    {
                        type: 'point',
                        xField: 'month',
                        yField: 'value',
                        mapping: {
                            shape: 'diamond',
                            style: {
                                fillOpacity: 0.5,
                            },
                            color: 'red'
                        },
                    },
                ],
            },
        ],
    };
    return (
        <div style={{ width: "100%", textAlign: "center" }}>
            {console.log(forecastData)}
            <div>
                <h2 style={{ color: "#34568B", marginTop: "20px", fontFamily: 'Georgia, Times, "Times New Roman", self-serif', textTransform: "uppercase", fontWeight: "bolder" }}>{props.title}</h2>
                {/* <BaseForecast unit="%" mixData={mixData} defaultAlpha={defaultAlpha} name="cpi" /> */}
                <div className="forecast-graph">
                    <Mix {...mixConfig} style={{ paddingBottom: "10px", height: "55vh" }} />
                </div>
            </div>
        </div>
    )
};
export default BaseForecast;