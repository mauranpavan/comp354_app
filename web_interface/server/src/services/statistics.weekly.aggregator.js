/*
  Given dailyWorkoutSummaries, here we aggregate:
  - aggregated-workout-summaries into dailyOccurenceStatistics
  - dailyOccurenceStatistics     into weeklyOccurenceStatistics
  - weeklyOccurenceStatistics    into monthlyOccurenceStatistics
  - monthlyOccurenceStatistics   into yearlyOccurenceStatistics
*/


const fs = require('fs');
const { parse } = require("csv-parse");
const path = require('path');
//dayjs module
const dayjs = require('dayjs');
var isoWeek = require('dayjs/plugin/isoWeek'); //ISO
dayjs.extend(isoWeek);
const inputFilePath = path.resolve('../../web_interface/data/daily-occurence-statistics.csv');
const outputFilePath = path.resolve('../../web_interface/data/weekly-occurence-statistics.csv');

var outputContent = 'Sample Content';
const dailyOSArr = [];  //dailyOccurenceStatistics array to group days of a week
const weeklyWSArr = [];  //weekly WorkoutSummary(WS) array

var week1Arr = [];
var week2Arr = [];
var week3Arr = [];
var week4Arr = [];
var week5Arr = [];
var week6Arr = [];
var week7Arr = [];
var week8Arr = [];
var week9Arr = [];
var week10Arr = [];
var week11Arr = [];
var week12Arr = [];
var week13Arr = [];
var week14Arr = [];
var week15Arr = [];
var week16Arr = [];
var week17Arr = [];
var week18Arr = [];
var week19Arr = [];
var week20Arr = [];
var week21Arr = [];
var week22Arr = [];
var week23Arr = [];
var week24Arr = [];
var week25Arr = [];
var week26Arr = [];
var week27Arr = [];
var week28Arr = [];
var week29Arr = [];
var week30Arr = [];
var week31Arr = [];
var week32Arr = [];
var week33Arr = [];
var week34Arr = [];
var week35Arr = [];
var week36Arr = [];
var week37Arr = [];
var week38Arr = [];
var week39Arr = [];
var week40Arr = [];
var week41Arr = [];
var week42Arr = [];
var week43Arr = [];
var week44Arr = [];
var week45Arr = [];
var week46Arr = [];
var week47Arr = [];
var week48Arr = [];
var week49Arr = [];
var week50Arr = [];
var week51Arr = [];
var week52Arr = [];
var week53Arr = []; //leap week

function DailyOccurenceStatistics(
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
    this.workoutSummaryId = workoutSummaryId;   //given
    this.filterType = filterType;
    this.date = date;                           //given
    this.caloriesSum = caloriesSum;             //given
    this.distanceSum = distanceSum;             //given
    this.durationSum = durationSum;             //given
    this.topSpeed = topSpeed;                   //given
    this.avgSpeed = avgSpeed;                   //given
    this.overallBestSplit = overallBestSplit;   //given
    this.numberOfWorkouts = numberOfWorkouts;
    this.avgCalories = avgCalories;
    this.avgDistance = avgDistance;
    this.avgDuration = avgDuration;
    this.movingSpeedAvg = movingSpeedAvg;



    DailyOccurenceStatistics.prototype.toString = function dailyWorkoutToString() {
        return `${this.workoutSummaryId},${this.filterType},${this.date},${this.caloriesSum},${this.distanceSum},${this.durationSum},${this.topSpeed},${this.avgSpeed},${this.overallBestSplit},${this.numberOfWorkouts},${this.avgCalories},${this.avgDistance},${this.avgDuration},${this.movingSpeedAvg}`;
    };
}

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



