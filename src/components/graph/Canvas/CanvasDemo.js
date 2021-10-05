import React from 'react';
import { Column } from '@ant-design/charts';
import { Timeline } from 'antd';

const CanvasDemo = (props) => {
    console.log(props)
    const { barData, xAxis, yAxis } = props
    const { data, timeline } = barData

    let tempData = []
    for (let i = 0; i < data.length; i++) {
        let serieData = data[i].data
        let serieName = data[i].name
        for (let j = 0; j < timeline.length; j++) {
            tempData.push({
                time: timeline[j],
                value: serieData[j],
                cat: serieName
            })
        }
    }
    console.log(tempData)

    const config = {
        isGroup: true,
        data: tempData,
        xField: 'time',
        yField: 'value',
        seriesField: 'cat',
        label: {
            position: 'middle',
            style: {
                fill: '#FFFFFF',
                opacity: 0.6,
            },
        },
        meta: {
            type: { alias: 'Category' },
            sales: { alias: 'Sales' },
            value: { alias: 'Chỉ số giá' },
            time: { alias: 'Tháng' }
        },
        slider: {},
        xAxis: {
            autoRotate: true,
            title: {
                text: xAxis.title.text,
                style: {
                    fontSize: 15,
                    fontWeight: 555
                }
            }
        },
        yAxis: {

            title: {
                text: yAxis.title.text,
                style: {
                    fontSize: 15,
                    fontWeight: 555,
                }
            }
        },
        label: {
            position: 'middle',
            layout: [
                { type: 'interval-adjust-position' },
                { type: 'interval-hide-overlap' },
                { type: 'adjust-color' },
            ],
        },
        // scrollbar: { type: 'horizontal' },
        legend: {
            layout: 'horizontal',
            position: 'bottom'
        }
    };

    return (
        <Column
            {...config}
            onReady={(plot) => {
                plot.on('plot:click', (evt) => {
                    const { x, y } = evt;
                    const { xField } = plot.options;
                    const tooltipData = plot.chart.getTooltipItems({ x, y });
                    console.log(tooltipData);
                });
            }}
            style={{ width: "100%", padding: "10px", height:"55vh" }}
        />
    );
};

export default CanvasDemo;