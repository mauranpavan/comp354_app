import React, { useCallback, useEffect } from 'react'
import Highcharts from 'highcharts';


export const LineChart = (props) => {

    const { title, seriesData } = props;

    const highChartsRender = useCallback(() => {
        Highcharts.chart({
            chart: {
                type: 'line',
                renderTo: 'highcharts-line'
            },
            title: {
                verticalAlign: 'top',
                text: title,
                style: {
                    fontSize: '16px',
                    fontWeight: '500'
                }
            },
            plotOptions: {
                line: {
                    dataLabels: {
                        format: '{point.name}: {point.percentage:.1f} %'
                    },
                    color: '#030303'
                }
            },
            series: [seriesData]
        });
    }, [seriesData, title]);

    useEffect(() => {
        highChartsRender();
    }, [highChartsRender]);

    return (
        <div id="highcharts-line"></div>
    );
}