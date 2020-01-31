import * as dayjs from 'dayjs'
import * as isBetween from 'dayjs/plugin/isBetween'
const { getSunrise, getSunset } = require('sunrise-sunset-js');

dayjs.extend(isBetween)

export function isSunUp({latitude, longitude}):boolean {

    return dayjs().isBetween(
        dayjs(getSunrise(latitude, longitude)).add(1, 'hour'), 
        dayjs(getSunset(latitude, longitude)).subtract(1, 'hour')
    );

}