import { useCallback, useEffect, useState } from 'react';

export const useStats = () => {

    const [backendData, setBackendData] = useState();
    const [extraStatisticsData, setExtraStatisticsData] = useState();

    // This runs when the page loads (you can use this to render workout summaries when the page loads)
    useEffect(() => {
        fetch("/stats").then(response => response.json()).then(data => setExtraStatisticsData(data))
    }, []);

    // Buttons to fetch the desired data (daily, weekly, monthly, yearly)
    const onWorkoutSummariesClicked = useCallback((event) => {
        fetch("/stats/show/workout-summaries").then(response => response.json()).then(data => setBackendData(data));
    }, []);

    const onDailyClicked = useCallback((event) => {
        fetch("/stats/show/daily").then(response => response.json()).then(data => setBackendData(data));
    }, []);

    const onWeeklyClicked = useCallback((event) => {
        fetch("/stats/show/weekly").then(response => response.json()).then(data => setBackendData(data));
    }, []);

    const onMonthlyClicked = useCallback((event) => {
        fetch("/stats/show/monthly").then(response => response.json()).then(data => setBackendData(data));
    }, []);

    const onYearlyClicked = useCallback((event) => {
        fetch("/stats/show/yearly").then(response => response.json()).then(data => setBackendData(data));
    }, []);


    return {
        backendData,
        onDailyClicked,
        onWeeklyClicked,
        onMonthlyClicked,
        onYearlyClicked,
        onWorkoutSummariesClicked,
        extraStatisticsData
    };
}