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

    private async triggerIfttt(event) {
        if (process.env['STAY_LOCAL']) {
            console.log('Event not propagated to ifttt');
            return;
        }
        return this.iftttSession.post(event);
    }

    async triggerOnEvent() {
        console.log(new Date(), 'trigger ON');
        return this.triggerIfttt(this.onEvent);
    }

    async triggerOffEvent() {
        console.log(new Date(), 'trigger OFF');
        return this.triggerIfttt(this.offEvent);
    }

}



