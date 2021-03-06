module.exports = {
    influx: {
        energyConsumption_Instant: `select sum(value) as value from testdata
        where sensor_id=13 or sensor_id=16 or sensor_id=19 or sensor_id=22 or sensor_id=25 
        and time > now() - 24h                
        limit 1`,
        waterConsumption_Instant: `select sum(value) as value from testdata 
        where time > now() - 24h 
        and sensor_id=28 or sensor_id=29 or sensor_id=30
        limit 1`,    
        uptime_Instant: `select sum(value) as value from testdata        
        where time > now() - 24h  
        and sensor_id=27 or sensor_id=24 or sensor_id=21 or sensor_id=18 or sensor_id=15
        limit 1`,  
        waterLevel_Instant_Grouped: `select value from testdata 
        where time > now() 
        and sensor_id=2 or sensor_id=4 or sensor_id=7 or sensor_id=9 or sensor_id=11
        group by tag_sensor_id         
        limit 1`,
        temperature_Instant_Grouped: `select value from testdata 
        where time > now() and sensor_id=1 or sensor_id=3 or sensor_id=5
        group by tag_sensor_id 
        limit 1`,
        revolutionxMinute_Instant_Grouped: `select value from testdata 
        where time > now() 
        and sensor_id=14 or sensor_id=17 or sensor_id=20 or sensor_id=23 or sensor_id=26
        group by tag_sensor_id 
        limit 1`,
        averageEnergy_Week: 'select mean(sum_e) as mean from sum_e_global',
        uptime_Week: 'select mean(sum_uptime) as mean from sum_u_global',
        waterConsume_Week: 'select mean(sum_w) as mean from sum_w_global',
        //averageWater_Week: '',
        energyDrainBySensor_Minute_Global: `select sum(value) from testdata 
        where time > now() - 1m 
        and sensor_id=13 or sensor_id=16 or sensor_id=19 or sensor_id=22 or sensor_id=25 
        group by tag_sensor_id`,
        waterTankLevel_FourHour_Max: `select max(value) from testdata 
        where time > now() - 4h
        and sensor_id=2 or sensor_id=4 or sensor_id=7 or sensor_id=9 or sensor_id=11 
        group by tag_sensor_id`,
        waterTankLevel_FourHour_Min: `select min(value) from testdata 
        where time > now() - 4h
        and sensor_id=2 or sensor_id=4 or sensor_id=7 or sensor_id=9 or sensor_id=11 
        group by tag_sensor_id`,
        GetSensorValue_Instant_Grouped: `select value from testdata 
        where time > now() 
        group by tag_sensor_id 
        limit 1`,
        timespan: {
            minute: '1m',
            hour: '1h',
            day: '24h',
            week: '7d',
            month: '30d',
            year: '365d'
        },
        GetEnergyConsuption_Instant_Single: (sensor_id) => {
            return `select value from testdata 
            where time > now()
            and sensor_id=${sensor_id}
            limit 1`
        },
        GetSensorValue_Average_Single: (sensor_id, timespan) => {            
            if (timespan) {
                return `select mean(value) from testdata 
                where sensor_id=${sensor_id} and time > now() - ${timespan}`;
            }
            return `select mean(value) from testdata 
            where sensor_id=${sensor_id}`;
        },
        GetSensorValue_Average_Grouped: (timespan) => {            
            if (timespan) {
                return `select mean(value) from testdata 
                where time > now() - ${timespan}
                group by tag_sensor_id`;                
            }
            return `select mean(value) from testdata 
            group by tag_sensor_id`;
        },
        GetEnergyConsuption_Average: (timespan) => {
            if(timespan) {
                return `select mean(value) from testdata 
                where time > now() - ${timespan} 
                and sensor_id=13 or sensor_id=16 or sensor_id=19 or sensor_id=22 or sensor_id=25`;
            }
            return `select mean(value) from testdata 
            where sensor_id=13 or sensor_id=16 or sensor_id=19 or sensor_id=22 or sensor_id=25`;
        },
        GetEnergyConsuption_Total: (timespan) => {
            if (timespan) {
                return `select sum(value) from testdata 
                where time > now() - ${timespan}
                and sensor_id=13 or sensor_id=16 or sensor_id=19 or sensor_id=22 or sensor_id=25`;
            }
            return `select sum(value) from testdata 
            where sensor_id=13 or sensor_id=16 or sensor_id=19 or sensor_id=22 or sensor_id=25`
        },
        GetWaterConsuption_Average: (timespan) => {
            if (timespan) {
                return `select mean(value) from testdata 
                where time > now() - ${timespan} 
                and sensor_id=28 or sensor_id=29 or sensor_id=30`;
            }
            return `select sum(value) from testdata 
            where sensor_id=28 or sensor_id=29 or sensor_id=30`;
        },
        GetWaterConsuption_Total: (timespan) => {
            if (timespan) {
                return `select sum(value) from testdata 
                where time > now() - ${timespan} 
                and sensor_id=28 or sensor_id=29 or sensor_id=30`;                
            }
            return `select sum(value) from testdata 
            where sensor_id=28 or sensor_id=29 or sensor_id=30`;
        },
        GetUptime_Average: (timespan) => {
            if (timespan) {
                return `select mean(value) from testdata
                where time > now() - ${timespan}
                and sensor_id=27 or sensor_id=24 or sensor_id=21 or sensor_id=18 or sensor_id=15`;
            }
            return `select mean(value) from testdata
                where sensor_id=27 or sensor_id=24 or sensor_id=21 or sensor_id=18 or sensor_id=15`;
        }
    }
}