///File Reader
fs.createReadStream(inputFilePath)
    .pipe(parse({ delimiter: ",", from_line: 2 }))
    .on('data', (row) => {
        const rowStr = row.toString();
        const rowFields = rowStr.split(','); //array containing fields of a row

        dailyOSArr.push(
            new DailyOccurenceStatistics(
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
        aggregateSameWeekWorkouts();
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


function aggregateSameWeekWorkouts() {

    //Assign each value of the dailyOSArr to the respective Week Number
    dailyOSArr.filter(DailyOccurenceStatistics => {
        var weekNumber = dayjs(DailyOccurenceStatistics.date).isoWeek();
        //console.log("====" + weekNumber);

        switch (weekNumber) {
            case 1:
                week1Arr.push(DailyOccurenceStatistics);
                break;
            case 2:
                week2Arr.push(DailyOccurenceStatistics);
                break;
            case 3:
                week3Arr.push(DailyOccurenceStatistics);
                break;
            case 4:
                week4Arr.push(DailyOccurenceStatistics);
                break;
            case 5:
                week5Arr.push(DailyOccurenceStatistics);
                break;
            case 6:
                week6Arr.push(DailyOccurenceStatistics);
                break;
            case 7:
                week7Arr.push(DailyOccurenceStatistics);
                break;
            case 8:
                week8Arr.push(DailyOccurenceStatistics);
                break;
            case 9:
                week9Arr.push(DailyOccurenceStatistics);
                break;
            case 10:
                week10Arr.push(DailyOccurenceStatistics);
                break;
            case 11:
                week11Arr.push(DailyOccurenceStatistics);
                break;
            case 12:
                week12Arr.push(DailyOccurenceStatistics);
                break;
            case 13:
                week13Arr.push(DailyOccurenceStatistics);
                break;
            case 14:
                week14Arr.push(DailyOccurenceStatistics);
                break;
            case 15:
                week15Arr.push(DailyOccurenceStatistics);
                break;
            case 16:
                week16Arr.push(DailyOccurenceStatistics);
                break;
            case 17:
                week17Arr.push(DailyOccurenceStatistics);
                break;
            case 18:
                week18Arr.push(DailyOccurenceStatistics);
                break;
            case 19:
                week19Arr.push(DailyOccurenceStatistics);
                break;
            case 20:
                week20Arr.push(DailyOccurenceStatistics);
                break;
            case 21:
                week21Arr.push(DailyOccurenceStatistics);
                break;
            case 22:
                week22Arr.push(DailyOccurenceStatistics);
                break;
            case 23:
                week23Arr.push(DailyOccurenceStatistics);
                break;
            case 24:
                week24Arr.push(DailyOccurenceStatistics);
                break;
            case 25:
                week25Arr.push(DailyOccurenceStatistics);
                break;
            case 26:
                week26Arr.push(DailyOccurenceStatistics);
                break;
            case 27:
                week27Arr.push(DailyOccurenceStatistics);
                break;
            case 28:
                week28Arr.push(DailyOccurenceStatistics);
                break;
            case 29:
                week29Arr.push(DailyOccurenceStatistics);
                break;
            case 30:
                week30Arr.push(DailyOccurenceStatistics);
                break;
            case 31:
                week31Arr.push(DailyOccurenceStatistics);
                break;
            case 32:
                week32Arr.push(DailyOccurenceStatistics);
                break;
            case 33:
                week33Arr.push(DailyOccurenceStatistics);
                break;
            case 34:
                week34Arr.push(DailyOccurenceStatistics);
                break;
            case 35:
                week35Arr.push(DailyOccurenceStatistics);
                break;
            case 36:
                week36Arr.push(DailyOccurenceStatistics);
                break;
            case 37:
                week37Arr.push(DailyOccurenceStatistics);
                break;
            case 38:
                week38Arr.push(DailyOccurenceStatistics);
                break;
            case 39:
                week39Arr.push(DailyOccurenceStatistics);
                break;
            case 40:
                week40Arr.push(DailyOccurenceStatistics);
                break;
            case 41:
                week41Arr.push(DailyOccurenceStatistics);
                break;
            case 42:
                week42Arr.push(DailyOccurenceStatistics);
                break;
            case 43:
                week43Arr.push(DailyOccurenceStatistics);
                break;
            case 44:
                week44Arr.push(DailyOccurenceStatistics);
                break;
            case 45:
                week45Arr.push(DailyOccurenceStatistics);
                break;
            case 46:
                week46Arr.push(DailyOccurenceStatistics);
                break;
            case 47:
                week47Arr.push(DailyOccurenceStatistics);
                break;
            case 48:
                week48Arr.push(DailyOccurenceStatistics);
                break;
            case 49:
                week49Arr.push(DailyOccurenceStatistics);
                break;
            case 50:
                week50Arr.push(DailyOccurenceStatistics);
                break;
            case 51:
                week51Arr.push(DailyOccurenceStatistics);
                break;
            case 52:
                week52Arr.push(DailyOccurenceStatistics);
                break;
            case 53:
                week53Arr.push(DailyOccurenceStatistics);
                break;
            default:
                console.log(`Invalid week number: ${weekNumber}.`)
        }
    });


    //Aggregate DailyOS in each weekNumber array into a WeeklyOS.
    console.log('week');
    console.log(week17Arr);
    console.log('week 2');
    console.log(week20Arr);

    //Write Output file header
    outputContent = 'workoutSummaryId,filterType,date,caloriesSum,distanceSum,durationSum,topSpeed,avgSpeed,overallBestSplit,numberOfWorkouts,avgCalories,avgDistance,avgDuration,movingSpeedAvg\n';
    writeOutputFile();
    writeWeeklyWorkoutSummary();
}

//Cleaned data
function writeWeeklyWorkoutSummary() {
    outputContent = `${aggregateAllDailyOSIntoWeeklyOS()}`;
    writeOutputFile();
}

function aggregateAllDailyOSIntoWeeklyOS() {
    var aggregatedOutputContent = '';

    aggregatedOutputContent += aggregateDailyOSIntoWeeklyOS(week1Arr) + `\n`;
    aggregatedOutputContent += aggregateDailyOSIntoWeeklyOS(week2Arr) + `\n`;
    aggregatedOutputContent += aggregateDailyOSIntoWeeklyOS(week3Arr) + `\n`;
    aggregatedOutputContent += aggregateDailyOSIntoWeeklyOS(week4Arr) + `\n`;
    aggregatedOutputContent += aggregateDailyOSIntoWeeklyOS(week5Arr) + `\n`;
    aggregatedOutputContent += aggregateDailyOSIntoWeeklyOS(week6Arr) + `\n`;
    aggregatedOutputContent += aggregateDailyOSIntoWeeklyOS(week7Arr) + `\n`;
    aggregatedOutputContent += aggregateDailyOSIntoWeeklyOS(week8Arr) + `\n`;
    aggregatedOutputContent += aggregateDailyOSIntoWeeklyOS(week9Arr) + `\n`;
    aggregatedOutputContent += aggregateDailyOSIntoWeeklyOS(week10Arr) + `\n`;
    aggregatedOutputContent += aggregateDailyOSIntoWeeklyOS(week11Arr) + `\n`;
    aggregatedOutputContent += aggregateDailyOSIntoWeeklyOS(week12Arr) + `\n`;
    aggregatedOutputContent += aggregateDailyOSIntoWeeklyOS(week13Arr) + `\n`;
    aggregatedOutputContent += aggregateDailyOSIntoWeeklyOS(week14Arr) + `\n`;
    aggregatedOutputContent += aggregateDailyOSIntoWeeklyOS(week15Arr) + `\n`;
    aggregatedOutputContent += aggregateDailyOSIntoWeeklyOS(week16Arr) + `\n`;
    aggregatedOutputContent += aggregateDailyOSIntoWeeklyOS(week17Arr) + `\n`;
    aggregatedOutputContent += aggregateDailyOSIntoWeeklyOS(week18Arr) + `\n`;
    aggregatedOutputContent += aggregateDailyOSIntoWeeklyOS(week19Arr) + `\n`;
    aggregatedOutputContent += aggregateDailyOSIntoWeeklyOS(week20Arr) + `\n`;
    aggregatedOutputContent += aggregateDailyOSIntoWeeklyOS(week21Arr) + `\n`;
    aggregatedOutputContent += aggregateDailyOSIntoWeeklyOS(week22Arr) + `\n`;
    aggregatedOutputContent += aggregateDailyOSIntoWeeklyOS(week23Arr) + `\n`;
    aggregatedOutputContent += aggregateDailyOSIntoWeeklyOS(week24Arr) + `\n`;
    aggregatedOutputContent += aggregateDailyOSIntoWeeklyOS(week25Arr) + `\n`;
    aggregatedOutputContent += aggregateDailyOSIntoWeeklyOS(week26Arr) + `\n`;
    aggregatedOutputContent += aggregateDailyOSIntoWeeklyOS(week27Arr) + `\n`;
    aggregatedOutputContent += aggregateDailyOSIntoWeeklyOS(week28Arr) + `\n`;
    aggregatedOutputContent += aggregateDailyOSIntoWeeklyOS(week29Arr) + `\n`;
    aggregatedOutputContent += aggregateDailyOSIntoWeeklyOS(week30Arr) + `\n`;
    aggregatedOutputContent += aggregateDailyOSIntoWeeklyOS(week31Arr) + `\n`;
    aggregatedOutputContent += aggregateDailyOSIntoWeeklyOS(week32Arr) + `\n`;
    aggregatedOutputContent += aggregateDailyOSIntoWeeklyOS(week33Arr) + `\n`;
    aggregatedOutputContent += aggregateDailyOSIntoWeeklyOS(week34Arr) + `\n`;
    aggregatedOutputContent += aggregateDailyOSIntoWeeklyOS(week35Arr) + `\n`;
    aggregatedOutputContent += aggregateDailyOSIntoWeeklyOS(week36Arr) + `\n`;
    aggregatedOutputContent += aggregateDailyOSIntoWeeklyOS(week37Arr) + `\n`;
    aggregatedOutputContent += aggregateDailyOSIntoWeeklyOS(week38Arr) + `\n`;
    aggregatedOutputContent += aggregateDailyOSIntoWeeklyOS(week39Arr) + `\n`;
    aggregatedOutputContent += aggregateDailyOSIntoWeeklyOS(week40Arr) + `\n`;
    aggregatedOutputContent += aggregateDailyOSIntoWeeklyOS(week41Arr) + `\n`;
    aggregatedOutputContent += aggregateDailyOSIntoWeeklyOS(week42Arr) + `\n`;
    aggregatedOutputContent += aggregateDailyOSIntoWeeklyOS(week43Arr) + `\n`;
    aggregatedOutputContent += aggregateDailyOSIntoWeeklyOS(week44Arr) + `\n`;
    aggregatedOutputContent += aggregateDailyOSIntoWeeklyOS(week45Arr) + `\n`;
    aggregatedOutputContent += aggregateDailyOSIntoWeeklyOS(week46Arr) + `\n`;
    aggregatedOutputContent += aggregateDailyOSIntoWeeklyOS(week47Arr) + `\n`;
    aggregatedOutputContent += aggregateDailyOSIntoWeeklyOS(week48Arr) + `\n`;
    aggregatedOutputContent += aggregateDailyOSIntoWeeklyOS(week49Arr) + `\n`;
    aggregatedOutputContent += aggregateDailyOSIntoWeeklyOS(week50Arr) + `\n`;
    aggregatedOutputContent += aggregateDailyOSIntoWeeklyOS(week51Arr) + `\n`;
    aggregatedOutputContent += aggregateDailyOSIntoWeeklyOS(week52Arr) + `\n`;
    aggregatedOutputContent += aggregateDailyOSIntoWeeklyOS(week53Arr) + `\n`;

    return removeEmptyLinesFromFile(aggregatedOutputContent);
}

//Aggregate the values of the specified week number array into one
function aggregateDailyOSIntoWeeklyOS(weekNumArr) {

    if (Array.isArray(weekNumArr) && weekNumArr.length) { //if it is an array and not empty

        //Create a new DailyOccurenceStatistics object
        var newWeeklyOccurenceStatistics = new WeeklyOccurenceStatistics(
            setWorkoutSummaryIdAsWeekNumber(weekNumArr),            //workoutSummaryId
            'weekly',                                               //filterType
            setWeekNumberStartingDate(weekNumArr),                  //date
            caloriesSum(weekNumArr),                                //caloriesSum
            distanceSum(weekNumArr),                                //distanceSum
            durationSum(weekNumArr),                                //durationSum
            selectTopSpeed(weekNumArr),                             //topSpeed
            calculateAverageSpeed(weekNumArr),                      //avgSpeed
            selectOverallBestSplit(weekNumArr),                     //overallBestSplit
            numberOfWorkout(weekNumArr),                            //numberOfWorkouts
            calculateAverageCalories(weekNumArr),                   //avgCalories
            calculateAverageDistance(weekNumArr),                   //avgDistance
            calculateAverageDuration(weekNumArr),                   //avgDuration
            calculateMovingAverageSpeed(weekNumArr)                 //movingSpeedAvg   
        );
        return newWeeklyOccurenceStatistics;
    }
    else
        return '';

}

function setWorkoutSummaryIdAsWeekNumber(weekNumArr) {

    return dayjs(weekNumArr[0].date).isoWeek()
}

// currently just set date of the first entry of the array
function setWeekNumberStartingDate(weekNumArr) {

    return weekNumArr[0].date;  /* To be fixed if needed  */
}

//Calculate total calories- Weekly Occurance
function caloriesSum(weekNumArr) {
    var caloriesSum = 0;

    //console.log("=========");
    weekNumArr.filter(DailyOccurenceStatistics => {
        //console.log("========= dailyOS " + DailyOccurenceStatistics.caloriesSum);
        caloriesSum += parseFloat(parseFloat(DailyOccurenceStatistics.caloriesSum).toFixed(2));
    });
    // console.log("=========" + caloriesSum);
    return caloriesSum;
}


//Calculate total distance - Weekly Occurance 
function distanceSum(weekNumArr) {
    var distanceSum = 0;

    weekNumArr.filter(DailyOccurenceStatistics => {
        distanceSum += parseFloat(parseFloat(DailyOccurenceStatistics.distanceSum).toFixed(2));
    });

    return distanceSum;
}

//Calculate total duration - Weekly Occurance 
function durationSum(weekNumArr) {
    var durationSum = 0;

    weekNumArr.filter(DailyOccurenceStatistics => {
        durationSum += parseFloat(parseFloat(DailyOccurenceStatistics.durationSum).toFixed(2));
    });

    return durationSum;
}

//Select Top Speed - Weekly Occurance 
function selectTopSpeed(weekNumArr) {
    var topSpeedArr = [];


    weekNumArr.filter(DailyOccurenceStatistics => {
        topSpeedArr.push(parseFloat(DailyOccurenceStatistics.topSpeed));
    });

    topSpeedArr.sort(compareNumbers);

    return parseFloat(topSpeedArr[topSpeedArr.length - 1]);
}

//Calculate total number of workouts - Weekly Occurance 
function numberOfWorkout(weekNumArr) {
    var numberOfWorkoutArr = [];
    var numberOfWorkoutSum = 0;


    weekNumArr.filter(DailyOccurenceStatistics => {
        numberOfWorkoutArr.push(parseFloat(DailyOccurenceStatistics.numberOfWorkouts)); //will take into consideration when there were multiple workouts performed in a day
    });

    numberOfWorkoutArr.filter(x => {
        numberOfWorkoutSum += x;
    });

    return numberOfWorkoutSum;
}


//calculate avg of avg speeds - Weekly Occurance   /*  REDO?   */
function calculateAverageSpeed(weekNumArr) {
    var avgSpeedArr = [];
    var avgSpeedSum = 0;

    weekNumArr.filter(DailyOccurenceStatistics => {
        avgSpeedArr.push(parseFloat(parseFloat(DailyOccurenceStatistics.avgSpeed).toFixed(2)));
    });

    avgSpeedArr.filter(x => {
        avgSpeedSum += parseFloat(x);
    });

    return avgSpeedSum / numberOfWorkout(weekNumArr);
}

//select best split?           /*  TO DO?   */
function selectOverallBestSplit(weekNumArr) {
    return 'w-42';
}


//Calculate average calories - Weekly Occurance   /*  REDO?   */
function calculateAverageCalories(weekNumArr) {

    return caloriesSum(weekNumArr) / numberOfWorkout(weekNumArr);

}

//Calculate average distance - Weekly Occurance   /*  REDO?   */
function calculateAverageDistance(weekNumArr) {

    return distanceSum(weekNumArr) / numberOfWorkout(weekNumArr);

}

//Calculate average duration - Weekly Occurance   /*  REDO?   */
function calculateAverageDuration(weekNumArr) {

    return durationSum(weekNumArr) / numberOfWorkout(weekNumArr);

}

//Calculate mov average speed
function calculateMovingAverageSpeed(weekNumArr) {
    /**
     * SMA = (A1 + A2 + ……….An) / n 
        A is the average in period n
        n is the number of periods  --> n = 7 day moving average
     */

    var avgSpeedArr = [];
    var avgSpeedSum = 0;
    var period = 7;

    weekNumArr.filter(DailyOccurenceStatistics => {
        avgSpeedArr.push(parseFloat(parseFloat(DailyOccurenceStatistics.avgSpeed).toFixed(2)));
    });

    avgSpeedArr.filter(x => {
        avgSpeedSum += parseFloat(x);
    });

    return avgSpeedSum / period;

}
