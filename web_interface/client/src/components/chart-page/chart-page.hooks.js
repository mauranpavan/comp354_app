import { useCallback, useEffect, useState } from 'react';
import { ChartType } from './chart-page.types';

export const useCharts = () => {

    const [chartData, setChartData] = useState();
    const [chartType, setChartType] = useState(ChartType.Bar);

    useEffect(() => {
        fetch("/charts").then(response => response.json()).then(data => setChartData(data))
    }, []);

    const onLastYearFilterClicked = useCallback(() => {
        if (!chartData) {
            console.log("Conditionally call fetch instead of always calling it. If all data is already parsed, why go parse it again?")
        }
        fetch("/charts/year").then(response => response.json()).then(data => setChartData(data))
    }, [chartData]);

    const onLastMonthFilterClicked = useCallback(() => {
        if (!chartData) {
            console.log("Conditionally call fetch instead of always calling it. If all data is already parsed, why go parse it again?")
        }
        fetch("/charts/month").then(response => response.json()).then(data => setChartData(data))
    }, [chartData]);

    const onLastWeekFilterClicked = useCallback(() => {
        if (!chartData) {
            console.log("Conditionally call fetch instead of always calling it. If all data is already parsed, why go parse it again?")
        }
        fetch("/charts/week").then(response => response.json()).then(data => setChartData(data))
    }, [chartData]);

    const onChartTypeSelected = useCallback((event) => {
        const value = event.currentTarget.value;
        setChartType(value);
    }, []);

    return { chartData, chartType, onLastYearFilterClicked, onLastMonthFilterClicked, onLastWeekFilterClicked, onChartTypeSelected };
}
