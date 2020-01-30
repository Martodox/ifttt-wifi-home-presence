import { DevicesDiscovery, ProbeOutcome } from './DevicesDiscovery';

export class DevicePresenceMap {

    constructor(devicesDiscovery: DevicesDiscovery) {

        devicesDiscovery.getProbeObservable().subscribe(this.handleNewStatus);

    }

    handleNewStatus(status: ProbeOutcome) {
        console.log(status);

        console.log('--------------');
    }

}