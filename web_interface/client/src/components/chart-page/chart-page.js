import React from 'react';
import { useCharts } from './chart-page.hooks';
import { Link } from "react-router-dom";
import { ChartType, FilterType } from './chart-page.types';

import './chart-page.css';

export const Charts = () => {

    const { chartData, chartType, filter, onRangeSelected, onFilterTypeSelected, onChartTypeSelected } = useCharts();

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
                <div class="ranges">
                    <h3 class="ranges-title">Ranges</h3>
                    <p>Display Range</p>
                    <select onChange={onRangeSelected}>
                        <option value={""}>-</option>
                        <option value={"year"}>Last Year</option>
                        <option value={"month"}>Last Month</option>
                        <option value={"week"}>Last Week</option>
                    </select>
                </div>
                <div class="filters">
                    <h3 class="filters-title">Filters</h3>
                    <p>Filtering by: {filter}</p>
                    <select onChange={onFilterTypeSelected}>
                        <option value={FilterType.Daily}>-</option>
                        <option value={FilterType.Yearly}>Yearly</option>
                        <option value={FilterType.Monthly}>Monthly</option>
                        <option value={FilterType.Weekly}>Weekly</option>
                        <option value={FilterType.Daily}>Daily</option>
                    </select>
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