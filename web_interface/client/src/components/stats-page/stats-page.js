import React from 'react';
import { Link } from "react-router-dom";
import { useStats } from './stats-page.hooks';
import './stats-page.css';

//Icons
import { BiCycling, BiRun, BiTime } from 'react-icons/bi';
import { FaHiking } from 'react-icons/fa';
import { AiFillFire, AiOutlineNumber } from 'react-icons/ai';
import { GiPathDistance } from 'react-icons/gi';

export const Stats = () => {

    const { backendData, onDailyClicked, extraStatisticsData } = useStats();

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
            <div className='stats-lifetime-overview-section'>
                <h2>My Lifetime Stats</h2>
                <table >
                    <tr>
                        <th className='stats-lifetime-overview-header'>{extraStatisticsData && extraStatisticsData.distance}</th>
                        <th className='stats-lifetime-overview-header'>{extraStatisticsData && extraStatisticsData.duration}</th>
                        <th className='stats-lifetime-overview-header'>{extraStatisticsData && extraStatisticsData.calories}</th>
                        <th className='stats-lifetime-overview-header'>{extraStatisticsData && extraStatisticsData.workouts}</th>
                    </tr>
                    <tr>
                        <th className='stats-lifetime-overview-body'>
                            <p><GiPathDistance style={{ color: 'orange' }} size={30}></GiPathDistance></p>
                            Distance</th>
                        <th className='stats-lifetime-overview-body'>
                            <p><BiTime style={{ color: 'orange' }} size={30}></BiTime></p>
                            Duration</th>
                        <th className='stats-lifetime-overview-body'>
                            <p><AiFillFire style={{ color: 'orange' }} size={30}></AiFillFire></p>
                            Calories
                        </th>
                        <th className='stats-lifetime-overview-body'>
                            <p><AiOutlineNumber style={{ color: 'orange' }} size={30}></AiOutlineNumber></p>
                            Workouts</th>
                    </tr>
                </table>
                <table className='stats-lifetime-table'>
                    <tr>
                        <th className='stats-lifetime-table-header'>Workout Type</th>
                        <th className='stats-lifetime-table-header'>Number of Workouts</th>
                        <th className='stats-lifetime-table-header'>Distance</th>
                        <th className='stats-lifetime-table-header'>Duration</th>
                        <th className='stats-lifetime-table-header'>Calories</th>
                    </tr>
                    <tr>
                        <th className='stats-lifetime-table-body'>Cycling
                            <p><BiCycling style={{ color: 'limegreen' }} size={30}></BiCycling></p>
                        </th>
                        <th className='stats-lifetime-table-body'>{extraStatisticsData && extraStatisticsData.workouts}</th>
                        <th className='stats-lifetime-table-body'>{extraStatisticsData && extraStatisticsData.distance}</th>
                        <th className='stats-lifetime-table-body'>{extraStatisticsData && extraStatisticsData.duration}</th>
                        <th className='stats-lifetime-table-body'>{extraStatisticsData && extraStatisticsData.calories}</th>
                    </tr>
                    <tr>
                        <th className='stats-lifetime-table-body'>Jogging
                            <p> <BiRun style={{ color: 'limegreen' }} size={30} ></BiRun></p>
                        </th>
                        <th className='stats-lifetime-table-body'> - </th>
                        <th className='stats-lifetime-table-body'> - </th>
                        <th className='stats-lifetime-table-body'> - </th>
                        <th className='stats-lifetime-table-body'> - </th>
                    </tr>
                    <tr>
                        <th className='stats-lifetime-table-body'>Hiking
                            <p><FaHiking style={{ color: 'limegreen' }} size={30}></FaHiking></p>
                        </th>
                        <th className='stats-lifetime-table-body'> - </th>
                        <th className='stats-lifetime-table-body'> - </th>
                        <th className='stats-lifetime-table-body'> - </th>
                        <th className='stats-lifetime-table-body'> - </th>
                    </tr>
                </table>
            </div>
        </div >
    )
}