import { useCallback, useEffect, useState } from 'react';

export const useStats = () => {

    const [backendData, setBackendData] = useState();

    // This runs when the page loads (you can use this to render workout summaries when the page loads)
    useEffect(() => {
        fetch("/stats").then(response => response.json()).then(data => setBackendData(data))
    }, []);

    // Buttons to fetch the desired data (daily, weekly, monthly, yearly)
    const onDailyClicked = useCallback((event) => {
        fetch("/stats/show/daily").then(response => response.json()).then(data => setBackendData(data));
    }, []);


    return {
        backendData,
        onDailyClicked
    };
}