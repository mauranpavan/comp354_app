import React, { useCallback, useEffect } from 'react'
import Highcharts from 'highcharts';

export const BarChart = (props) => {

    const { title, seriesData, yAxis } = props;

    const highChartsRender = useCallback(() => {
        Highcharts.chart({
            chart: {
                type: 'column',
                renderTo: 'highcharts-bar'
            },
            title: {
                text: title,

            },
            xAxis: {
                type: 'category'
            },
            yAxis: {
                title: {
                    text: yAxis
                }
            },
            series: [seriesData]
        });
    }, [seriesData, title, yAxis]);

    useEffect(() => {
        highChartsRender();
    }, [highChartsRender]);

    return (
        <div id="highcharts-bar"></div>
    );
}