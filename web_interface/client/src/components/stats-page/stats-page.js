import React from 'react';
import { Link } from "react-router-dom";

export const Stats = () => {


    return (
        <div>
            <h1>Statistics</h1>
            <nav>
                <Link to="/">Home</Link>
            </nav>
            <p>Here are the overall statistics</p>
            <ul>
                <li>Retrieve all WorkoutSummary records gathered by Group 8</li>
                <li>Aggregated WorkoutSummary data in terms of Daily Occurance</li>
                <li>Aggregated WorkoutSummary data in terms of Weekly Occurance (using the previous occurance)</li>
                <li>Aggregated WorkoutSummary data in terms of Monthly Occurance (using the previous occurance)</li>
                <li>Aggregated WorkoutSummary data in terms of Yearly Occurance (using the previous occurance)</li>
            </ul>
        </div>
    )
}