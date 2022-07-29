function getDailyData(statData, statistics){
    let transformData = {};
    let outputData = [];
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
            date: key,
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

function getWeeklyData(statData, statistics){
    let transformData = {};
    let outputData = [];
    let numEl = [];
    let monthTest;
    let day;
    let beg;
    let end;
    let weekTest;

    for(let i = 0; i < statData.length; i++){
        numEl[i] = 0;
        day = new Date(statData[i]['date']).getDay();
        beg = new Date(statData[i]['date']).getDate() - day;
        end = beg + 6;
        weekTest = new Date(new Date(statData[i]['date']).getFullYear(), 
            new Date(statData[i]['date']).getMonth(), 
            beg).toISOString().split('T')[0] + " to " + new Date(new Date(statData[i]['date']).getFullYear(), 
            new Date(statData[i]['date']).getMonth(), 
            end).toISOString().split('T')[0];
        if(weekTest in transformData){
            transformData[weekTest] += statData[i]['value'];
            numEl[i] += 1;
            
        }
        else{
            transformData[weekTest] = statData[i]['value'];
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
            week: key,
            statistics: statistics,
            Total: value.toFixed(2),
            color: '#3498db'
        });

    };

/*
    console.log("statData:", statData);
    console.log("Wday:", day);
    console.log("Wcurrday:", new Date(statData[0]['date']));
    console.log("Wbeg:", beg);
    console.log("Wend:", end);
    console.log("weekTest:", weekTest);
    console.log("Wdate:", statData[0]['date']);
*/
    return outputData;

};//end getWeeklyData

function getMonthlyData(statData, statistics){
    let transformData = {};
    let outputData = [];
    let numEl = [];
    let monthTest;

    for(let i = 0; i < statData.length; i++){
        numEl[i] = 0;
        if((new Date(statData[i]['date']).getMonth() + 1) < 10){
            monthTest = `${ new Date(statData[i]['date']).getFullYear() }`+"-0"+`${ new Date(statData[i]['date']).getMonth() + 1 }`;
        }
        else{
            monthTest = `${ new Date(statData[i]['date']).getFullYear() }`+"-"+`${ new Date(statData[i]['date']).getMonth() + 1 }`;
        };
        if(monthTest in transformData){
            transformData[monthTest] += statData[i]['value'];
            numEl[i] += 1;
            
        }
        else{
            transformData[monthTest] = statData[i]['value'];
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
            month: key,
            statistics: statistics,
            Total: value.toFixed(2),
            color: '#3498db'
        });

    };

    //console.log("month try", `${ new Date(statData[0]['date']).getFullYear() }`+"-0"+`${ new Date(statData[0]['date']).getMonth() + 1 }`)

    /*
    console.log("statData", statData[0]['date']);
    console.log("transformData key of first", Object.keys(transformData)[0]);
    console.log("transformData content of first", transformData[Object.keys(transformData)[0]]);
    console.log("transformDataL", Object.keys(transformData).length);
    console.log("outputData", outputData);
    */
    return outputData;



};//end getMonthlyData

function getYearlyData(statData, statistics){
    let transformData = {};
    let outputData = [];
    let numEl = [];

    for(let i = 0; i < statData.length; i++){
        numEl[i] = 0;
        if(new Date(statData[i]['date']).getFullYear() in transformData){
            transformData[new Date(statData[i]['date']).getFullYear()] += statData[i]['value'];
            numEl[i] += 1;
            
        }
        else{
            transformData[new Date(statData[i]['date']).getFullYear()] = statData[i]['value'];
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

    };

    /*
    console.log("statData", statData[0]['date']);
    console.log("transformData key of first", Object.keys(transformData)[0]);
    console.log("transformData content of first", transformData[Object.keys(transformData)[0]]);
    console.log("transformDataL", Object.keys(transformData).length);
    console.log("outputData", outputData);
    */
    return outputData;

};//end getYearlyData

module.exports = { getDailyData, getWeeklyData, getMonthlyData, getYearlyData };
