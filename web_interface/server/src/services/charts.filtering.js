
function processData(data, startDate, period){

	        const calories = [];
            const distance = [];
            const duration = [];
            const topSpeed = [];
            const avgSpeed = [];
            const table = data.split('\n').slice(1);

            table.forEach(row => {
                const columns = row.split(',');
                const now = (new Date()).toISOString().split('T')[0];
                //const oneYearAgo = startDate; //(new Date(new Date().setFullYear(new Date().getFullYear() - 1))).toISOString().split('T')[0];
            
                if(startDate <= columns[1] && columns[1] <= now){

                    const Calories = columns[2];
                    const Distance = columns[3];
                    const Duration = columns[4];
                    const TopSpeed = columns[5];
                    const AvgSpeed = columns[6];

                    calories.push(Calories);
                    distance.push(Distance);
                    duration.push(Duration);
                    topSpeed.push(TopSpeed);
                    avgSpeed.push(AvgSpeed);
                    

            }
            
            })
            

            const caloriesNum = calories.map(str => {
                return Number(str);
            });

            const distanceNum = distance.map(str => {
                return Number(str);
            });

            const durationNum = duration.map(str => {
                return Number(str);
            });

            const topSpeedNum = topSpeed.map(str => {
                return Number(str);
            });

            const avgSpeedNum = avgSpeed.map(str => {
                return Number(str);
            });

            let calSum = 0;

            for (let i = 0; i < caloriesNum.length; i += 1) {
                calSum += caloriesNum[i];
            }
            
            let distanceSum = 0;

            for (let i = 0; i < distanceNum.length; i += 1) {
                distanceSum += distanceNum[i];
            }

            let durationSum = 0;

            for (let i = 0; i < durationNum.length; i += 1) {
                durationSum += durationNum[i];
            }

            let topSpeedSum = 0;

            for (let i = 0; i < topSpeedNum.length; i += 1) {
                topSpeedSum += topSpeedNum[i];
            }

            var topSpeedAvg = topSpeedSum / topSpeedNum.length;
            
            let avgSpeedSum = 0;

            for (let i = 0; i < avgSpeedNum.length; i += 1) {
                avgSpeedSum += avgSpeedNum[i];
            }
            
            var avgSpeedAvg = avgSpeedSum / avgSpeedNum.length;

            const outputData = [

                [`${ period }ly calories: `, calSum],
                [` ${ period }ly distance: `, distanceSum],
                [` ${ period }ly duration: `, durationSum],
                [` ${ period }ly top speed average: `, topSpeedAvg.toFixed(2)],
                [` ${ period }ly average speed average: `, avgSpeedAvg.toFixed(2)]

            ];

            return outputData;



};

module.exports = { processData };






