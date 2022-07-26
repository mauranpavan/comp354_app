function getDailyData(tableRange, statistics){

    let outputData;
            

    switch(statistics){

        case "Total Distance":
            outputData = tableRange.map(function(element){
                return {
                        date: element.date,
                        distance: Number(element.distance),
                        color: '#3498db'
                    }
            });
            console.log("Total Distance Success");
            break;

        case "Total Calories Burnt":
            outputData = tableRange.map(function(element){
                return {
                        date: element.date,
                        calories: Number(element.calories),
                        color: '#3498db'
                    }
            });
            console.log("Total Calories Burnt Success");
            break;

        case "Total Duration":
            outputData = tableRange.map(function(element){
                return {
                        date: element.date,
                        duration: Number(element.duration),
                        color: '#3498db'
                    }
            });
            console.log("Total Duration Success");
            break;

        case "Top Speed":
            outputData = tableRange.map(function(element){
                return {
                        date: element.date,
                        top_speed: Number(element.top_speed),
                        color: '#3498db'
                    }
            });
            console.log("Top Speed Success");
            break;

        case "Average Speed":
            outputData = tableRange.map(function(element){
                return {
                        date: element.date,
                        avg_speed: Number(element.avg_speed),
                        color: '#3498db'
                    }
            });
            console.log("Average Speed Success");
            break;


    };

    return outputData;

}; //end getDailyData

function getWeeklyData(tableRange, statistics, range, filter){

    


};//end getWeeklyData

function getMonthlyData(tableRange, statistics, range, filter){



};//end getMonthlyData

function getYearlyData(tableRange, statistics, range, filter){



};//end getYearlyData




module.exports = { getDailyData, getWeeklyData, getMonthlyData, getYearlyData };
