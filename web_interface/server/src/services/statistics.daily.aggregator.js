/**
 * 
 * Purpose: To retrieve Workout summary data and aggregate it in terms of daily occurence.
 * Say there are 5 workouts done in a single day, we will have 5 workout summaries subsequently.
 * We will condense those 5 workout summaries into 1 daily workout summary.
 * */

const fs = require('fs');
const { parse } = require("csv-parse");
const inputFilePath = '../../../data/workout-summaries.csv';
const outputFilePath = '../../../data/daily-occurence-statistics.csv';
var outputContent = 'Sample Content';
const dailyWorkoutsArr = [];

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

//File Reader
fs.createReadStream(inputFilePath)
    .pipe(parse({ delimiter: ",", from_line: 2 }))
    .on('data', (row) => {
        const rowStr = row.toString();
        const rowFields = rowStr.split(','); //array containing fields of a row

        dailyWorkoutsArr.push(new DailyOccurenceStatistics(
            rowFields[0],  //workoutSummaryId
            'daily',       //filterType   
            rowFields[1],  //date
            rowFields[2],  //caloriesSum
            rowFields[3],  //distanceSum
            rowFields[4],  //durationSum
            rowFields[5],  //topSpeed
            rowFields[6],  //avgSpeed
            rowFields[7],  //overallBestSplit
        ));

        //console.log(dailyWorkoutsArr);

    })
    .on("end", function () {
        console.log("CSV file successfully processed");
        deleteExistingFile(outputFilePath);
        findSameDayWorkouts();
    })
    .on("error", function (error) {
        console.log(error.message);
    });




function findSameDayWorkouts() {

    const dateArr = dailyWorkoutsArr.map(x => x.date);

    //console.log(dateArr);


    /**
     * Reference: https://attacomsian.com/blog/javascript-array-find-duplicates
     */

    const dateSet = new Set(dateArr);

    const duplicates = dateArr.filter(item => {
        if (dateSet.has(item)) {
            dateSet.delete(item);
        } else {
            return item;
        }
    });

    const duplicateSet = new Set(duplicates); //We would need to aggregate workout summaries of multiple workouts done in the same day into 1 daily workout_summary

    console.log("The duplicate dates:");
    console.log(duplicateSet);

    //Write Output file header
    outputContent = 'workoutSummaryId,filterType,date,caloriesSum,distanceSum,durationSum,topSpeed,avgSpeed,overallBestSplit,numberOfWorkouts,avgCalories,avgDistance,avgDuration,movingSpeedAvg';
    writeOutputFile();
    writeDailyWorkoutSummary(duplicateSet);

}

//Cleaned data
function writeDailyWorkoutSummary(duplicateSet) {
    var previousDuplicateDateItem;

    for (let duplicateDateItem of duplicateSet) {
        dailyWorkoutsArr.filter(DailyOccurenceStatistics => {
            if (DailyOccurenceStatistics.date == duplicateDateItem && DailyOccurenceStatistics.date != previousDuplicateDateItem) {
                outputContent = `${aggregateMultipleWorkoutsIntoDaily(duplicateDateItem)} \n`;
                //outputContent = `${ aggregateMultipleWorkoutsIntoDaily(duplicateDateItem) } duplicate \n`; //For testing
                previousDuplicateDateItem = DailyOccurenceStatistics.date;   //assumption: data is ordered from the input file, so all the duplicates are consecutive

                writeOutputFile();
            }
            else if (DailyOccurenceStatistics.date != duplicateDateItem) {
                //set output file content
                outputContent = `${computeStatisticsForNonDuplicateWorkouts(DailyOccurenceStatistics)} \n`;
                writeOutputFile();
            }

        });
    }
}

function computeStatisticsForNonDuplicateWorkouts(nonDuplicateDailyOccurenceStatistics) {
    //Create a new DailyOccurenceStatistics object
    var newDailyOccurenceStatistics = new DailyOccurenceStatistics(
        nonDuplicateDailyOccurenceStatistics.workoutSummaryId,  //workoutSummaryId
        'daily',                                                //filterType
        nonDuplicateDailyOccurenceStatistics.date,              //date
        nonDuplicateDailyOccurenceStatistics.caloriesSum,       //caloriesSum
        nonDuplicateDailyOccurenceStatistics.distanceSum,       //distanceSum
        nonDuplicateDailyOccurenceStatistics.durationSum,       //durationSum
        nonDuplicateDailyOccurenceStatistics.topSpeed,          //topSpeed
        nonDuplicateDailyOccurenceStatistics.avgSpeed,          //avgSpeed
        nonDuplicateDailyOccurenceStatistics.overallBestSplit,  //overallBestSplit
        1,                                                      //numberOfWorkouts  //since this is not duplicate, there is only 1 total workout
        nonDuplicateDailyOccurenceStatistics.caloriesSum,       //avgCalories       //since numberOfWorkouts is 1, this is unaffected
        nonDuplicateDailyOccurenceStatistics.distanceSum,       //avgDistance       //since numberOfWorkouts is 1, this is unaffected
        nonDuplicateDailyOccurenceStatistics.durationSum,       //avgDuration       //since numberOfWorkouts is 1, this is unaffected
        calculateMovingAverageSpeed()                           //movingSpeedAvg   /* incomplete */
    );

    return newDailyOccurenceStatistics;

}


