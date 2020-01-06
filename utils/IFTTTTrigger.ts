// @ts-ignore
import * as IFTTT from 'ifttt-webhooks-channel';
import {of} from "rxjs";

export class IFTTTTrigger {

    private readonly onEvent;
    private readonly offEvent;

    private readonly iftttSession;

    constructor({makerKey, onEvent, offEvent}) {
        this.onEvent = onEvent;
        this.offEvent = offEvent;

        this.iftttSession = new IFTTT(makerKey);
    }

    async triggerOnEvent() {
        console.log(new Date(), 'trigger ON');
        return this.iftttSession.post(this.onEvent);
    }

    async triggerOffEvent() {
        console.log(new Date(), 'trigger OFF');
        return this.iftttSession.post(this.offEvent);
    }

}



