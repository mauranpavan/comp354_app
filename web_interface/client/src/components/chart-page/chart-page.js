import React from 'react';
import { useCharts } from './chart-page.hooks';
import { Link } from "react-router-dom";
import { ChartType } from './chart-page.types';

import './chart-page.css';

export const Charts = () => {

    const { chartData, chartType, onLastYearFilterClicked, onLastMonthFilterClicked, onLastWeekFilterClicked, onChartTypeSelected } = useCharts();

    return (
        <div class="charts">
            <nav>
                <Link to="/">Home</Link>
            </nav>
            <div class="charts-header">
                <h1>Your Data Visualized</h1>
                <p>Here, you can see your data visualized.</p>
            </div>
            <div class="charts-body">
                <div class="filters">
                    <h3 class="filters-title">Filters</h3>
                    <p>Filter by:</p>
                    <button onClick={onLastYearFilterClicked}>Last Year</button>
                    <button onClick={onLastMonthFilterClicked}>Last Month</button>
                    <button onClick={onLastWeekFilterClicked}>Last Week</button>
                </div>
                <div class="chart-viewport">
                    <h3>{chartType} Chart</h3>
                    <p>Chart Type</p>
                    <select onChange={onChartTypeSelected}>
                        <option value={ChartType.Bar}>Bar</option>
                        <option value={ChartType.Pie}>Pie</option>
                        <option value={ChartType.Box}>Box</option>
                        <option value={ChartType.Line}>Line</option>
                    </select>
                </div>
                {chartData && chartData.message}
                {/* 2nd iteration - include graph component and pass chart type to it. */}
            </div>

        </div>
    )
}