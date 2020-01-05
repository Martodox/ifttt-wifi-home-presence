// @ts-ignore
import * as IFTTT from 'ifttt-webhooks-channel';

import * as config from './config.json';

const ifttt = new IFTTT(config.makerKey);


ifttt.post('hallway_lights_off')
    .then(res => console.log(res))
    .catch(err => console.error(err))


