import * as config from './config.json';
import { DevicesDiscovery } from './utils/DevicesDiscovery';
import { IFTTTTrigger } from './utils/IFTTTTrigger';


const trigger = new IFTTTTrigger({
    offEvent: config.ifttt.offEventName,
    onEvent: config.ifttt.onEventName,
    makerKey: config.ifttt.makerKey
});

const discovery = new DevicesDiscovery(config.triggerDevicesList);

let previousStatus:boolean;

discovery.getProbeObservable().subscribe(status => {

    console.log(status);


    // if (previousStatus === status.isPresent) {
    //     return
    // }
    //
    //
    // previousStatus = status.isPresent;
    //
    // if (status.isPresent) {
    //     trigger.triggerOnEvent()
    // } else {
    //     trigger.triggerOffEvent();
    // }
});