function aggregateMultipleWorkoutsIntoDaily(duplicateDateItem) {
    var sameDayWorkoutSummaryArr = [];

    //Find all the workout summaries occured in the same day
    dailyWorkoutsArr.filter(DailyOccurenceStatistics => {
        if (DailyOccurenceStatistics.date == duplicateDateItem) {
            sameDayWorkoutSummaryArr.push(DailyOccurenceStatistics);
        }
    });


    //Create a new DailyOccurenceStatistics object
    var newDailyOccurenceStatistics = new DailyOccurenceStatistics(
        selectLowestWorkoutSummaryId(sameDayWorkoutSummaryArr), //workoutSummaryId
        'daily',                                                //filterType
        duplicateDateItem,                                      //date
        caloriesSum(sameDayWorkoutSummaryArr),                  //caloriesSum
        distanceSum(sameDayWorkoutSummaryArr),                  //distanceSum
        durationSum(sameDayWorkoutSummaryArr),                  //durationSum
        selectTopSpeed(sameDayWorkoutSummaryArr),               //topSpeed
        calculateAverageSpeed(sameDayWorkoutSummaryArr),        //avgSpeed
        selectOverallBestSplit(sameDayWorkoutSummaryArr),       //overallBestSplit
        numberOfWorkout(sameDayWorkoutSummaryArr),              //numberOfWorkouts
        calculateAverageCalories(sameDayWorkoutSummaryArr),     //avgCalories
        calculateAverageDistance(sameDayWorkoutSummaryArr),     //avgDistance
        calculateAverageDuration(sameDayWorkoutSummaryArr),     //avgDuration
        calculateMovingAverageSpeed()                           //movingSpeedAvg   /* incomplete */
    );

    console.log("Aggregated workout summaries for the ones that occured on the same day:")
    console.log(newDailyOccurenceStatistics);

    return newDailyOccurenceStatistics;
}


function selectLowestWorkoutSummaryId(sameDayWorkoutSummaryArr) {
    var idArr = [];
    for (const [index, element] of sameDayWorkoutSummaryArr.entries()) {
        idArr.push(element.workoutSummaryId);
    }

    idArr.sort(compareNumbers);

    //We will preserve the lowest workout_summary_id among the workouts done in a single day
    return idArr[0];
}


function compareNumbers(a, b) {
    return a - b;
}


//Calculate total calories- Daily Occurance 
function caloriesSum(sameDayWorkoutSummaryArr) {
    var caloriesArr = [];
    var caloriesSum = 0;

    for (const [index, element] of sameDayWorkoutSummaryArr.entries()) {
        caloriesArr.push(parseFloat(element.caloriesSum));
    }

    //console.log(caloriesArr);

    for (const [index, element] of caloriesArr.entries()) {
        caloriesSum += element;
    }

    return caloriesSum;

}

//Calculate total distance - Daily Occurance 
function distanceSum(sameDayWorkoutSummaryArr) {
    var distanceArr = [];
    var distanceSum = 0;

    for (const [index, element] of sameDayWorkoutSummaryArr.entries()) {
        distanceArr.push(parseFloat(element.distanceSum));
    }

    //console.log(distanceArr);

    for (const [index, element] of distanceArr.entries()) {
        distanceSum += element;
    }

    return distanceSum;
}

//Calculate total duration - Daily Occurance 
function durationSum(sameDayWorkoutSummaryArr) {
    var durationArr = [];
    var durationSum = 0;

    for (const [index, element] of sameDayWorkoutSummaryArr.entries()) {
        durationArr.push(parseFloat(element.durationSum));
    }

    //console.log(durationArr);

    for (const [index, element] of durationArr.entries()) {
        durationSum += element;
    }

    return durationSum;
}

//Select Top Speed - Daily Occurance 
function selectTopSpeed(sameDayWorkoutSummaryArr) {
    var topSpeedArr = [];

    for (const [index, element] of sameDayWorkoutSummaryArr.entries()) {
        topSpeedArr.push(parseFloat(element.topSpeed));
    }

    //console.log(topSpeedArr);

    topSpeedArr.sort(compareNumbers);

    return topSpeedArr[topSpeedArr.length - 1];
}

//calculate avg of avg speeds
function calculateAverageSpeed(sameDayWorkoutSummaryArr) {
    var avgSpeedArr = [];
    var avgSpeedSum = 0;

    for (const [index, element] of sameDayWorkoutSummaryArr.entries()) {
        avgSpeedArr.push(parseFloat(element.avgSpeed));
    }

    //console.log(avgSpeedArr);

    for (const [index, element] of avgSpeedArr.entries()) {
        avgSpeedSum += element;
    }

    return avgSpeedSum / numberOfWorkout(sameDayWorkoutSummaryArr);
}

//select best split?
function selectOverallBestSplit(sameDayWorkoutSummaryArr) {

    //Not used by Group 9
    return '42';
}

//Calculate total number of workouts - Daily Occurance 
function numberOfWorkout(sameDayWorkoutSummaryArr) {

    return sameDayWorkoutSummaryArr.length; //this array contains entries for one instance of a duplicateDateItem
}

//Calculate average calories- Daily Occurance 
function calculateAverageCalories(sameDayWorkoutSummaryArr) {

    return caloriesSum(sameDayWorkoutSummaryArr) / numberOfWorkout(sameDayWorkoutSummaryArr);

}

//Calculate average distance- Daily Occurance 
function calculateAverageDistance(sameDayWorkoutSummaryArr) {

    return distanceSum(sameDayWorkoutSummaryArr) / numberOfWorkout(sameDayWorkoutSummaryArr);

}

//Calculate average duration- Daily Occurance 
function calculateAverageDuration(sameDayWorkoutSummaryArr) {

    return durationSum(sameDayWorkoutSummaryArr) / numberOfWorkout(sameDayWorkoutSummaryArr);

}

//Calculate mov average speed
function calculateMovingAverageSpeed() {

    return 'test';

}

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

function writeOutputFile() {

    //write file
    fs.appendFile(outputFilePath, outputContent, err => {
        if (err) {
            console.error(err);
        }

        // file written successfully
    });
}



