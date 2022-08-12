
const fs = require('fs');
const { parse } = require("csv-parse");
const path = require('path');

//dayjs module
const dayjs = require('dayjs');
var isoWeek = require('dayjs/plugin/isoWeek'); //ISO
//var daysInMonth = require('dayjs/plugin/daysInMonth');
dayjs.extend(isoWeek);
//dayjs.extend(daysInMonth)

const inputFilePath = path.resolve('../../web_interface/data/weekly-occurence-statistics.csv');
const outputFilePath = path.resolve('../../web_interface/data/monthly-occurence-statistics.csv');
var outputContent = 'Sample Content';
const weeklyOSArr = [];  //weeklyOccurenceStatistics array to group weeks of a month

var month1Arr = [];
var month2Arr = [];
var month3Arr = [];
var month4Arr = [];
var month5Arr = [];
var month6Arr = [];
var month7Arr = [];
var month8Arr = [];
var month9Arr = [];
var month10Arr = [];
var month11Arr = [];
var month12Arr = [];


function WeeklyOccurenceStatistics(
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



    WeeklyOccurenceStatistics.prototype.toString = function weeklyOSToString() {
        return `${this.workoutSummaryId},${this.filterType},${this.date},${this.caloriesSum},${this.distanceSum},${this.durationSum},${this.topSpeed},${this.avgSpeed},${this.overallBestSplit},${this.numberOfWorkouts},${this.avgCalories},${this.avgDistance},${this.avgDuration},${this.movingSpeedAvg}`;
    };
}

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



    MonthlyOccurenceStatistics.prototype.toString = function monthlyOSToString() {
        return `${this.workoutSummaryId},${this.filterType},${this.date},${this.caloriesSum},${this.distanceSum},${this.durationSum},${this.topSpeed},${this.avgSpeed},${this.overallBestSplit},${this.numberOfWorkouts},${this.avgCalories},${this.avgDistance},${this.avgDuration},${this.movingSpeedAvg}`;
    };
}



