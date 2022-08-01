import React, { useCallback, useEffect } from 'react'
import * as Highcharts from 'highcharts';
import HC_more from 'highcharts/highcharts-more';
HC_more(Highcharts);
require("highcharts/highcharts-more")(Highcharts);

export const PackedBubble = (props) => {

    const { title, seriesData } = props;

    const highChartsRender = useCallback(() => {
        Highcharts.chart({
            chart: {
                type: 'packedbubble',
                renderTo: 'highcharts-packedbubble'
            },
            title: {
                verticalAlign: 'top',
                floating: true,
                text: title,
                style: {
                fontSize: '20px'
                }
            },
            plotOptions: {
                packedbubble: {
                    dataLabels: {
                        format: '{point.name}: {point.percentage:.1f} %'
                    },
                }
            },
            series: [{
                data: [1, 2, 3]
            }]
        });
    }, [seriesData, title]);

    useEffect(() => {
        highChartsRender();
    }, [highChartsRender]);

    return (
        <div id="highcharts-packedbubble"></div>
    );
}