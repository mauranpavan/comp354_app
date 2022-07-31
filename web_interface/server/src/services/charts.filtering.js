const compressionFunction = require("./charts.filtering.compression.js");

function processData(data, range, filter, statistic) {

    const rows = (data.split('\n').slice(1)).map(function (element) {

        return {
            id: element.split(',')[[0][0]], date: element.split(',')[[1][0]],
            calories: element.split(',')[[2][0]], distance: element.split(',')[[3][0]],
            duration: element.split(',')[[4][0]], elevation_gain: element.split(',')[[5][0]],
            top_speed: element.split(',')[[6][0]], avg_speed: (element.split(',')[[7][0]]).replace('\r', '')
        };
    });

    const sortedRows = rows.sort((a, b) => new Date(a.date) - new Date(b.date));

    let startDate;
    let endDate;
    let rangeFilteredData;

    switch (range) {

        case "year":
            startDate = (new Date((new Date().getFullYear() - 1), new Date().getMonth(), new Date().getDate())).toISOString().split('T')[0];
            endDate = new Date().toISOString().split('T')[0];

            rangeFilteredData = sortedRows.filter(function (element) {
                if (startDate <= element.date && element.date <= endDate) {
                    return element;
                }

            });
            break;

        case "month":
            startDate = new Date(new Date().getFullYear(), new Date().getMonth() - 1, new Date().getDate()).toISOString().split('T')[0];
            endDate = new Date().toISOString().split('T')[0];

            rangeFilteredData = sortedRows.filter(function (element) {
                if (startDate <= element.date && element.date <= endDate) {
                    return element;
                };

            });

            break;

        case "week":
            startDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 7).toISOString().split('T')[0];
            endDate = new Date().toISOString().split('T')[0];

            rangeFilteredData = sortedRows.filter(function (element) {
                if (startDate <= element.date && element.date <= endDate) {
                    return element;
                }

            });
            break;

        default:
            rangeFilteredData = sortedRows;

    };

    let statSpecificData;

    switch (statistic) {

        case "total distance":
            statSpecificData = rangeFilteredData.map(function (element) {
                return {
                    date: element.date,
                    statistic: statistic,
                    value: Number(element.distance),
                }
            });
            break;

        case "total calories burnt":
            statSpecificData = rangeFilteredData.map(function (element) {
                return {
                    date: element.date,
                    statistic: statistic,
                    value: Number(element.calories),
                }
            });
            break;

        case "total duration":
            statSpecificData = rangeFilteredData.map(function (element) {
                return {
                    date: element.date,
                    statistic: statistic,
                    value: Number(element.duration),
                }
            });
            break;

        case "top speed":
            statSpecificData = rangeFilteredData.map(function (element) {
                return {
                    date: element.date,
                    statistic: statistic,
                    value: Number(element.top_speed),
                }
            });
            break;

        case "average speed":
            statSpecificData = rangeFilteredData.map(function (element) {
                return {
                    date: element.date,
                    statistic: statistic,
                    value: Number(element.avg_speed),
                }
            });
            break;

        case "total elevation gain":
            statSpecificData = rangeFilteredData.map(function (element) {
                return {
                    date: element.date,
                    statistic: statistic,
                    value: Number(element.elevation_gain),
                }
            });
            break;
    };

    let filteredData;

    switch (filter) {

        case "daily":
            filteredData = compressionFunction.getDailyData(statSpecificData, statistic, range);
            break;

        case "weekly":
            filteredData = compressionFunction.getWeeklyData(statSpecificData, statistic, range);
            break;

        case "monthly":
            filteredData = compressionFunction.getMonthlyData(statSpecificData, statistic, range);
            break;

        case "yearly":
            filteredData = compressionFunction.getYearlyData(statSpecificData, statistic);
            break;

    };

    return filteredData;
};

module.exports = { processData };
