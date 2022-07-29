const compressionFunction = require("./charts.filtering.compression.js");

function processData(data, range, filter, statistics) {

    const rows = (data.split('\n').slice(1)).map(function (element) {

        return {
            id: element.split(',')[[0][0]], date: element.split(',')[[1][0]],
            calories: element.split(',')[[2][0]], distance: element.split(',')[[3][0]],
            duration: element.split(',')[[4][0]], top_speed: element.split(',')[[5][0]],
            avg_speed: (element.split(',')[[6][0]]).replace('\r', '')
        };
    });

    let startDate;
    let endDate;
    let rangeFilteredData;

    switch (range) {

        case "All time":
            rangeFilteredData = rows;
            break;

        case "Year":
            startDate = (new Date((new Date().getFullYear() - 1), new Date().getMonth(), new Date().getDate())).toISOString().split('T')[0];
            endDate = new Date().toISOString().split('T')[0];

            console.log("Ystart Date", startDate);
            console.log("YFinal Date", endDate);

            rangeFilteredData = rows.filter(function (element) {
                if (startDate <= element.date && element.date <= endDate) {
                    return element;
                }

            });
            break;

        case "Month":
            startDate = new Date(new Date().getFullYear(), new Date().getMonth() - 1, new Date().getDate()).toISOString().split('T')[0];
            endDate = new Date().toISOString().split('T')[0];
            console.log("MstartDate", startDate);
            console.log("MendDate", endDate);

            rangeFilteredData = rows.filter(function (element) {
                if (startDate <= element.date && element.date <= endDate) {
                    return element;
                };

            });

            break;

        case "Week":
            startDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 7).toISOString().split('T')[0];
            endDate = new Date().toISOString().split('T')[0];

            rangeFilteredData = rows.filter(function (element) {
                if (startDate <= element.date && element.date <= endDate) {
                    return element;
                }

            });
            console.log("tableRange:", rangeFilteredData)
            break;

        default:
            console.log("default")

    };

    let statSpecificData;

    switch (statistics) {

        case "Total Distance":
            statSpecificData = rangeFilteredData.map(function (element) {
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
            statSpecificData = rangeFilteredData.map(function (element) {
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
            statSpecificData = rangeFilteredData.map(function (element) {
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
            statSpecificData = rangeFilteredData.map(function (element) {
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
            statSpecificData = rangeFilteredData.map(function (element) {
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

    let filteredData;

    switch (filter) {

        case "Daily":
            filteredData = compressionFunction.getDailyData(statSpecificData, statistics, range);
            break;

        case "Weekly":
            filteredData = compressionFunction.getWeeklyData(statSpecificData, statistics, range);
            console.log("Weekly success");
            break;

        case "Monthly":
            filteredData = compressionFunction.getMonthlyData(statSpecificData, statistics, range);
            console.log("Monthly success");
            break;

        case "Yearly":
            filteredData = compressionFunction.getYearlyData(statSpecificData, statistics);
            console.log("Yearly success");
            break;

    };

    return filteredData;
};

module.exports = { processData };
