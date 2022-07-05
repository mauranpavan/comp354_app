/**
 * 
 * Purpose: To retrieve Workout summary data and aggregate it in terms of daily occurence.
 * Say there are 5 workouts done in a single day, we will have 5 workout summaries subsequently.
 * We will condense those 5 workout summaries into 1 daily workout summary.
 * */

const fs = require('fs');
const { parse } = require("csv-parse");
const outputFilePath = '../../../data/daily-occurence-statistics.csv'
var outputContent = 'Sample Content';
const dailyWorkoutsArr = [];



function DailyWorkout(workout__summary_id, date, calories, distance, duration, top_speed, average_speed, overall_best_split) {
    this.workout__summary_id = workout__summary_id;
    this.date = date;
    this.calories = calories;
    this.distance = distance;
    this.duration = duration;
    this.top_speed = top_speed;
    this.average_speed = average_speed;
    this.overall_best_split = overall_best_split;



    DailyWorkout.prototype.toString = function dailyWorkoutToString() {
        return `${this.workout__summary_id},${this.date},${this.calories},${this.distance},${this.duration},${this.top_speed},${this.average_speed},${this.overall_best_split}`;
    };
}

//File Reader
fs.createReadStream('../../../data/workout-summaries.csv')
    .pipe(parse({ delimiter: ",", from_line: 2 }))
    .on('data', (row) => {
        const rowStr = row.toString();
        const rowFields = rowStr.split(','); //array containing fields of a row

        dailyWorkoutsArr.push(new DailyWorkout(rowFields[0], rowFields[1], rowFields[2], rowFields[3], rowFields[4], rowFields[5], rowFields[6], rowFields[7]));

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

    writeDailyWorkoutSummary(duplicateSet);

}

//Cleaned data
function writeDailyWorkoutSummary(duplicateSet) {
    var previousDuplicateDateItem;

    for (let duplicateDateItem of duplicateSet) {
        dailyWorkoutsArr.filter(DailyWorkout => {
            if (DailyWorkout.date == duplicateDateItem && DailyWorkout.date != previousDuplicateDateItem) {
                //outputContent = `${aggregateMultipleWorkoutsIntoDaily(duplicateDateItem)}\n`;
                outputContent = `${aggregateMultipleWorkoutsIntoDaily(duplicateDateItem)} duplicate \n`; //For testing
                previousDuplicateDateItem = DailyWorkout.date;   //assumption: data is ordered from the input file, so all the duplicates are consecutive

                writeOutputFile();
            }
            else if (DailyWorkout.date != duplicateDateItem) {
                //set output file content
                outputContent = `${DailyWorkout}\n`;
                writeOutputFile();
            }

        });
    }
}



function aggregateMultipleWorkoutsIntoDaily(duplicateDateItem) {
    var sameDayWorkoutSummaryArr = [];

    //Find all the workout summaries occured in the same day
    dailyWorkoutsArr.filter(DailyWorkout => {
        if (DailyWorkout.date == duplicateDateItem) {
            sameDayWorkoutSummaryArr.push(DailyWorkout);
        }
    });


    //Create a new DailyWorkout object
    var newDailyWorkout = new DailyWorkout(
        selectLowestWorkoutSummaryId(sameDayWorkoutSummaryArr),
        duplicateDateItem,
        caloriesSum(sameDayWorkoutSummaryArr),
        distanceSum(sameDayWorkoutSummaryArr),
        durationSum(sameDayWorkoutSummaryArr),
        selectTopSpeed(sameDayWorkoutSummaryArr),
        calculateAverageSpeed(sameDayWorkoutSummaryArr),
        selectOverallBestSplit(sameDayWorkoutSummaryArr)
    );

    console.log("Aggregated workout summaries for the ones that occured on the same day:")
    console.log(newDailyWorkout);

    return newDailyWorkout;
}


function selectLowestWorkoutSummaryId(sameDayWorkoutSummaryArr) {
    var idArr = [];
    for (const [index, element] of sameDayWorkoutSummaryArr.entries()) {
        idArr.push(element.workout__summary_id);
    }

    idArr.sort(compareNumbers);

    //We will preserve the lowest workout_summary_id among the workouts done in a single day
    return idArr[0];
}


function compareNumbers(a, b) {
    return a - b;
}


//Calculate total calories - Daily Occurance 
function caloriesSum(sameDayWorkoutSummaryArr) {
    var caloriesArr = [];
    var caloriesSum = 0;

    for (const [index, element] of sameDayWorkoutSummaryArr.entries()) {
        caloriesArr.push(parseFloat(element.calories));
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
        distanceArr.push(parseFloat(element.distance));
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
        durationArr.push(parseFloat(element.duration));
    }

    //console.log(durationArr);

    for (const [index, element] of durationArr.entries()) {
        durationSum += element;
    }

    return durationSum;
}

//Calculate total duration - Daily Occurance 
function selectTopSpeed(sameDayWorkoutSummaryArr) {
    var topSpeedArr = [];

    for (const [index, element] of sameDayWorkoutSummaryArr.entries()) {
        topSpeedArr.push(parseFloat(element.top_speed));
    }

    //console.log(topSpeedArr);

    topSpeedArr.sort(compareNumbers);

    return topSpeedArr[topSpeedArr.length - 1];
}

function calculateAverageSpeed(sameDayWorkoutSummaryArr) {
    var avgSpeedArr = [];
    var avgSpeedSum = 0;

    for (const [index, element] of sameDayWorkoutSummaryArr.entries()) {
        avgSpeedArr.push(parseFloat(element.average_speed));
    }

    //console.log(avgSpeedArr);

    for (const [index, element] of avgSpeedArr.entries()) {
        avgSpeedSum += element;
    }

    return avgSpeedSum / numberOfWorkout(sameDayWorkoutSummaryArr);
}

function selectOverallBestSplit(sameDayWorkoutSummaryArr) {

    //Not used by Group 9
    return '42';
}

//Calculate total number of workouts - Daily Occurance  ***THIS SHOULD BE IN CALCULATOR?***
function numberOfWorkout(sameDayWorkoutSummaryArr) {

    return sameDayWorkoutSummaryArr.length; //this array contains entries for one instance of a duplicateDateItem
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



