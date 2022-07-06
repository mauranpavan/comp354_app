// Controller exposes endpoints to the client. It serves as the interface between client and the data from the database.

const express = require("express");
const fs = require('fs');
let router = express.Router();


// [GET(/charts/)] - Gets data for all time (the default for when a user is routed to /charts)
router.route("/")
    .get((req, res) => {
        fs.readFile('../data/data.csv', 'utf-8', (err, data) => {
            if (err) {
                console.error(err);
                return;
            }
            res.json({ "message": "Fetch data" });
        });
    });

// [GET(/charts/year)] - Gets data for workouts that took place in the last year.
router.route("/year")
    .get((req, res) => {
        fs.readFile('../data/data.csv', 'utf-8', (err, data) => {
            if (err) {
                console.error(err);
                return;
            }

            const calories = [];
            const distance = [];
            const duration = [];
            const topSpeed = [];
            const avgSpeed = [];
            const table = data.split('\n').slice(1);

            table.forEach(row => {
                const columns = row.split(',');
                const now = (new Date()).toISOString().split('T')[0];
                const oneYearAgo = (new Date(new Date().setFullYear(new Date().getFullYear() - 1))).toISOString().split('T')[0];
            
                if(oneYearAgo <= columns[1] && columns[1] <= now){

                    const yearlyCalories = columns[2];
                    const yearlyDistance = columns[3];
                    const yearlyDuration = columns[4];
                    const yearlyTopSpeed = columns[5];
                    const yearlyAvgSpeed = columns[6];

                    calories.push(yearlyCalories);
                    distance.push(yearlyDistance);
                    duration.push(yearlyDuration);
                    topSpeed.push(yearlyTopSpeed);
                    avgSpeed.push(yearlyAvgSpeed);
                    

            }
            
            })
            

            const caloriesNum = calories.map(str => {
                return Number(str);
            });

            const distanceNum = distance.map(str => {
                return Number(str);
            });

            const durationNum = duration.map(str => {
                return Number(str);
            });

            const topSpeedNum = topSpeed.map(str => {
                return Number(str);
            });

            const avgSpeedNum = avgSpeed.map(str => {
                return Number(str);
            });

            let calSum = 0;

            for (let i = 0; i < caloriesNum.length; i += 1) {
                calSum += caloriesNum[i];
            }
            
            let distanceSum = 0;

            for (let i = 0; i < distanceNum.length; i += 1) {
                distanceSum += distanceNum[i];
            }

            let durationSum = 0;

            for (let i = 0; i < durationNum.length; i += 1) {
                durationSum += durationNum[i];
            }

            let topSpeedSum = 0;

            for (let i = 0; i < topSpeedNum.length; i += 1) {
                topSpeedSum += topSpeedNum[i];
            }

            var topSpeedYearlyAvg = topSpeedSum / topSpeedNum.length;
            
            let avgSpeedSum = 0;

            for (let i = 0; i < avgSpeedNum.length; i += 1) {
                avgSpeedSum += avgSpeedNum[i];
            }
            
            var avgSpeedYearlyAvg = avgSpeedSum / avgSpeedNum.length;

            const outputData = [

                ["Yearly calories: ", calSum],
                [" Yearly distance: ", distanceSum],
                [" Yearly duration: ", durationSum],
                [" Yearly top speed average: ", topSpeedYearlyAvg.toFixed(2)],
                [" Yearly average speed average: ", avgSpeedYearlyAvg.toFixed(2)]

            ];
            //const calSum = caloriesNum[0] + caloriesNum[1];
            res.json({ "message": outputData });

        });
    });

