const compressionFunction = require("./charts.filtering.compression.js");

function processData(data, range, filter, statistics){

	        const dates = [];
            const calories = [];
            const distance = [];
            const duration = [];
            const topSpeed = [];
            const avgSpeed = [];
            //const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            //const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            
            //const table = (data.split('\n').slice(1));

            const table = (data.split('\n').slice(1)).map(function(element){

                return {id: element.split(',')[[0][0]], date: element.split(',')[[1][0]], 
                calories: element.split(',')[[2][0]], distance: element.split(',')[[3][0]],
                duration: element.split(',')[[4][0]], top_speed: element.split(',')[[5][0]],
                avg_speed: (element.split(',')[[6][0]]).replace('\r', '')
                };
            });

            let startDate;
            let now;
            let tableRange;

            switch(range){

                case "All time":
                    startDate = (new Date("2000-01-01")).toISOString().split('T')[0];
                    now = (new Date()).toISOString().split('T')[0];

                    tableRange = table.filter(function(element){
                        if(startDate <= element.date && element.date <= now){
                            return element;
                        }

                    });
                    break;

                case "Yearly":
                    startDate = (new Date(new Date().setFullYear(new Date().getFullYear() - 1))).toISOString().split('T')[0];
                    now = (new Date()).toISOString().split('T')[0];
                    
                    tableRange = table.filter(function(element){
                        if(startDate <= element.date && element.date <= now){
                            return element;
                        }

                    });
                    break;

                case "Monthly":
                    startDate = (new Date(new Date().setMonth(new Date().getMonth() - 1))).toISOString().split('T')[0];
                    now = (new Date()).toISOString().split('T')[0];

                    tableRange = table.filter(function(element){
                        if(startDate <= element.date && element.date <= now){
                            return element;
                        }

                    });
                    break;

                case "Weekly":
                    startDate = (new Date(new Date().setDate(new Date().getDate() - 7))).toISOString().split('T')[0];
                    now = (new Date()).toISOString().split('T')[0];

                    tableRange = table.filter(function(element){
                        if(startDate <= element.date && element.date <= now){
                            return element;
                        }

                    });
                    break;

                default:
                    console.log("default")

            };
            /*
            var sum = 0;
            tableRange.map(element => {
                sum += Number(element.distance);
            });
            */

            let filteredData;

            switch(filter){

                case "Daily":
                    filteredData = compressionFunction.getDailyData(tableRange, statistics);
                    break;

                case "Weekly":
                    filteredData = compressionFunction.getWeeklyData(tableRange, statistics, range, filter);
                    console.log("Weekly success");
                    break;

                case "Monthly":
                    filteredData = compressionFunction.getMonthlyData(tableRange, statistics, range, filter);
                    console.log("Monthly success");
                    break;

                case "Yearly":
                    filteredData = compressionFunction.getYearlyData(tableRange, statistics, range, filter);
                    console.log("Yearly success");
                    break;

            };

            //console.log("filteredData", filteredData);
            //console.log("distance sum:", sum);
            return filteredData;

/*
            let outputData;

            switch(statistics){

                case "Total Distance":
                    outputData = filteredData.map(function(element){
                        return {
                                date: element.date,
                                day: `${ weekday[new Date(element.date).getDay() + 1] }`, // would become a day of the week
                                dayNum: `${ new Date(element.date).getDate() + 1 }`,
                                month: `${ month[new Date(element.date).getMonth()] }`,
                                year: `${ new Date(element.date).getFullYear() }`,
                                distance: Number(element.distance),
                                color: '#3498db'
                            }
                    });
                    console.log("Total Distance Success");
                    break;

                case "Total Calories Burnt":
                    outputData = filteredData.map(function(element){
                        return {
                                date: element.date,
                                day: `${ weekday[new Date(element.date).getDay() + 1] }`, // would become a day of the week
                                dayNum: `${ new Date(element.date).getDate() + 1 }`,
                                month: `${ month[new Date(element.date).getMonth()] }`,
                                year: `${ new Date(element.date).getFullYear() }`,
                                calories: Number(element.calories),
                                color: '#3498db'
                            }
                    });
                    console.log("Total Calories Burnt Success");
                    break;

                case "Total Duration":
                    outputData = filteredData.map(function(element){
                        return {
                                date: element.date,
                                day: `${ weekday[new Date(element.date).getDay() + 1] }`, // would become a day of the week
                                dayNum: `${ new Date(element.date).getDate() + 1 }`,
                                month: `${ month[new Date(element.date).getMonth()] }`,
                                year: `${ new Date(element.date).getFullYear() }`,
                                duration: Number(element.duration),
                                color: '#3498db'
                            }
                    });
                    console.log("Total Duration Success");
                    break;

                case "Top Speed":
                    outputData = filteredData.map(function(element){
                        return {
                                date: element.date,
                                day: `${ weekday[new Date(element.date).getDay() + 1] }`, // would become a day of the week
                                dayNum: `${ new Date(element.date).getDate() + 1 }`,
                                month: `${ month[new Date(element.date).getMonth()] }`,
                                year: `${ new Date(element.date).getFullYear() }`,
                                top_speed: Number(element.top_speed),
                                color: '#3498db'
                            }
                    });
                    console.log("Top Speed Success");
                    break;

                case "Average Speed":
                    outputData = filteredData.map(function(element){
                        return {
                                date: element.date,
                                day: `${ weekday[new Date(element.date).getDay() + 1] }`, // would become a day of the week
                                dayNum: `${ new Date(element.date).getDate() + 1 }`,
                                month: `${ month[new Date(element.date).getMonth()] }`,
                                year: `${ new Date(element.date).getFullYear() }`,
                                avg_speed: Number(element.avg_speed),
                                color: '#3498db'
                            }
                    });
                    console.log("Average Speed Success");
                    break;


            };
*/

            console.log(outputData);

            return outputData;



            /*
            const dataTable = (data.split('\n').slice(1)).map(function(element){
                return (element.split(','));
            });
            */

            //console.log("table", dataTable[0][1]);

            //console.log("table: ", table)
            //console.log(test());
/*
            table.forEach(row => {
                const rows = row.split(',');
                //console.log(rows.map(element));
                //console.log("Rows: ", rows)
                const now = (new Date()).toISOString().split('T')[0];
                
            
                if(startDate <= rows[1] && rows[1] <= now){



                    const Dates = rows[1];
                    const Calories = rows[2];
                    const Distance = rows[3];
                    const Duration = rows[4];
                    const TopSpeed = rows[5];
                    const AvgSpeed = rows[6];

                    dates.push(Dates);
                    calories.push(Calories);
                    distance.push(Distance);
                    duration.push(Duration);
                    topSpeed.push(TopSpeed);
                    avgSpeed.push(AvgSpeed);
                    

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


            if(filter == "Daily"){

                if(statistics == "Total Distance"){

                    const outputData = [];

                    for (let i = 0; i < dates.length; i++){
                        outputData.push(

                            {
                                date: `${ dates[i] }`,
                                day: `${ weekday[new Date(dates[i]).getDay()] }`, // would become a day of the week
                                dayNum: `${ new Date(dates[i]).getDate()+1 }`,
                                month: `${ month[new Date(dates[i]).getMonth()] }`,
                                year: `${ new Date(dates[i]).getFullYear() }`,
                                distance: distanceNum[i],
                                color: '#3498db'
                            }

                        );
                    }

                    return outputData
                }

                if(statistics == "Total Calories Burnt"){

                    const outputData = [];

                    for (let i = 0; i < dates.length; i++){
                        outputData.push(

                            {
                                date: `${ dates[i] }`,
                                day: `${ weekday[new Date(dates[i]).getDay()] }`, // would become a day of the week
                                dayNum: `${ new Date(dates[i]).getDate()+1 }`,
                                month: `${ month[new Date(dates[i]).getMonth()] }`,
                                year: `${ new Date(dates[i]).getFullYear() }`,
                                calories: caloriesNum[i],
                                color: '#3498db'
                            }

                        );
                    }

                    return outputData
                }

                if(statistics == "Total Duration"){

                    const outputData = [];

                    for (let i = 0; i < dates.length; i++){
                        outputData.push(

                            {
                                date: `${ dates[i] }`,
                                day: `${ weekday[new Date(dates[i]).getDay()] }`, // would become a day of the week
                                dayNum: `${ new Date(dates[i]).getDate()+1 }`,
                                month: `${ month[new Date(dates[i]).getMonth()] }`,
                                year: `${ new Date(dates[i]).getFullYear() }`,
                                duration: durationNum[i],
                                color: '#3498db'
                            }

                        );
                    }

                    return outputData
                }

                if(statistics == "Top Speed"){

                    const outputData = [];

                    for (let i = 0; i < dates.length; i++){
                        outputData.push(

                            {
                                date: `${ dates[i] }`,
                                day: `${ weekday[new Date(dates[i]).getDay()] }`, // would become a day of the week
                                dayNum: `${ new Date(dates[i]).getDate()+1 }`,
                                month: `${ month[new Date(dates[i]).getMonth()] }`,
                                year: `${ new Date(dates[i]).getFullYear() }`,
                                Top_speed:topSpeedNum[i],
                                color: '#3498db'
                            }

                        );
                    }

                    return outputData
                }

                if(statistics == "Average Speed"){

                    const outputData = [];

                    for (let i = 0; i < dates.length; i++){
                        outputData.push(

                            {
                                date: `${ dates[i] }`,
                                day: `${ weekday[new Date(dates[i]).getDay()] }`, // would become a day of the week
                                dayNum: `${ new Date(dates[i]).getDate()+1 }`,
                                month: `${ month[new Date(dates[i]).getMonth()] }`,
                                year: `${ new Date(dates[i]).getFullYear() }`,
                                Average_speed: avgSpeedNum[i],
                                color: '#3498db'
                            }

                        );
                    }

                    return outputData
                }
                
            } //end Daily Filter

            if(filter == range){

                if(statistics == "Total Distance"){

                    let distanceSum = 0;

                    for (let i = 0; i < distanceNum.length; i++) {
                        distanceSum += distanceNum[i];
                    }

                    const outputData = [

                            {
                                filter: `${ range }`,
                                distance: distanceSum,
                                color: '#3498db'
                            }
                    ];

                    return outputData
                }

                if(statistics == "Total Calories Burnt"){

                    let calSum = 0;

                    for (let i = 0; i < caloriesNum.length; i += 1) {
                        calSum += caloriesNum[i];
                    }

                    const outputData = [

                            {
                                filter: `${ range }`,
                                calories: calSum,
                                color: '#3498db'
                            }
                    ];

                    return outputData
                }

                if(statistics == "Total Duration"){

                    let durationSum = 0;

                    for (let i = 0; i < durationNum.length; i += 1) {
                        durationSum += durationNum[i];
                    }

                    const outputData = [

                            {
                                filter: `${ range }`,
                                duration: durationSum.toFixed(2),
                                color: '#3498db'
                            }
                    ];

                    return outputData
                }

                if(statistics == "Top Speed"){

                    let topSpeedSum = 0;

                    for (let i = 0; i < topSpeedNum.length; i += 1) {
                        topSpeedSum += topSpeedNum[i];
                    }

                    var topSpeedAvg = topSpeedSum / topSpeedNum.length;

                    const outputData = [

                            {
                                filter: `${ range }`,
                                avg_top_speed: topSpeedAvg.toFixed(2),
                                color: '#3498db'
                            }
                    ];

                    return outputData
                }

                if(statistics == "Average Speed"){

                    let avgSpeedSum = 0;

                    for (let i = 0; i < avgSpeedNum.length; i += 1) {
                        avgSpeedSum += avgSpeedNum[i];
                    }
            
                    var avgSpeedAvg = avgSpeedSum / avgSpeedNum.length;

                    const outputData = [

                            {
                                filter: `${ range }`,
                                avg_speed_avg: avgSpeedAvg.toFixed(2),
                                color: '#3498db'
                            }
                    ];

                    return outputData
                }
                
            } //end filter = range

            if(filter == "Weekly"){

                return "success W"

            } //end Weekly

            if(filter == "Monthly"){

                return "success M"
                
            } //end Montly

            if(filter == "Yearly"){

                return "success Y"
                
            } //end Yearly

*/
            /*
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

            var topSpeedAvg = topSpeedSum / topSpeedNum.length;
            
            let avgSpeedSum = 0;

            for (let i = 0; i < avgSpeedNum.length; i += 1) {
                avgSpeedSum += avgSpeedNum[i];
            }
            
            var avgSpeedAvg = avgSpeedSum / avgSpeedNum.length;

            const outputData = [

                [`${ range } calories: `, calSum],
                [` ${ range } distance: `, distanceSum],
                [` ${ range } duration: `, durationSum.toFixed(2)],
                [` ${ range } top speed average: `, topSpeedAvg.toFixed(2)],
                [` ${ range } average speed average: `, avgSpeedAvg.toFixed(2)]

            ];

            return outputData;
            */



};

module.exports = { processData };
