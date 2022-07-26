function getDailyData(tableRange, statistics){

    let outputData;
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            

    switch(statistics){

        case "Total Distance":
            outputData = tableRange.map(function(element){
                return {
                        date: element.date,
                        day: `${ weekday[new Date(element.date).getDay() + 1] }`, // would become a day of the week
                        dayNum: `${ new Date(element.date).getDate() + 1 }`,
                        month: `${ month[new Date(element.date).getMonth()] }`,
                        year: `${ new Date(element.date).getFullYear() }`,
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
                      day: `${ weekday[new Date(element.date).getDay() + 1] }`, // would become a day of the week
                        dayNum: `${ new Date(element.date).getDate() + 1 }`,
                        month: `${ month[new Date(element.date).getMonth()] }`,
                        year: `${ new Date(element.date).getFullYear() }`,
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
                        day: `${ weekday[new Date(element.date).getDay() + 1] }`, // would become a day of the week
                        dayNum: `${ new Date(element.date).getDate() + 1 }`,
                        month: `${ month[new Date(element.date).getMonth()] }`,
                        year: `${ new Date(element.date).getFullYear() }`,
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
                         day: `${ weekday[new Date(element.date).getDay() + 1] }`, // would become a day of the week
                        dayNum: `${ new Date(element.date).getDate() + 1 }`,
                        month: `${ month[new Date(element.date).getMonth()] }`,
                        year: `${ new Date(element.date).getFullYear() }`,
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
                        day: `${ weekday[new Date(element.date).getDay() + 1] }`, // would become a day of the week
                        dayNum: `${ new Date(element.date).getDate() + 1 }`,
                        month: `${ month[new Date(element.date).getMonth()] }`,
                        year: `${ new Date(element.date).getFullYear() }`,
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
