import React from 'react';
import { useCharts } from './chart-page.hooks';
import { Link } from "react-router-dom";

export const Charts = () => {

    const { backendData } = useCharts();

    return (
        <div>
            <h1>Charts</h1>
            <nav>
                <Link to="/">Home</Link>
            </nav>
            <p>Here you can see your data visualized.</p>
            {backendData && backendData.message}
        </div>
    )
}