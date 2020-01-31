import { IFTTTTrigger } from './IFTTTTrigger';
import { HomeState } from './DevicePresenceMap';
import { Observable } from 'rxjs';


export class AutomationTrigger {

    constructor(ifttt: IFTTTTrigger, homeStatusObservable: () => Observable<HomeState>) {

    }

}