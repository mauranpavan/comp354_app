function getDailyData(statData, statistics, range){

    let startYear;
    let currentYear;
    let currentMonth;
    let months = [];
    let startMonth;    
    let days;
    let startDay;
    let currentDay;


    if(range == "All time"){
        startYear = Math.min.apply(Math, statData.map(function(element){
            return new Date(element.date).getFullYear();
        }));
        currentYear = new Date().getFullYear();
        currentMonth = new Date().getMonth();

        statData.filter(function(element){
            if(startYear == new Date(element.date).getFullYear()){
                    months.push(new Date(element.date).getMonth());
            };
        });
        startMonth = Math.min.apply(Math, months);    
        days = [];
        statData.filter(function(element){
            if(startYear == new Date(element.date).getFullYear()){
                if(startMonth == new Date(element.date).getMonth()){
                days.push(new Date(element.date).getDate() + 1); //problem with get date it finds the day before
                };
            };
        });

        startDay = Math.min.apply(Math, days);
        currentDay = new Date().getDate();

    }
    else if(range == "Yearly") {
        startYear = new Date().getFullYear() - 1;
        currentYear = new Date().getFullYear() - 1;
        startMonth = 0;
        currentMonth = 11;
        startDay = 1;
        currentDay = 31;
    }
    else if(range == "Monthly"){
        if(new Date().getMonth() - 1 < 0){
            startYear = new Date().getFullYear() - 1;
            currentYear = new Date().getFullYear() - 1;
            startMonth = 11;
            currentMonth = 11;

        }
        else {
            startYear = new Date().getFullYear();
            currentYear = new Date().getFullYear();
            startMonth = new Date().getMonth() - 1;
            currentMonth = new Date().getMonth() - 1;
        }
            
        

        startDay = 1;
        
        let monthDur2;

        if((startYear % 4) == 0){
            monthDur2 = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        }
        else{
            monthDur2 = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        };

        currentDay = monthDur2[startMonth];
        /*console.log("WMstartYear", startYear);
        console.log("WMcurrentYear", currentYear);
        console.log("WMstartMonth", startMonth);
        console.log("WMcurrentMonth", currentMonth);
        console.log("WMstartDay", startDay);
        console.log("WMcurrentDay", currentDay);*/


    }
    else if(range == "Weekly"){
        let day = new Date().getDay();
        let diff = 7 + day;
        startDay = new Date().getDate() - diff;
        currentDay = new Date().getDate() - day - 1;

        if(startDay < currentDay){
            startMonth = new Date().getMonth();
            currentMonth = new Date().getMonth();
            startYear = new Date().getFullYear();
            currentYear = new Date().getFullYear();
        }
        else {
            startMonth = new Date().getMonth() - 1;
            currentMonth = new Date().getMonth();
            if(startMonth < 0){
                startYear = new Date().getFullYear()-1;
                currentYear = new Date().getFullYear();
            }
            else {
                startYear = new Date().getFullYear();
                currentYear = new Date().getFullYear();

            };
        };
    };

    let monthDur;

    if((startYear % 4) == 0){
        monthDur = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    }
    else{
        monthDur = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    };

    let outputData = [];
    let sum = 0;
    let numEl = 0;


    while(startYear <= currentYear){
        statData.filter(function(element){
            if(startYear == new Date(element.date).getFullYear()){
                if(startMonth == new Date(element.date).getMonth()){
                    if(startDay == new Date(element.date).getDate() + 1){
                        sum += element.value;
                        numEl += 1;
                    };
                };
            };
        });

        if(statistics == "Top Speed" || statistics == "Average Speed"){
            if(numEl == 0){
                numEl = 1;
            };
            sum = sum/numEl;
        };

        outputData.push(
            {
                year: startYear,
                month: startMonth,
                day: startDay,
                statistics: statistics,
                Total: sum.toFixed(2),
                color: '#3498db'
            });

        if(startMonth == currentMonth && startYear == currentYear && startDay == currentDay){
            break;
        }

        startDay += 1;
        sum = 0;
        numEl = 0;

        if(startDay == (monthDur[startMonth] + 1)){
            startDay = 1;
            startMonth += 1;

        };

        if(startMonth == 12){
            startMonth = 0;
            startYear += 1;
        };

        };



    /*console.log("WarrDay:", days);
    console.log("WstartDay:", startDay);
    console.log("WstartMonth:", startMonth);
    console.log("WstartYear:", startYear);
    console.log("outputdata", outputData);*/
    return outputData;

}; //end getDailyData

