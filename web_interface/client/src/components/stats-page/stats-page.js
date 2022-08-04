import React from 'react';
import { Link } from "react-router-dom";
import { useStats } from './stats-page.hooks';

export const Stats = () => {

    const { backendData, onDailyClicked } = useStats();

    return (
        <div>
            <h1>Statistics</h1>
            <nav>
                <Link to="/">Home</Link>
            </nav>
            <p>Here are the overall statistics</p>
            <ul>
                <li>Retrieve all WorkoutSummary records gathered by Group 8
                    <p><a href="./web_interface/data/workout-summaries-stats.html">Workout Summaries</a></p>
                </li>
                <li>Aggregated WorkoutSummary data in terms of Daily Occurance
                    <button onClick={onDailyClicked}>Daily</button>
                </li>
                <li>Aggregated WorkoutSummary data in terms of Weekly Occurance (using the previous occurance)
                    <p><a href="./web_interface/data/weekly-stats.html">Weekly</a></p>
                </li>
                <li>Aggregated WorkoutSummary data in terms of Monthly Occurance (using the previous occurance)
                    <p><a href="./web_interface/data/monthly-stats.html">Monthly</a></p>
                </li>
                <li>Aggregated WorkoutSummary data in terms of Yearly Occurance (using the previous occurance)
                    <p><a href="./web_interface/data/yearly-stats.html">Yearly</a></p>
                </li>
            </ul>
            {backendData && backendData.data}
        </div>
    )
}