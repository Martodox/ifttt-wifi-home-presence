import { IFTTTTrigger } from './IFTTTTrigger';
import { HomeState, homeStates } from './DevicePresenceMap';
import { Observable } from 'rxjs';

export class AutomationTrigger {

    private ifttt: IFTTTTrigger;
    private homeStatusObservable: () => Observable<HomeState>;
    private withinOnEventRange: () => boolean;
    private triggered: boolean;
    private currentState: HomeState;

    constructor(ifttt: IFTTTTrigger, homeStatusObservable: () => Observable<HomeState>,withinOnEventRange: () => boolean) {
        this.ifttt = ifttt;
        this.homeStatusObservable = homeStatusObservable;
        this.withinOnEventRange = withinOnEventRange;
        this.triggered = false;
        this.currentState = {
            state: homeStates.initial,
            stateChangedAt: Date.now(),
            timeInThisState: 0
        };
    }

    startListening() {
        this.homeStatusObservable().subscribe(currentState => {

            if (this.currentState.timeInThisState > 10 && this.currentState.state !== currentState.state) {

                if (currentState.state === homeStates.allOffline) {
                    this.ifttt.triggerOffEvent();
                }
                
                if (currentState.state === homeStates.someOnline) {
                    this.ifttt.triggerOnEvent();
                }

            }

            this.currentState = currentState;

        })
    }

}