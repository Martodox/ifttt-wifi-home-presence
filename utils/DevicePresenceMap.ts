import { DevicesDiscovery, ProbeOutcome } from './DevicesDiscovery';
import * as clear from 'clear';

export class DevicePresenceMap {

    private availibilityMap;
    private homeState;

    constructor(devicesDiscovery: DevicesDiscovery) {

        devicesDiscovery.getProbeObservable().subscribe(this.handleNewStatus.bind(this));
        this.availibilityMap = {};

        this.homeState = {
            state: 'UNFEDINED',
            stateChangedAt: Date.now(),
            timeInThisState: 0
        }

    }

    someOnline(availibilityMap) {
        return Object.keys(availibilityMap).reduce((acc, val) => {
            if (acc || availibilityMap[val].isAlive) {
                return true;
            }
            return false;
        }, false)
    }

    addStatusToMap(status: ProbeOutcome, map) {

        let mapCopy = Object.assign({}, map);

        if (!mapCopy[status.ip]) {
            mapCopy[status.ip] = {}
        }

        mapCopy[status.ip].isAlive = status.isAlive;

        return mapCopy;
        
    }

    handleNewStatus(status: ProbeOutcome) {
        
        this.availibilityMap = this.addStatusToMap(status, this.availibilityMap);
        
        clear()

        let currentHomeState = this.someOnline(this.availibilityMap) ? 'SOME_ONLINE' : 'ALL_OFFLINE';

        if (this.homeState.state !== currentHomeState) {
            this.homeState = {
                state: currentHomeState,
                stateChangedAt: Date.now()
            }
        }

        this.homeState.timeInThisState = Math.floor((Date.now() - this.homeState.stateChangedAt) / 1000);
        
        console.log(this.homeState);

    }
    

}