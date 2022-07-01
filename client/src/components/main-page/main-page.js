import React from 'react';
import { useHome } from './main-page.hooks';
import { Link } from "react-router-dom";

export const Home = () => {

    const { backendData } = useHome();

    return (
        <div>
            <h1>Workout Statistics & Visualization</h1>
            <p>Here you can view your workout statistics, both in numbers, on a map, or visualized in charts.</p>
            {/* NOTE: Teams 9 and 10 will add their pages here. */}
            <nav>
                <Link to="/charts">Charts</Link>
            </nav>
            <h3>Testing Backend Fetch</h3>
            {backendData && backendData.message}
        </div>
    )
}
