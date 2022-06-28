import { useEffect, useState } from 'react';

export const useWSV = () => {

    const [backendData, setBackendData] = useState();

    useEffect(() => {
      fetch("/api").then(response => response.json()).then(data => setBackendData(data))
    }, []);

    return { backendData };
}
