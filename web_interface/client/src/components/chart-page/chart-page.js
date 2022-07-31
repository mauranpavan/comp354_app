import React from 'react';
import { useCharts } from './chart-page.hooks';
import { Link } from "react-router-dom";
import { ChartType, FilterType, RangeType, StatisticType } from './chart-page.types';

import './chart-page.css';
import { PieChart } from '../graphs/pie.highchart';
import { LineChart } from '../graphs/line.highchart';
import { CylinderChart } from '../graphs/cylinder.highchart';
import { BarChart } from '../graphs/bar.highchart';


export const Charts = () => {

    const { chartData, filter, range, statistic, chartType, onDateRangeSelected, onFilterTypeSelected, onStatisticeSelected, onChartTypeSelected } = useCharts();

    return (
        <div className="charts">
            <nav>
                <Link to="/">Home</Link>
            </nav>
            <div className="charts-header">
                <h1>Your Data Visualized</h1>
                <p className="description">Here, you can see your data visualized in different chart types. The data can be organized with three different parameters: filter, statistic, and range.</p>
            </div>
            <div className="charts-body">
                <div className="parameters">
                    <div className="ranges">
                        <h3 className="ranges-title">Ranges</h3>
                        <p>Displaying Data Over {range === RangeType.Ever ? "All Time" : `Last ${range}`}</p>
                        <select onChange={onDateRangeSelected}>
                            <option value={RangeType.Ever}>All Time</option>
                            <option value={RangeType.Week}>Last {RangeType.Week}</option>
                            <option value={RangeType.Month}>Last {RangeType.Month}</option>
                            <option value={RangeType.Year}>Last {RangeType.Year}</option>
                        </select>
                    </div>
                    <div className="filters">
                        <h3 className="filters-title">Filters</h3>
                        <p>Filtering by: {filter}</p>
                        <select value={filter} onChange={onFilterTypeSelected}>
                            <option value={FilterType.Daily}>{FilterType.Daily}</option>
                            <option value={FilterType.Weekly} disabled={range === RangeType.Week}>{FilterType.Weekly}</option>
                            <option value={FilterType.Monthly} disabled={range === RangeType.Week || range === RangeType.Month}>{FilterType.Monthly}</option>
                            <option value={FilterType.Yearly} disabled={range !== RangeType.Ever}>{FilterType.Yearly}</option>
                        </select>
                    </div>
                    <div className="stats">
                        <h3 className="stats-title">Statistic</h3>
                        <p>Statistic: {statistic}</p>
                        <select value={statistic} onChange={onStatisticeSelected}>
                            <option value={StatisticType.Distance}>{StatisticType.Distance}</option>
                            <option value={StatisticType.Calories}>{StatisticType.Calories}</option>
                            <option value={StatisticType.Duration}>{StatisticType.Duration}</option>
                            <option value={StatisticType.Elevation}>{StatisticType.Elevation}</option>
                            <option value={StatisticType.Speed}>{StatisticType.Speed}</option>
                            <option value={StatisticType.TopSpeed}>{StatisticType.TopSpeed}</option>
                        </select>
                    </div>
                </div>
                <div className="chart-viewport">
                    <h2>{chartType} Chart</h2>
                    <p>Chart Type</p>
                    <select onChange={onChartTypeSelected}>
                        <option value={ChartType.Bar}>Bar</option>
                        <option value={ChartType.Pie}>Pie</option>
                        <option value={ChartType.Line}>Line</option>
                        <option value={ChartType.Cylinder}>3D Cylinder</option>
                    </select>
                    {(chartData && chartType === ChartType.Bar) && <BarChart title={getChartTitle(chartType, filter, statistic)} seriesData={chartData} yAxis={statistic} />}
                    {(chartData && chartType === ChartType.Pie) && <PieChart title={getChartTitle(chartType, filter, statistic)} seriesData={chartData} />}
                    {(chartData && chartType === ChartType.Line) && <LineChart title={getChartTitle(chartType, filter, statistic)} seriesData={chartData} />}
                    {(chartData && chartType === ChartType.Cylinder) && <CylinderChart title={getChartTitle(chartType, filter, statistic)} seriesData={chartData} />}
                </div>
            </div>

        </div>
    )
}

const getChartTitle = (charType, filter, statistic) => {
    return `${charType} Chart of ${filter} ${statistic}`;
}