import { useCallback, useEffect, useState } from 'react';
import { ChartType, FilterType } from './chart-page.types';

export const useCharts = () => {

    const [chartData, setChartData] = useState();
    const [chartType, setChartType] = useState(ChartType.Bar);
    const [filter, setFilter] = useState(FilterType.Daily);

    useEffect(() => {
        fetch("/charts/").then(response => response.json()).then(data => setChartData(data))
    }, []);

    // Range handlers
    const onRangeSelected = useCallback((event) => {
        const value = event.currentTarget.value;

        if (!chartData) {
            console.log("Conditionally call fetch instead of always calling it. If all data is already parsed, why go parse it again?")
        }

        fetch(`/charts/${value}`).then(response => response.json()).then(data => setChartData(data))

    }, [chartData]);

    // Filter handlers
    const onFilterTypeSelected = useCallback((event) => {
        const value = event.currentTarget.value;
        setFilter(value);
    }, []);

    // Chart handlers
    const onChartTypeSelected = useCallback((event) => {
        const value = event.currentTarget.value;
        setChartType(value);
    }, []);

    return { chartData, chartType, filter, onRangeSelected, onFilterTypeSelected, onChartTypeSelected };
}
