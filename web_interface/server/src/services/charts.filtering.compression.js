function getDailyData(statData, statistics, range){
    let transformData = {};
    let outputData = [];
    let counter = 0;
    let numEl = [];

    for(let i = 0; i < statData.length; i++){
        numEl[i] = 0;
        if(statData[i]['date'] in transformData){
            transformData[statData[i]['date']] += statData[i]['value'];
            numEl[i] += 1;
            
        }
        else{
            transformData[statData[i]['date']] = statData[i]['value'];
            numEl[i] += 1;
        };
    };

    

    for(let i = 0; i < Object.keys(transformData).length; i++){
        const key = Object.keys(transformData)[i];
        var value = transformData[key];

        if(statistics == "Top Speed" || statistics == "Average Speed"){
            value = value/numEl[i];
        };

        outputData.push({
            year: key,
            statistics: statistics,
            Total: value.toFixed(2),
            color: '#3498db'
        });

    }

    /*
    console.log("statData", statData[0]['date']);
    console.log("transformData key of first", Object.keys(transformData)[0]);
    console.log("transformData content of first", transformData[Object.keys(transformData)[0]]);
    console.log("transformDataL", Object.keys(transformData).length);
    console.log("outputData", outputData);
    */
    return outputData;

    



}; //end getDailyData

function getWeeklyData(statData, statistics, range){

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
    let transformData = [];
    let outputData = [];

    for(let i = startYear; i <= currentYear; i++){
        transformData.push(
            { 
                [i]: 0
            }
        );
    };
    let numEl = [];
    for(let i = 0; i < transformData.length; i++){
        numEl[i] = 0;
        for(let j = 0; j < statData.length; j++){
            if(new Date(statData[[j]].date).getFullYear() in transformData[i]){
                transformData[i][[new Date(statData[[j]].date).getFullYear()]] += statData[[j]].value;
                numEl[i] += 1;

            };
        };
    };

    //console.log("keys", Object.keys(transformData[0]));
    //console.log("data", transformData[0][Object.keys(transformData[0])]);

    for(let i = 0; i < transformData.length; i++){
        const key = Object.keys(transformData[i])[0];
        var value = transformData[i][key];

        if(statistics == "Top Speed" || statistics == "Average Speed"){
            value = value/numEl[i];
        };

        outputData.push({
            year: key,
            statistics: statistics,
            Total: value.toFixed(2),
            color: '#3498db'
        });
    };

    //console.log("transformData", transformData);
    //console.log("outputData", outputData);
    for(let i = 0; i < statData.length; i++){
        console.log("statData date", statData[i].date);
    };

    return outputData;

};//end getYearlyData




module.exports = { getDailyData, getWeeklyData, getMonthlyData, getYearlyData };
