export const useHome = () => {
    return;
}

export const useHomeTest = () => {

    const [testMessage, setBackendData] = useState();

    useEffect(() => {
        fetch("/stats").then(response => response.json()).then(data => setBackendData(data))
    }, []);

    return { testMessage };
}