
function processData(data, startDate, period, filter, statistics){

	        const dates = [];
            const calories = [];
            const distance = [];
            const duration = [];
            const topSpeed = [];
            const avgSpeed = [];
            
            const table = data.split('\n').slice(1);

            table.forEach(row => {
                const columns = row.split(',');
                const now = (new Date()).toISOString().split('T')[0];
                
            
                if(startDate <= columns[1] && columns[1] <= now){

                    const Dates = columns[1];
                    const Calories = columns[2];
                    const Distance = columns[3];
                    const Duration = columns[4];
                    const TopSpeed = columns[5];
                    const AvgSpeed = columns[6];

                    dates.push(Dates);
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

            if(filter == "Daily"){

                if(statistics == "Total Distance"){

                    const outputData = [

                        [`Dates: `, dates],
                        [`${ period } ${ filter } ${ statistics }: `, distanceNum]

                    ];

                    return outputData
                }

                if(statistics == "Total Calories Burnt"){

                    const outputData = [

                        [`Dates: `, dates],
                        [`${ period } ${ filter } ${ statistics }: `, caloriesNum]

                    ];

                    return outputData
                }

                if(statistics == "Total Duration"){

                    const outputData = [

                        [`Dates: `, dates],
                        [`${ period } ${ filter } ${ statistics }: `, durationNum]

                    ];

                    return outputData
                }

                if(statistics == "Top Speed"){

                    const outputData = [

                        [`Dates: `, dates],
                        [`${ period } ${ filter } ${ statistics }: `, topSpeedNum]

                    ];

                    return outputData
                }

                if(statistics == "Average Speed"){

                    const outputData = [

                        [`Dates: `, dates],
                        [`${ period } ${ filter } ${ statistics }: `, avgSpeedNum]

                    ];

                    return outputData
                }
                
            }

            /*
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

                [`${ period } calories: `, calSum],
                [` ${ period } distance: `, distanceSum],
                [` ${ period } duration: `, durationSum.toFixed(2)],
                [` ${ period } top speed average: `, topSpeedAvg.toFixed(2)],
                [` ${ period } average speed average: `, avgSpeedAvg.toFixed(2)]

            ];

            return outputData;
            */



};

module.exports = { processData };
