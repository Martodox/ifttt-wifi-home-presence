import * as config from './config.json';
import { DevicesDiscovery } from './utils/DevicesDiscovery';
import { DevicePresenceMap } from './utils/DevicePresenceMap';
import { IFTTTTrigger } from './utils/IFTTTTrigger';
import * as clear from 'clear';


const trigger = new IFTTTTrigger({
    offEvent: config.ifttt.offEventName,
    onEvent: config.ifttt.onEventName,
    makerKey: config.ifttt.makerKey
});

const presenceMap = new DevicePresenceMap(
    new DevicesDiscovery(config.triggerDevicesList)
);


presenceMap.getHomeStatusObservable().subscribe(homeState => {
    clear();
    console.log(homeState)
})