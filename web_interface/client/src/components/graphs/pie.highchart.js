import React, { useCallback, useEffect } from 'react'
import Highcharts from 'highcharts';


export const PieChart = (props) => {

    const { title, seriesData } = props;

    const highChartsRender = useCallback(() => {
        Highcharts.chart({
            chart: {
                type: 'pie',
                renderTo: 'highcharts-pie'
            },
            title: {
                verticalAlign: 'middle',
                floating: true,
                text: title,
                style: {
                    fontSize: '10px',
                }
            },
            plotOptions: {
                pie: {
                    dataLabels: {
                        format: '{point.name}: {point.percentage:.1f} %'
                    },
                    innerSize: '70%'
                }
            },
            series: [seriesData]
        });
    }, [seriesData, title]);

    useEffect(() => {
        highChartsRender();
    }, [highChartsRender]);

    return (
        <div id="highcharts-pie"></div>
    );
}