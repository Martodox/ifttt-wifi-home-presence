import * as config from './config.json';
import { DevicesDiscovery } from './utils/DevicesDiscovery';
import { DevicePresenceMap } from './utils/DevicePresenceMap';
import { IFTTTTrigger } from './utils/IFTTTTrigger';
import { AutomationTrigger } from './utils/AutomationTrigger';


const presenceMap = new DevicePresenceMap(
    new DevicesDiscovery(config.triggerDevicesList)
);

new AutomationTrigger(
    new IFTTTTrigger(config.ifttt),
    presenceMap.getHomeStatusObservable
)
