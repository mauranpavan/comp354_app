import React from 'react';
import { useCharts } from './chart-page.hooks';
import { Link } from "react-router-dom";
import { ChartType, FilterType, RangeType, StatisticType } from './chart-page.types';

import './chart-page.css';

export const Charts = () => {

    const { chartData, filter, range, statistic, chartType, onDateRangeSelected, onFilterTypeSelected, onStatisticeSelected, onChartTypeSelected } = useCharts();

    return (
        <div class="charts">
            <nav>
                <Link to="/">Home</Link>
            </nav>
            <div class="charts-header">
                <h1>Your Data Visualized</h1>
                <p class="description">Here, you can see your data visualized.</p>
            </div>
            <div class="charts-body">
                <div class="parameters">
                    <div class="ranges">
                        <h3 class="ranges-title">Ranges</h3>
                        <p>Displaying Data Over the Last: {range}</p>
                        <select onChange={onDateRangeSelected}>
                            <option value={""}>-</option>
                            <option value={RangeType.Week}>Last {RangeType.Week}</option>
                            <option value={RangeType.Month}>Last {RangeType.Month}</option>
                            <option value={RangeType.Year}>Last {RangeType.Year}</option>
                        </select>
                    </div>
                    <div class="filters">
                        <h3 class="filters-title">Filters</h3>
                        <p>Filtering by: {filter}</p>
                        <select onChange={onFilterTypeSelected}>
                            <option value={FilterType.Daily}>{FilterType.Daily}</option>
                            <option value={FilterType.Weekly}>{FilterType.Weekly}</option>
                            <option value={FilterType.Monthly}>{FilterType.Monthly}</option>
                            <option value={FilterType.Yearly}>{FilterType.Yearly}</option>
                        </select>
                    </div>
                    <div class="stats">
                        <h3 class="stats-title">Statistic</h3>
                        <p>Statistic: {statistic}</p>
                        <select onChange={onStatisticeSelected}>
                            <option value={StatisticType.Distance}>{StatisticType.Distance}</option>
                            <option value={StatisticType.Calories}>{StatisticType.Calories}</option>
                            <option value={StatisticType.Duration}>{StatisticType.Duration}</option>
                            <option value={StatisticType.Elevation}>{StatisticType.Elevation}</option>
                            <option value={StatisticType.Speed}>{StatisticType.Speed}</option>
                        </select>
                    </div>
                </div>
                <div class="chart-viewport">
                    <h2>{chartType} Chart</h2>
                    <p>Chart Type</p>
                    <select onChange={onChartTypeSelected}>
                        <option value={ChartType.Bar}>Bar</option>
                        <option value={ChartType.Pie}>Pie</option>
                        <option value={ChartType.Box}>Box</option>
                        <option value={ChartType.Line}>Line</option>
                    </select>
                    <h4>Aggregated Stats</h4>
                    <p class="description">
                        For the first iteration, we are aggregating the data for all statistics for demonstration purposes. In the second iteration, we will not aggregate, but rather
                        return the data points and graph appropriately for the chosen statistic, filter, and range. Range can be tested currently.
                    </p>
                    {chartData && chartData.message}
                </div>
                {/* TODO (iteration #2) - render graph component. */}
            </div>

        </div>
    )
}