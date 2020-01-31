import * as config from './config.json';
import { DevicesDiscovery } from './classes/DevicesDiscovery';
import { DevicePresenceMap } from './classes/DevicePresenceMap';
import { IFTTTTrigger } from './classes/IFTTTTrigger';
import { AutomationTrigger } from './classes/AutomationTrigger';
import { isSunUp } from './utils/isSunUp';

const presenceMap = new DevicePresenceMap(
    new DevicesDiscovery(config.triggerDevicesList)
);

const automationTrigger = new AutomationTrigger(
    new IFTTTTrigger(config.ifttt),
    presenceMap.getHomeStatusObservable.bind(presenceMap),
    () => !isSunUp(config.homeLocation)
);

automationTrigger.startListening();