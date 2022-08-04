
const fs = require('fs');
const { parse } = require("csv-parse");
const path = require('path');

//dayjs module
const dayjs = require('dayjs');
var isoWeek = require('dayjs/plugin/isoWeek'); //ISO
dayjs.extend(isoWeek);

const inputFilePath = path.resolve('../../web_interface/data/monthly-occurence-statistics.csv');
const outputFilePath = path.resolve('../../web_interface/data/yearly-occurence-statistics.csv');
var outputContent = 'Sample Content';
const monthlyOSArr = [];  //monthlyOccurenceStatistics array to group months of a given year

/*
* Would need to figure out way when processing data from many years.
* Current way will account for 10 years of data
*/
var year1Arr = [];
var year2Arr = [];
var year3Arr = [];
var year4Arr = [];
var year5Arr = [];
var year6Arr = [];
var year7Arr = [];
var year8Arr = [];
var year9Arr = [];
var year10Arr = [];


function MonthlyOccurenceStatistics(
    workoutSummaryId,
    filterType,
    date,
    caloriesSum,
    distanceSum,
    durationSum,
    topSpeed,
    avgSpeed,
    overallBestSplit,
    numberOfWorkouts,
    avgCalories,
    avgDistance,
    avgDuration,
    movingSpeedAvg
) {
    this.workoutSummaryId = workoutSummaryId;
    this.filterType = filterType;
    this.date = date;
    this.caloriesSum = caloriesSum;
    this.distanceSum = distanceSum;
    this.durationSum = durationSum;
    this.topSpeed = topSpeed;
    this.avgSpeed = avgSpeed;
    this.overallBestSplit = overallBestSplit;
    this.numberOfWorkouts = numberOfWorkouts;
    this.avgCalories = avgCalories;
    this.avgDistance = avgDistance;
    this.avgDuration = avgDuration;
    this.movingSpeedAvg = movingSpeedAvg;



    MonthlyOccurenceStatistics.prototype.toString = function yearlyOSToString() {
        return `${this.workoutSummaryId},${this.filterType},${this.date},${this.caloriesSum},${this.distanceSum},${this.durationSum},${this.topSpeed},${this.avgSpeed},${this.overallBestSplit},${this.numberOfWorkouts},${this.avgCalories},${this.avgDistance},${this.avgDuration},${this.movingSpeedAvg}`;
    };
}

function YearlyOccurenceStatistics(
    workoutSummaryId,
    filterType,
    date,
    caloriesSum,
    distanceSum,
    durationSum,
    topSpeed,
    avgSpeed,
    overallBestSplit,
    numberOfWorkouts,
    avgCalories,
    avgDistance,
    avgDuration,
    movingSpeedAvg
) {
    this.workoutSummaryId = workoutSummaryId;
    this.filterType = filterType;
    this.date = date;
    this.caloriesSum = caloriesSum;
    this.distanceSum = distanceSum;
    this.durationSum = durationSum;
    this.topSpeed = topSpeed;
    this.avgSpeed = avgSpeed;
    this.overallBestSplit = overallBestSplit;
    this.numberOfWorkouts = numberOfWorkouts;
    this.avgCalories = avgCalories;
    this.avgDistance = avgDistance;
    this.avgDuration = avgDuration;
    this.movingSpeedAvg = movingSpeedAvg;

    YearlyOccurenceStatistics.prototype.toString = function yearlyOSToString() {
        return `${this.workoutSummaryId},${this.filterType},${this.date},${this.caloriesSum},${this.distanceSum},${this.durationSum},${this.topSpeed},${this.avgSpeed},${this.overallBestSplit},${this.numberOfWorkouts},${this.avgCalories},${this.avgDistance},${this.avgDuration},${this.movingSpeedAvg}`;
    };
}


///File Reader
fs.createReadStream(inputFilePath)
    .pipe(parse({ delimiter: ",", from_line: 2 }))
    .on('data', (row) => {
        const rowStr = row.toString();
        const rowFields = rowStr.split(','); //array containing fields of a row

        monthlyOSArr.push(
            new MonthlyOccurenceStatistics(
                rowFields[0],    //workoutSummaryId
                rowFields[1],    //filterType
                rowFields[2],    //date
                rowFields[3],    //caloriesSum
                rowFields[4],    //distanceSum
                rowFields[5],    //durationSum
                rowFields[6],    //topSpeed
                rowFields[7],    //avgSpeed
                rowFields[8],    //overallBestSplit
                rowFields[9],    //numberOfWorkouts
                rowFields[10],   //avgCalories
                rowFields[11],   //avgDistance
                rowFields[12],   //avgDuration
                rowFields[13]    //movingSpeedAvg   
            ));
    })
    .on("end", function () {
        console.log("CSV file successfully processed");
        deleteExistingFile(outputFilePath);
        aggregateSameYearWorkouts();
    })
    .on("error", function (error) {
        console.log(error.message);
    });


