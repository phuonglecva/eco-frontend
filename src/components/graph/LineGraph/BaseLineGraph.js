import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts'
const BaseLineGraph = (props) => {
    const { barData, xAxis, yAxis } = props
    const state = {
        series: barData.data,
        options: {
            grid: {
                show: true
            },
            stroke: {
                // curve: 'stepline'
                width: 3
            },
            xaxis: {
                categories: barData.timeline,
                title: {
                    text: xAxis.title.text,
                    style: {
                        fontSize: 15,
                        fontWeight: 555
                    }
                }
            },
            chart: {
                id: "tháng",
                animations: {
                    enabled: true,
                    easing: 'easeinout',
                    speed: 500,
                    animateGradually: {
                        enabled: true,
                        delay: 150
                    },
                    dynamicAnimation: {
                        enabled: true,
                        speed: 500
                    }
                },
                events: {
                    mounted: (chart) => {
                        chart.windowResizeHandler();
                    }
                }
            },
            yaxis: {
                show: true,
                labels: {
                    formatter: (val, index) => {
                        return val.toFixed(2);
                    }
                },
                title: {
                    text: yAxis.title.text,
                    style: {
                        fontSize: 15,
                        fontWeight: 555,
                    }
                }
            },
            title: {
                text: props.title,
                offsetX: 0,
                offsetY: 0,
                style: {
                    color: undefined,
                    fontSize: 16,
                    fontFamily: 'Helvetica, Arial, sans-serif',
                    fontWeight: 600,
                    cssClass: 'apexcharts-xaxis-title',
                },
                align: "left"
            },
        }
    }
    // const series = props.barData.data

    console.log(state)
    return (
        <div style={{ width: "100%", overflow: "auto", display: "block" }}>
            <Chart type="line" height="300vh" width={`${props.width}`} series={state.series} options={state.options} />;
        </div>
    )
}

export default BaseLineGraph;