// [GET(/charts/month)] - Gets data for workouts that took place in the last month.
router.route("/month")
    .get((req, res) => {
        fs.readFile('../data/data.csv', 'utf-8', (err, data) => {
            if (err) {
                console.error(err);
                return;
            }

            const calories = [];
            const distance = [];
            const duration = [];
            const topSpeed = [];
            const avgSpeed = [];
            const table = data.split('\n').slice(1);

            table.forEach(row => {
                const columns = row.split(',');
                const now = (new Date()).toISOString().split('T')[0];
                const oneMonthAgo = (new Date(new Date().setMonth(new Date().getMonth() - 1))).toISOString().split('T')[0];
            
                if(oneMonthAgo <= columns[1] && columns[1] <= now){

                    const monthlyCalories = columns[2];
                    const monthlyDistance = columns[3];
                    const monthlyDuration = columns[4];
                    const monthlyTopSpeed = columns[5];
                    const monthlyAvgSpeed = columns[6];

                    calories.push(monthlyCalories);
                    distance.push(monthlyDistance);
                    duration.push(monthlyDuration);
                    topSpeed.push(monthlyTopSpeed);
                    avgSpeed.push(monthlyAvgSpeed);
                    

            }
            
            })
            

            const caloriesNum = calories.map(str => {
                return Number(str);
            });

            const distanceNum = distance.map(str => {
                return Number(str);
            });

            const durationNum = duration.map(str => {
                return Number(str);
            });

            const topSpeedNum = topSpeed.map(str => {
                return Number(str);
            });

            const avgSpeedNum = avgSpeed.map(str => {
                return Number(str);
            });

            let calSum = 0;

            for (let i = 0; i < caloriesNum.length; i += 1) {
                calSum += caloriesNum[i];
            }
            
            let distanceSum = 0;

            for (let i = 0; i < distanceNum.length; i += 1) {
                distanceSum += distanceNum[i];
            }

            let durationSum = 0;

            for (let i = 0; i < durationNum.length; i += 1) {
                durationSum += durationNum[i];
            }

            let topSpeedSum = 0;

            for (let i = 0; i < topSpeedNum.length; i += 1) {
                topSpeedSum += topSpeedNum[i];
            }

            var topSpeedMonthlyAvg = topSpeedSum / topSpeedNum.length;
            
            let avgSpeedSum = 0;

            for (let i = 0; i < avgSpeedNum.length; i += 1) {
                avgSpeedSum += avgSpeedNum[i];
            }
            
            var avgSpeedMonthlyAvg = avgSpeedSum / avgSpeedNum.length;

            const outputData = [

                ["Monthly calories: ", calSum],
                [" Monthly distance: ", distanceSum],
                [" Monthly duration: ", durationSum],
                [" Monthly top speed average: ", topSpeedMonthlyAvg.toFixed(2)],
                [" Monthly average speed average: ", avgSpeedMonthlyAvg.toFixed(2)]

            ];
            //const calSum = caloriesNum[0] + caloriesNum[1];
            res.json({ "message": outputData });

        });
    });

// [GET(/charts/week)] - Gets data for workouts that took place in the last week.
router.route("/week")
    .get((req, res) => {
        fs.readFile('../data/data.csv', 'utf-8', (err, data) => {
            if (err) {
                console.error(err);
                return;
            }

            const calories = [];
            const distance = [];
            const duration = [];
            const topSpeed = [];
            const avgSpeed = [];
            const table = data.split('\n').slice(1);

            table.forEach(row => {
                const columns = row.split(',');
                const now = (new Date()).toISOString().split('T')[0];
                const oneWeekAgo = (new Date(new Date().setDate(new Date().getDate() - 7))).toISOString().split('T')[0];
            
                if(oneWeekAgo <= columns[1] && columns[1] <= now){

                    const WeeklyCalories = columns[2];
                    const WeeklyDistance = columns[3];
                    const WeeklyDuration = columns[4];
                    const WeeklyTopSpeed = columns[5];
                    const WeeklyAvgSpeed = columns[6];

                    calories.push(WeeklyCalories);
                    distance.push(WeeklyDistance);
                    duration.push(WeeklyDuration);
                    topSpeed.push(WeeklyTopSpeed);
                    avgSpeed.push(WeeklyAvgSpeed);
                    

            }
            
            })
            

            const caloriesNum = calories.map(str => {
                return Number(str);
            });

            const distanceNum = distance.map(str => {
                return Number(str);
            });

            const durationNum = duration.map(str => {
                return Number(str);
            });

            const topSpeedNum = topSpeed.map(str => {
                return Number(str);
            });

            const avgSpeedNum = avgSpeed.map(str => {
                return Number(str);
            });

            let calSum = 0;

            for (let i = 0; i < caloriesNum.length; i += 1) {
                calSum += caloriesNum[i];
            }
            
            let distanceSum = 0;

            for (let i = 0; i < distanceNum.length; i += 1) {
                distanceSum += distanceNum[i];
            }

            let durationSum = 0;

            for (let i = 0; i < durationNum.length; i += 1) {
                durationSum += durationNum[i];
            }

            let topSpeedSum = 0;

            for (let i = 0; i < topSpeedNum.length; i += 1) {
                topSpeedSum += topSpeedNum[i];
            }

            var topSpeedWeeklyAvg = topSpeedSum / topSpeedNum.length;
            
            let avgSpeedSum = 0;

            for (let i = 0; i < avgSpeedNum.length; i += 1) {
                avgSpeedSum += avgSpeedNum[i];
            }
            
            var avgSpeedWeeklyAvg = avgSpeedSum / avgSpeedNum.length;

            const outputData = [

                ["Weekly calories: ", calSum],
                [" Weekly distance: ", distanceSum],
                [" Weekly duration: ", durationSum],
                [" Weekly top speed average: ", topSpeedWeeklyAvg.toFixed(2)],
                [" Weekly average speed average: ", avgSpeedWeeklyAvg.toFixed(2)]

            ];
            //const calSum = caloriesNum[0] + caloriesNum[1];
            res.json({ "message": outputData });

        });

    });

module.exports = router;
