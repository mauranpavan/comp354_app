//All statistics calculations 

function processData(data, statistic) {

    let statSpecificData = 0;
    var tempArr = [];

    const rows = (data.split('\n').slice(1)).map(function (element) {

        //workout__summary_id,date,calories,distance,duration,top_speed,average_speed,overall_best_split
        return {
            id: element.split(',')[[0][0]],
            date: element.split(',')[[1][0]],
            calories: element.split(',')[[2][0]],
            distance: element.split(',')[[3][0]],
            duration: element.split(',')[[4][0]],
            top_speed: element.split(',')[[5][0]],
            average_speed: element.split(',')[[6][0]],
            overall_best_split: (element.split(',')[[7][0]]).replace('\r', '')
        };
    });

    switch (statistic) {

        case "distance":
            rows.map(function (element) {
                statSpecificData += Number(element.distance);
            });
            break;

        case "duration":
            rows.map(function (element) {
                statSpecificData += Number(element.duration);
            });
            break;

        case "calories":
            rows.map(function (element) {
                statSpecificData += Number(element.calories);
            });
            break;

        case "workouts":
            statSpecificData = Number(rows.length);
            break;

        //Top Performance    
        case "topDistance":
            rows.map(function (element) {
                tempArr.push(Number(element.distance));
            });
            statSpecificData = Math.max.apply(Math, tempArr);
            break;

        case "topDuration":
            rows.map(function (element) {
                tempArr.push(Number(element.duration));
            });
            statSpecificData = Math.max.apply(Math, tempArr);
            break;

        case "topCalories":
            rows.map(function (element) {
                tempArr.push(Number(element.calories));
            });
            statSpecificData = Math.max.apply(Math, tempArr);
            break;

        case "topSpeed":
            rows.map(function (element) {
                tempArr.push(Number(element.top_speed));
            });
            statSpecificData = Math.max.apply(Math, tempArr);
            break;

        case "topAvgSpeed":
            rows.map(function (element) {
                tempArr.push(Number(element.average_speed));
            });
            statSpecificData = Math.max.apply(Math, tempArr);
            break;

    };

    console.log('statSpecificData -  ' + statistic + ': ' + statSpecificData);

    return statSpecificData;
};

module.exports = { processData };
