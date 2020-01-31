import { DevicesDiscovery, ProbeOutcome } from './DevicesDiscovery';
import { Observable } from 'rxjs';

export const homeStates = {
    initial: 'INITIAL',
    someOnline: 'SOME_ONLINE',
    allOffline: 'ALL_OFFLINE'
}

export interface HomeState {
    state: string,
    stateChangedAt: number,
    timeInThisState?: number
}

export class DevicePresenceMap {

    private availibilityMap;
    private homeState: HomeState;
    private devicesDiscovery: DevicesDiscovery;

    constructor(devicesDiscovery: DevicesDiscovery) {

        this.devicesDiscovery = devicesDiscovery;
        this.availibilityMap = {};

        this.homeState = {
            state: homeStates.initial,
            stateChangedAt: Date.now(),
            timeInThisState: 0
        }

    }

    private someOnline(availibilityMap) {
        return Object.keys(availibilityMap).reduce((acc, val) => {
            if (acc || availibilityMap[val].isAlive) {
                return true;
            }
            return false;
        }, false)
    }

    private addStatusToMap(status: ProbeOutcome, map) {

        let mapCopy = Object.assign({}, map);

        if (!mapCopy[status.ip]) {
            mapCopy[status.ip] = {}
        }

        mapCopy[status.ip].isAlive = status.isAlive;

        return mapCopy;
        
    }

    private handleNewStatus(status: ProbeOutcome) {
        
        this.availibilityMap = this.addStatusToMap(status, this.availibilityMap);

        let currentHomeState = this.someOnline(this.availibilityMap) ? homeStates.someOnline : homeStates.allOffline;

        if (this.homeState.state !== currentHomeState) {
            this.homeState = {
                state: currentHomeState,
                stateChangedAt: Date.now()
            }
        }

        this.homeState.timeInThisState = Math.floor((Date.now() - this.homeState.stateChangedAt) / 1000);
        
        return this.homeState;

    }

    getHomeStatusObservable():Observable<HomeState> {
        return new Observable(subscriber => {
            this.devicesDiscovery.getProbeObservable().subscribe(status => {
                subscriber.next(this.handleNewStatus(status));
            });
        });
    }
    

}