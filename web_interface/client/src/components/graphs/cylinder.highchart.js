import React, { useCallback, useEffect } from 'react';
import Highcharts from 'highcharts';
import highcharts3d from "highcharts/highcharts-3d";
import cylinder from "highcharts/modules/cylinder";
highcharts3d(Highcharts);
cylinder(Highcharts);


export const CylinderChart = (props) => {

    const { title, seriesData } = props;

    const highChartsRender = useCallback(() => {
        Highcharts.chart({
            chart: {
                type: 'cylinder',
                options3d: {
                    enabled: true,
                    alpha: 15,
                    beta: 15,
                    depth: 50,
                    viewDistance: 25
                },
                renderTo: 'highcharts-cylinder'
            },
            title: {
                verticalAlign: 'top',
                text: title,
                style: {
                    fontSize: '16px',
                }
            },
            yAxis: {
                title: {
                    offset: 80
                }

            },
            plotOptions: {
                cylinder: {
                    dataLabels: {
                        format: '{point.name}: {point.percentage:.1f} %'
                    }
                },
                series: {
                    depth: 25,
                },
            },
            series: [seriesData]
        });
    }, [seriesData, title]);

    useEffect(() => {
        highChartsRender();
    }, [highChartsRender]);

    return (
        <div id="highcharts-cylinder"></div>
    );
}