///File Reader
fs.createReadStream(inputFilePath)
    .pipe(parse({ delimiter: ",", from_line: 2 }))
    .on('data', (row) => {
        const rowStr = row.toString();
        const rowFields = rowStr.split(','); //array containing fields of a row

        weeklyOSArr.push(
            new WeeklyOccurenceStatistics(
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
        aggregateSameMonthWorkouts();
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

function aggregateSameMonthWorkouts() {

    //Assign each value of the weeklyOSArr to the respective Week Number
    weeklyOSArr.filter(WeeklyOccurenceStatistics => {
        var dateArr = (WeeklyOccurenceStatistics.date).split('-');
        var monthNumber = parseFloat(dateArr[1]);
        //console.log("====" + monthNumber);

        switch (monthNumber) {
            case 1:
                month1Arr.push(WeeklyOccurenceStatistics);
                break;
            case 2:
                month2Arr.push(WeeklyOccurenceStatistics);
                break;
            case 3:
                month3Arr.push(WeeklyOccurenceStatistics);
                break;
            case 4:
                month4Arr.push(WeeklyOccurenceStatistics);
                break;
            case 5:
                month5Arr.push(WeeklyOccurenceStatistics);
                break;
            case 6:
                month6Arr.push(WeeklyOccurenceStatistics);
                break;
            case 7:
                month7Arr.push(WeeklyOccurenceStatistics);
                break;
            case 8:
                month8Arr.push(WeeklyOccurenceStatistics);
                break;
            case 9:
                month9Arr.push(WeeklyOccurenceStatistics);
                break;
            case 10:
                month10Arr.push(WeeklyOccurenceStatistics);
                break;
            case 11:
                month11Arr.push(WeeklyOccurenceStatistics);
                break;
            case 12:
                month12Arr.push(WeeklyOccurenceStatistics);
                break;
            default:
                console.log(`Invalid month number: ${monthNumber}.`)
        }
    });


    //Write Output file header
    outputContent = 'workoutSummaryId,filterType,date,caloriesSum,distanceSum,durationSum,topSpeed,avgSpeed,overallBestSplit,numberOfWorkouts,avgCalories,avgDistance,avgDuration,movingSpeedAvg\n';
    writeOutputFile();

    writeMonthlyWorkoutSummary();
}

//Cleaned data
function writeMonthlyWorkoutSummary() {
    outputContent = `${aggregateAllWeeklyOSIntoMonthlyOS()}`;
    writeOutputFile();
}

function aggregateAllWeeklyOSIntoMonthlyOS() {
    var aggregatedOutputContent = '';

    aggregatedOutputContent += aggregateWeeklyOSIntoMonthlyOS('1', month1Arr) + `\n`;
    aggregatedOutputContent += aggregateWeeklyOSIntoMonthlyOS('2', month2Arr) + `\n`;
    aggregatedOutputContent += aggregateWeeklyOSIntoMonthlyOS('3', month3Arr) + `\n`;
    aggregatedOutputContent += aggregateWeeklyOSIntoMonthlyOS('4', month4Arr) + `\n`;
    aggregatedOutputContent += aggregateWeeklyOSIntoMonthlyOS('5', month5Arr) + `\n`;
    aggregatedOutputContent += aggregateWeeklyOSIntoMonthlyOS('6', month6Arr) + `\n`;
    aggregatedOutputContent += aggregateWeeklyOSIntoMonthlyOS('7', month7Arr) + `\n`;
    aggregatedOutputContent += aggregateWeeklyOSIntoMonthlyOS('8', month8Arr) + `\n`;
    aggregatedOutputContent += aggregateWeeklyOSIntoMonthlyOS('9', month9Arr) + `\n`;
    aggregatedOutputContent += aggregateWeeklyOSIntoMonthlyOS('10', month10Arr) + `\n`;
    aggregatedOutputContent += aggregateWeeklyOSIntoMonthlyOS('11', month11Arr) + `\n`;
    aggregatedOutputContent += aggregateWeeklyOSIntoMonthlyOS('12', month12Arr) + `\n`;

    return removeEmptyLinesFromFile(aggregatedOutputContent);
}

//Aggregate the values of the specified month number array into one
function aggregateWeeklyOSIntoMonthlyOS(monthNum, monthNumArr) {

    if (Array.isArray(monthNumArr) && monthNumArr.length != 0) { //if it is an array and not empty

        var newMonthlyOccurenceStatistics = new MonthlyOccurenceStatistics(
            monthNum,                                                //workoutSummaryId
            'monthly',                                               //filterType
            setMonthNumberStartingDate(monthNumArr),                 //date
            caloriesSum(monthNumArr),                                //caloriesSum
            distanceSum(monthNumArr),                                //distanceSum
            durationSum(monthNumArr),                                //durationSum
            selectTopSpeed(monthNumArr),                             //topSpeed
            calculateAverageSpeed(monthNumArr),                      //avgSpeed
            selectOverallBestSplit(monthNumArr),                     //overallBestSplit
            numberOfWorkout(monthNumArr),                            //numberOfWorkouts
            calculateAverageCalories(monthNumArr),                   //avgCalories
            calculateAverageDistance(monthNumArr),                   //avgDistance
            calculateAverageDuration(monthNumArr),                   //avgDuration
            calculateMovingAverageSpeed(monthNumArr)                 //movingSpeedAvg  
        );
        return newMonthlyOccurenceStatistics;
    }
    else
        return '';

}



// currently just set date of the first entry of the array
function setMonthNumberStartingDate(monthNumArr) {

    return monthNumArr[0].date;  /* To be changed if needed  */
}

//Calculate total calories- Monthly Occurance
function caloriesSum(monthNumArr) {
    var caloriesSum = 0;

    //console.log("=========");
    monthNumArr.filter(WeeklyOccurenceStatistics => {
        caloriesSum += parseFloat(parseFloat(WeeklyOccurenceStatistics.caloriesSum).toFixed(2));
    });
    // console.log("=========" + caloriesSum);
    return caloriesSum.toFixed(2);
}


//Calculate total distance - Monthly Occurance 
function distanceSum(monthNumArr) {
    var distanceSum = 0;

    monthNumArr.filter(WeeklyOccurenceStatistics => {
        distanceSum += parseFloat(parseFloat(WeeklyOccurenceStatistics.distanceSum).toFixed(2));
    });

    return distanceSum.toFixed(2);
}

//Calculate total duration - Monthly Occurance 
function durationSum(monthNumArr) {
    var durationSum = 0;

    monthNumArr.filter(WeeklyOccurenceStatistics => {
        durationSum += parseFloat(parseFloat(WeeklyOccurenceStatistics.durationSum).toFixed(2));
    });

    return durationSum.toFixed(2);
}

//Select Top Speed - Monthly Occurance 
function selectTopSpeed(monthNumArr) {
    var topSpeedArr = [];


    monthNumArr.filter(WeeklyOccurenceStatistics => {
        topSpeedArr.push(parseFloat(WeeklyOccurenceStatistics.topSpeed));
    });

    topSpeedArr.sort(compareNumbers);

    return parseFloat(topSpeedArr[topSpeedArr.length - 1]);
}

//Calculate total number of workouts - Monthly Occurance 
function numberOfWorkout(monthNumArr) {
    var numberOfWorkoutArr = [];
    var numberOfWorkoutSum = 0;


    monthNumArr.filter(WeeklyOccurenceStatistics => {
        numberOfWorkoutArr.push(parseFloat(WeeklyOccurenceStatistics.numberOfWorkouts)); //will take into consideration when there were multiple workouts performed in a day
    });

    numberOfWorkoutArr.filter(x => {
        numberOfWorkoutSum += x;
    });

    return numberOfWorkoutSum;
}


//calculate avg of avg speeds - Monthly Occurance   /*  REDO?   */
function calculateAverageSpeed(monthNumArr) {
    var avgSpeedArr = [];
    var avgSpeedSum = 0;

    monthNumArr.filter(WeeklyOccurenceStatistics => {
        avgSpeedArr.push(parseFloat(parseFloat(WeeklyOccurenceStatistics.avgSpeed).toFixed(2)));
    });

    avgSpeedArr.filter(x => {
        avgSpeedSum += parseFloat(x);
    });

    return (avgSpeedSum / numberOfWorkout(monthNumArr)).toFixed(2);
}

//select best split?           /*  TO DO?   */
function selectOverallBestSplit(monthNumArr) {
    return 'm-42';
}


//Calculate average calories - Monthly Occurance   /*  REDO?   */
function calculateAverageCalories(monthNumArr) {

    return (caloriesSum(monthNumArr) / numberOfWorkout(monthNumArr)).toFixed(2);

}

//Calculate average distance - Monthly Occurance   /*  REDO?   */
function calculateAverageDistance(monthNumArr) {

    return (distanceSum(monthNumArr) / numberOfWorkout(monthNumArr)).toFixed(2);

}

//Calculate average duration - Monthly Occurance   /*  REDO?   */
function calculateAverageDuration(monthNumArr) {

    return (durationSum(monthNumArr) / numberOfWorkout(monthNumArr)).toFixed(2);

}

//Calculate mov average speed
function calculateMovingAverageSpeed(monthNumArr) {
    /**
         * SMA = (A1 + A2 + ……….An) / n 
            A is the average in period n
            n is the number of periods  --> n = 28, 29, 30 or day moving average for months
    */

    var avgSpeedArr = [];
    var avgSpeedSum = 0;
    var period = dayjs(monthNumArr[0].date).daysInMonth();// this will give number of days in a month

    monthNumArr.filter(WeeklyOccurenceStatistics => {
        avgSpeedArr.push(parseFloat(parseFloat(WeeklyOccurenceStatistics.avgSpeed).toFixed(2)));
    });

    avgSpeedArr.filter(x => {
        avgSpeedSum += parseFloat(x);
    });

    return (avgSpeedSum / period).toFixed(2);
}
