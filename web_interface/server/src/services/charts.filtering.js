const compressionFunction = require("./charts.filtering.compression.js");

function processData(data, range, filter, statistics){

	        const dates = [];
            const calories = [];
            const distance = [];
            const duration = [];
            const topSpeed = [];
            const avgSpeed = [];

            const table = (data.split('\n').slice(1)).map(function(element){

                return {id: element.split(',')[[0][0]], date: element.split(',')[[1][0]], 
                calories: element.split(',')[[2][0]], distance: element.split(',')[[3][0]],
                duration: element.split(',')[[4][0]], top_speed: element.split(',')[[5][0]],
                avg_speed: (element.split(',')[[6][0]]).replace('\r', '')
                };
            });

            let startDate;
            let endDate;
            let tableRange;
            let monthDur;

            switch(range){

                case "All time":
                    tableRange = table.filter(function(element){
                            return element;
                    });

                    //console.log("tableRange", tableRange)
                    break;

                case "Year":
                    //startDate = new Date(new Date(new Date((new Date().setFullYear(new Date().getFullYear() - 1))).setMonth(0)).setDate(1)).toISOString().split('T')[0];
                    //endDate = new Date(new Date(new Date((new Date().setFullYear(new Date().getFullYear() - 1))).setMonth(11)).setDate(31)).toISOString().split('T')[0];

                    startDate = (new Date((new Date().getFullYear()-1), 0, 1)).toISOString().split('T')[0];
                    endDate = (new Date((new Date().getFullYear()-1), 11, 31)).toISOString().split('T')[0];

                    console.log("Ystart Date", startDate);
                    console.log("YFinal Date", endDate);
                    
                    tableRange = table.filter(function(element){
                        if(startDate <= element.date && element.date <= endDate){
                            return element;
                        }

                    });
                    break;

                case "Month":
                    startDate = new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1).toISOString().split('T')[0];
                    endDate = new Date(new Date().getFullYear(), new Date().getMonth(), 0).toISOString().split('T')[0];
                    console.log("MstartDate", startDate);
                    console.log("MendDate", endDate);

                    tableRange = table.filter(function(element){
                        if(startDate <= element.date && element.date <= endDate){
                            return element;
                        };

                    });

                    break;

                case "Week":
                    startDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 7).toISOString().split('T')[0];
                    endDate = new Date().toISOString().split('T')[0];
                    console.log("WstartDate", startDate);
                    console.log("WendDate", endDate);

                    tableRange = table.filter(function(element){
                        if(startDate <= element.date && element.date <= endDate){
                            return element;
                        }

                    });
                    console.log("tableRange:", tableRange)
                    break;

                default:
                    console.log("default")

            };

            let statData;
            
            switch(statistics){

                case "Total Distance":
                    statData = tableRange.map(function(element){
                    return {
                        date: element.date,
                        statistic: statistics,
                        value: Number(element.distance),
                        color: '#3498db'
                    }
                });
                console.log("Total Distance Success");
                break;

            case "Total Calories Burnt":
                statData = tableRange.map(function(element){
                    return {
                        date: element.date,
                        statistic: statistics,
                        value: Number(element.calories),
                        color: '#3498db'
                    }
                });
                console.log("Total Calories Burnt Success");
                break;

            case "Total Duration":
                statData = tableRange.map(function(element){
                    return {
                        date: element.date,
                        statistic: statistics,
                        value: Number(element.duration),
                        color: '#3498db'
                    }
                });
            console.log("Total Duration Success");
            break;

            case "Top Speed":
                statData = tableRange.map(function(element){
                    return {
                        date: element.date,
                        statistic: statistics,
                        value: Number(element.top_speed),
                        color: '#3498db'
                    }
                });
                console.log("Top Speed Success");
                break;

            case "Average Speed":
                statData = tableRange.map(function(element){
                    return {
                        date: element.date,
                        statistic: statistics,
                        value: Number(element.avg_speed),
                        color: '#3498db'
                    }
                });
            console.log("Average Speed Success");
            break;


            };
            //console.log("statData", statData);
            
            
            let filteredData;

            switch(filter){

                case "Daily":
                    filteredData = compressionFunction.getDailyData(statData, statistics, range);
                    break;

                case "Weekly":
                    filteredData = compressionFunction.getWeeklyData(statData, statistics, range);
                    console.log("Weekly success");
                    break;

                case "Monthly":
                    filteredData = compressionFunction.getMonthlyData(statData, statistics, range);
                    console.log("Monthly success");
                    break;

                case "Yearly":
                    filteredData = compressionFunction.getYearlyData(statData, statistics);
                    console.log("Yearly success");
                    break;

            };

            //console.log("distance sum:", sum);
            return filteredData;

};

module.exports = { processData };
