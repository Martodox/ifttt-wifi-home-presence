import * as config from './config.json';
import { DevicesDiscovery, ProbeOutcome } from './utils/DevicesDiscovery';
import { DevicePresenceMap } from './utils/DevicePresenceMap';
import { IFTTTTrigger } from './utils/IFTTTTrigger';


const trigger = new IFTTTTrigger({
    offEvent: config.ifttt.offEventName,
    onEvent: config.ifttt.onEventName,
    makerKey: config.ifttt.makerKey
});

const presenceMap = new DevicePresenceMap(
    new DevicesDiscovery(config.triggerDevicesList)
);
