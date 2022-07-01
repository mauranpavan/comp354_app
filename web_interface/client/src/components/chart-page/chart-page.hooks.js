import { useEffect, useState } from 'react';

export const useCharts = () => {

    const [backendData, setBackendData] = useState();

    useEffect(() => {
        fetch("/charts").then(response => response.json()).then(data => setBackendData(data))
    }, []);

    return { backendData };
}
