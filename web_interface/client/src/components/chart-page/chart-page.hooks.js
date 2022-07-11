import { useCallback, useEffect, useState } from 'react';
import { ChartType, FilterType, StatisticType } from './chart-page.types';

export const useCharts = () => {

    const [chartData, setChartData] = useState();
    const [chartType, setChartType] = useState(ChartType.Bar);
    const [filter, setFilter] = useState(FilterType.Daily);
    const [range, setRange] = useState("");
    const [statistic, setStatistic] = useState(StatisticType.Distance);

    useEffect(() => {
        fetch(`/charts/${range.toLowerCase()}`).then(response => response.json()).then(data => setChartData(data));
        // TODO (iteration #2) - use filter, statistic to narrow down the data used to make chart with graph API.
    }, [range]);

    // Filter handlers
    const onFilterTypeSelected = useCallback((event) => {
        const value = event.currentTarget.value;
        setFilter(value);
    }, []);

    // Range handlers
    const onDateRangeSelected = useCallback((event) => {
        const value = event.currentTarget.value;
        setRange(value);
    }, []);

    // Statistic handlers
    const onStatisticeSelected = useCallback((event) => {
        const value = event.currentTarget.value;
        setStatistic(value);
    }, []);

    // Chart handlers
    const onChartTypeSelected = useCallback((event) => {
        const value = event.currentTarget.value;
        setChartType(value);
    }, []);

    return {
        chartData,
        filter,
        range,
        statistic,
        chartType,
        onDateRangeSelected,
        onFilterTypeSelected,
        onStatisticeSelected,
        onChartTypeSelected
    };
}