//Delete previous file
function deleteExistingFile(outputFilePath) {
    try {
        if (fs.existsSync(outputFilePath)) {
            //file exists
            fs.unlinkSync(outputFilePath, function (err) {
                if (err)
                    console.error(err);
            });
        }
    } catch (err) {
        console.error(err)
    }
}

//write file
function writeOutputFile() {
    fs.appendFile(outputFilePath, outputContent, err => {
        if (err) {
            console.error(err);
        }

        // file written successfully
    });
}


function compareNumbers(a, b) {
    return a - b;
}

/*
* Reference: https://txtfiddle.com/~i44veub/remove-empty-lines
*/
function removeEmptyLinesFromFile(inputStr) {

    return inputStr.split(/\r?\n/) // Split input text into an array of lines
        .filter(line => line.trim() !== "") // Filter out lines that are empty or contain only whitespace
        .join("\n");
}

function aggregateSameYearWorkouts() {

    //Assign each value of the monthlyOSArr to the respective Week Number
    monthlyOSArr.filter(MonthlyOccurenceStatistics => {
        var dateArr = (MonthlyOccurenceStatistics.date).split('-');
        var yearNumber = parseFloat(dateArr[0]);

        switch (yearNumber) {
            case 2016:
                year1Arr.push(MonthlyOccurenceStatistics);
                break;
            case 2017:
                year2Arr.push(MonthlyOccurenceStatistics);
                break;
            case 2018:
                year3Arr.push(MonthlyOccurenceStatistics);
                break;
            case 2019:
                year4Arr.push(MonthlyOccurenceStatistics);
                break;
            case 2020:
                year5Arr.push(MonthlyOccurenceStatistics);
                break;
            case 2021:
                year6Arr.push(MonthlyOccurenceStatistics);
                break;
            case 2022:
                year7Arr.push(MonthlyOccurenceStatistics);
                break;
            case 2023:
                year8Arr.push(MonthlyOccurenceStatistics);
                break;
            case 2024:
                year9Arr.push(MonthlyOccurenceStatistics);
                break;
            case 2025:
                year10Arr.push(MonthlyOccurenceStatistics);
                break;
            default:
                console.log(`Invalid year number: ${yearNumber}.`)
        }
    });


    //Write Output file header
    outputContent = 'workoutSummaryId,filterType,date,caloriesSum,distanceSum,durationSum,topSpeed,avgSpeed,overallBestSplit,numberOfWorkouts,avgCalories,avgDistance,avgDuration,movingSpeedAvg\n';
    writeOutputFile();

    writeMonthlyWorkoutSummary();
}

//Cleaned data
function writeMonthlyWorkoutSummary() {
    outputContent = `${aggregateAllMonthlyOSIntoYearlyOS()}`;
    writeOutputFile();
}

function aggregateAllMonthlyOSIntoYearlyOS() {
    var aggregatedOutputContent = '';

    //Concatenating a decade worth of data in terms of yearly occurence
    aggregatedOutputContent += aggregateMonthlyOSIntoYearlyOS('2016', year1Arr) + `\n`;
    aggregatedOutputContent += aggregateMonthlyOSIntoYearlyOS('2017', year2Arr) + `\n`;
    aggregatedOutputContent += aggregateMonthlyOSIntoYearlyOS('2018', year3Arr) + `\n`;
    aggregatedOutputContent += aggregateMonthlyOSIntoYearlyOS('2019', year4Arr) + `\n`;
    aggregatedOutputContent += aggregateMonthlyOSIntoYearlyOS('2020', year5Arr) + `\n`;
    aggregatedOutputContent += aggregateMonthlyOSIntoYearlyOS('2021', year6Arr) + `\n`;
    aggregatedOutputContent += aggregateMonthlyOSIntoYearlyOS('2022', year7Arr) + `\n`;
    aggregatedOutputContent += aggregateMonthlyOSIntoYearlyOS('2023', year8Arr) + `\n`;
    aggregatedOutputContent += aggregateMonthlyOSIntoYearlyOS('2024', year9Arr) + `\n`;
    aggregatedOutputContent += aggregateMonthlyOSIntoYearlyOS('2025', year10Arr) + `\n`;

    return removeEmptyLinesFromFile(aggregatedOutputContent);
}

