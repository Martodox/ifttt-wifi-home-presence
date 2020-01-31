import { IFTTTTrigger } from './IFTTTTrigger';
import { HomeState, homeStates } from './DevicePresenceMap';
import { Observable } from 'rxjs';

export class AutomationTrigger {

    private ifttt: IFTTTTrigger;
    private homeStatusObservable: () => Observable<HomeState>;
    private withinOnEventRange: () => boolean;
    private triggered: boolean;
    private currentState: string;

    constructor(ifttt: IFTTTTrigger, homeStatusObservable: () => Observable<HomeState>, withinOnEventRange: () => boolean) {
        this.ifttt = ifttt;
        this.homeStatusObservable = homeStatusObservable;
        this.withinOnEventRange = withinOnEventRange;
        this.triggered = false;
        this.currentState = homeStates.initial;
    }

    startListening() {
        this.homeStatusObservable().subscribe(currentStatus => {

            if (!this.triggered) {
            
                if (currentStatus.state === homeStates.someOnline && currentStatus.timeInThisState > 10) {
                    this.triggered = true;
                }
    
                if (currentStatus.state === homeStates.allOffline && currentStatus.timeInThisState > 10) {
                    this.triggered = true;
                }

            }
            

            if (this.triggered && this.currentState !== currentStatus.state) {

                if (currentStatus.state === homeStates.allOffline) {
                    this.ifttt.triggerOffEvent();
                }
                
                if (currentStatus.state === homeStates.someOnline) {
                    this.ifttt.triggerOnEvent();
                }

                this.triggered = false;

            }

            this.currentState = currentStatus.state;

        })
    }

}