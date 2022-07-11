import React from 'react';
import { Link } from "react-router-dom";

import './main-page.css';

export const Home = () => {

    return (
        <div>
            {/* NOTE: Teams 9 and 10 will add links to their pages here in this nav. */}
            <nav>
                <Link to="/charts">Charts</Link>
            </nav>
            <div class="home-header">
                <h1>Workout Statistics & Visualization</h1>
                <p class="description">Here you can view your workout statistics, both in numbers, on a map, or visualized in charts. Use the navigation to try each tool.</p>
            </div>
            <div class="home-body">

            </div>
        </div>
    )
}
