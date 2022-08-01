const generateRandomColor = () => {
    return `#${(Math.random() * 0xfffff * 1000000).toString(16).slice(0, 6)}`;
};

function getDailyData(statData, statistics) {
    let dailyUniqueData = {};
    let outputData = [];
    let numEl = [];

    for (let i = 0; i < statData.length; i++) {
        numEl[i] = 0;
        if (statData[i]['date'] in dailyUniqueData) {
            dailyUniqueData[statData[i]['date']] += statData[i]['value'];
            numEl[i] += 1;

        }
        else {
            dailyUniqueData[statData[i]['date']] = statData[i]['value'];
            numEl[i] += 1;
        };
    };

    for (let i = 0; i < Object.keys(dailyUniqueData).length; i++) {
        const key = Object.keys(dailyUniqueData)[i];
        var value = dailyUniqueData[key];

        if (statistics == "Top Speed" || statistics == "Average Speed") {
            value = value / numEl[i];
        };

        outputData.push({
            name: key,
            y: +value.toFixed(2),
            value: +value.toFixed(2),
            color: generateRandomColor()
        });

    }
    return outputData;
};

function getWeeklyData(statData, statistics) {
    let transformData = {};
    let outputData = [];
    let numEl = [];
    let day;
    let beg;
    let end;
    let weekTest;

    for (let i = 0; i < statData.length; i++) {
        numEl[i] = 0;
        day = new Date(statData[i]['date']).getDay();
        beg = new Date(statData[i]['date']).getDate() - day;
        end = beg + 6;
        weekTest = new Date(new Date(statData[i]['date']).getFullYear(), new Date(statData[i]['date']).getMonth(), beg).toISOString().split('T')[0]
            + " to " + new Date(new Date(statData[i]['date']).getFullYear(), new Date(statData[i]['date']).getMonth(), end).toISOString().split('T')[0];
        if (weekTest in transformData) {
            transformData[weekTest] += statData[i]['value'];
            numEl[i] += 1;

        }
        else {
            transformData[weekTest] = statData[i]['value'];
            numEl[i] += 1;
        };
    };

    for (let i = 0; i < Object.keys(transformData).length; i++) {
        const key = Object.keys(transformData)[i];
        var value = transformData[key];

        if (statistics == "Top Speed" || statistics == "Average Speed") {
            value = value / numEl[i];
        };

        outputData.push({
            name: key,
            y: +value.toFixed(2),
            color: generateRandomColor()
        });

    };

    return outputData;
};

function getMonthlyData(statData, statistics) {
    let monthlyUniqueData = {};
    let outputData = [];
    let numEl = [];
    let monthTest;

    for (let i = 0; i < statData.length; i++) {
        numEl[i] = 0;
        if ((new Date(statData[i]['date']).getMonth() + 1) < 10) {
            monthTest = `${new Date(statData[i]['date']).getFullYear()}-0${new Date(statData[i]['date']).getMonth() + 1}`;
        }
        else {
            monthTest = `${new Date(statData[i]['date']).getFullYear()}-${new Date(statData[i]['date']).getMonth() + 1}`;
        };
        if (monthTest in monthlyUniqueData) {
            monthlyUniqueData[monthTest] += statData[i]['value'];
            numEl[i] += 1;

        }
        else {
            monthlyUniqueData[monthTest] = statData[i]['value'];
            numEl[i] += 1;
        };
    };



    for (let i = 0; i < Object.keys(monthlyUniqueData).length; i++) {
        const key = Object.keys(monthlyUniqueData)[i];
        var value = monthlyUniqueData[key];

        if (statistics == "Top Speed" || statistics == "Average Speed") {
            value = value / numEl[i];
        };

        outputData.push({
            name: key,
            y: +value.toFixed(2),
            color: generateRandomColor()
        });

    };

    return outputData;
};

function getYearlyData(statData, statistics) {
    let transformData = {};
    let outputData = [];
    let numEl = [];

    for (let i = 0; i < statData.length; i++) {
        numEl[i] = 0;
        if (new Date(statData[i]['date']).getFullYear() in transformData) {
            transformData[new Date(statData[i]['date']).getFullYear()] += statData[i]['value'];
            numEl[i] += 1;

        }
        else {
            transformData[new Date(statData[i]['date']).getFullYear()] = statData[i]['value'];
            numEl[i] += 1;
        };
    };



    for (let i = 0; i < Object.keys(transformData).length; i++) {
        const key = Object.keys(transformData)[i];
        var value = transformData[key];

        if (statistics == "Top Speed" || statistics == "Average Speed") {
            value = value / numEl[i];
        };

        outputData.push({
            name: key,
            y: +value.toFixed(2),
            color: generateRandomColor()
        });

    };

    return outputData;

};

module.exports = { getDailyData, getWeeklyData, getMonthlyData, getYearlyData };