function getWeeklyData(statData, statistics, range){

    let startYear;
    let currentYear;
    let currentMonth;
    let startDay;

    startYear = Math.min.apply(Math, statData.map(function(element){
            return new Date(element.date).getFullYear();
        }));
    currentYear = new Date().getFullYear();
    currentMonth = new Date().getMonth();

    let months = [];
    statData.filter(function(element){
        if(startYear == new Date(element.date).getFullYear()){
                months.push(new Date(element.date).getMonth());
        };
    });
    let startMonth = Math.min.apply(Math, months);    

    let outputData = [];
    let sum = 0;
    let numEl = 0;

    console.log("WstatData:", statData);


};//end getWeeklyData

function getMonthlyData(statData, statistics, range){

    let startYear;
    let currentYear;
    let currentMonth;

    if(range == "All time"){
        startYear = Math.min.apply(Math, statData.map(function(element){
            return new Date(element.date).getFullYear();
        }));
        currentYear = new Date().getFullYear();
        currentMonth = new Date().getMonth();

    }
    else {
        startYear = new Date().getFullYear() - 1;
        currentYear = new Date().getFullYear() - 1;
        currentMonth = 11;
    };

    let months = [];
    statData.filter(function(element){
        if(startYear == new Date(element.date).getFullYear()){
                months.push(new Date(element.date).getMonth());
        };
    });
    let startMonth = Math.min.apply(Math, months);    

    let outputData = [];
    let sum = 0;
    let numEl = 0;

    while(startYear <= currentYear){
        statData.filter(function(element){
            if(startYear == new Date(element.date).getFullYear()){
                if(startMonth == new Date(element.date).getMonth()){
                    sum += element.value;
                    numEl += 1;
                };
                
            };

        });

        if(statistics == "Top Speed" || statistics == "Average Speed"){
            sum = sum/numEl;
        };

        outputData.push(
            {
                year: startYear,
                month: startMonth,
                statistics: statistics,
                Total: sum.toFixed(2),
                color: '#3498db'
            });

        if(startMonth == currentMonth && startYear == currentYear){
            break;
        }

        startMonth += 1;
        sum = 0;
        numEl = 0;

        if(startMonth == 12){
            startMonth = 0;
            startYear += 1;
        };

        };



    //console.log("MstatData:", statData);
    //console.log("MstartMonth:", startMonth);
    //console.log("MstartYear:", startYear);
    //console.log("Mcurrentyear:", currentYear);
    //console.log("Mcurrentmonth:", currentMonth);
    //console.log("outputData from month", outputData);

    return outputData;

};//end getMonthlyData

function getYearlyData(statData, statistics){

    let startYear = Math.min.apply(Math, statData.map(function(element){
        return new Date(element.date).getFullYear();
    }));
    let currentYear = new Date().getFullYear();
    let outputData = [];
    let sum = 0;
    let numEl = 0;
    

    while(startYear <= currentYear){
        statData.filter(function(element){
            if(startYear == new Date(element.date).getFullYear()){
                sum += element.value;
                numEl += 1;
            }
        });

        if(statistics == "Top Speed" || statistics == "Average Speed"){
            sum = sum/numEl;
        }

        outputData.push(
            {
                year: startYear,
                statistics: statistics,
                Total: sum.toFixed(2),
                color: '#3498db'
            });

        startYear += 1;
        sum = 0;
        numEl = 0;
        };
    //console.log("YstartData:", startYear, "output 2021:", outputData);
    //console.log("currentyear:", currentYear, "type", typeof currentYear);

    return outputData;

};//end getYearlyData




module.exports = { getDailyData, getWeeklyData, getMonthlyData, getYearlyData };