//Aggregate the values of the specified year number array into one
function aggregateMonthlyOSIntoYearlyOS(yearNum, yearNumArr) {

    if (Array.isArray(yearNumArr) && yearNumArr.length != 0) { //if it is an array and not empty

        var newYearlyOccurenceStatistics = new YearlyOccurenceStatistics(
            yearNum,                                                //workoutSummaryId
            'yearly',                                               //filterType
            setYearNumberStartingDate(yearNumArr),                  //date
            caloriesSum(yearNumArr),                                //caloriesSum
            distanceSum(yearNumArr),                                //distanceSum
            durationSum(yearNumArr),                                //durationSum
            selectTopSpeed(yearNumArr),                             //topSpeed
            calculateAverageSpeed(yearNumArr),                      //avgSpeed
            selectOverallBestSplit(yearNumArr),                     //overallBestSplit
            numberOfWorkout(yearNumArr),                            //numberOfWorkouts
            calculateAverageCalories(yearNumArr),                   //avgCalories
            calculateAverageDistance(yearNumArr),                   //avgDistance
            calculateAverageDuration(yearNumArr),                   //avgDuration
            calculateMovingAverageSpeed()                           //movingSpeedAvg   /* incomplete */
        );
        return newYearlyOccurenceStatistics;
    }
    else
        return '';

}



// currently just set date of the first entry of the array
function setYearNumberStartingDate(yearNumArr) {

    return yearNumArr[0].date;  /* To be changed if needed  */
}

//Calculate total calories- Monthly Occurance
function caloriesSum(yearNumArr) {
    var caloriesSum = 0;

    //console.log("=========");
    yearNumArr.filter(MonthlyOccurenceStatistics => {
        caloriesSum += parseFloat(parseFloat(MonthlyOccurenceStatistics.caloriesSum).toFixed(2));
    });
    // console.log("=========" + caloriesSum);
    return caloriesSum;
}


//Calculate total distance - Monthly Occurance 
function distanceSum(yearNumArr) {
    var distanceSum = 0;

    yearNumArr.filter(MonthlyOccurenceStatistics => {
        distanceSum += parseFloat(parseFloat(MonthlyOccurenceStatistics.distanceSum).toFixed(2));
    });

    return distanceSum;
}

//Calculate total duration - Monthly Occurance 
function durationSum(yearNumArr) {
    var durationSum = 0;

    yearNumArr.filter(MonthlyOccurenceStatistics => {
        durationSum += parseFloat(parseFloat(MonthlyOccurenceStatistics.durationSum).toFixed(2));
    });

    return durationSum;
}

//Select Top Speed - Monthly Occurance 
function selectTopSpeed(yearNumArr) {
    var topSpeedArr = [];


    yearNumArr.filter(MonthlyOccurenceStatistics => {
        topSpeedArr.push(parseFloat(MonthlyOccurenceStatistics.topSpeed));
    });

    topSpeedArr.sort(compareNumbers);

    return parseFloat(topSpeedArr[topSpeedArr.length - 1]);
}

//Calculate total number of workouts - Monthly Occurance 
function numberOfWorkout(yearNumArr) {
    var numberOfWorkoutArr = [];
    var numberOfWorkoutSum = 0;


    yearNumArr.filter(MonthlyOccurenceStatistics => {
        numberOfWorkoutArr.push(parseFloat(MonthlyOccurenceStatistics.numberOfWorkouts)); //will take into consideration when there were multiple workouts performed in a day
    });

    numberOfWorkoutArr.filter(x => {
        numberOfWorkoutSum += x;
    });

    return numberOfWorkoutSum;
}


//calculate avg of avg speeds - Monthly Occurance   /*  REDO?   */
function calculateAverageSpeed(yearNumArr) {
    var avgSpeedArr = [];
    var avgSpeedSum = 0;

    yearNumArr.filter(MonthlyOccurenceStatistics => {
        avgSpeedArr.push(parseFloat(parseFloat(MonthlyOccurenceStatistics.avgSpeed).toFixed(2)));
    });

    avgSpeedArr.filter(x => {
        avgSpeedSum += parseFloat(x);
    });

    return avgSpeedSum / numberOfWorkout(yearNumArr);
}

//select best split?           /*  TO DO?   */
function selectOverallBestSplit(yearNumArr) {
    return 'y-42';
}


//Calculate average calories - Monthly Occurance   /*  REDO?   */
function calculateAverageCalories(yearNumArr) {

    return caloriesSum(yearNumArr) / numberOfWorkout(yearNumArr);

}

//Calculate average distance - Monthly Occurance   /*  REDO?   */
function calculateAverageDistance(yearNumArr) {

    return distanceSum(yearNumArr) / numberOfWorkout(yearNumArr);

}

//Calculate average duration - Monthly Occurance   /*  REDO?   */
function calculateAverageDuration(yearNumArr) {

    return durationSum(yearNumArr) / numberOfWorkout(yearNumArr);

}

//Calculate mov average speed
function calculateMovingAverageSpeed() {

    return 'y-test';

}
