import * as ping from 'ping';
import { Observable, merge, interval } from "rxjs";
import { throttle } from 'rxjs/operators';


export interface ProbeOutcome {
    isAlive: boolean;
    ip: string;
    timestamp: number;
}

export class DevicesDiscovery {

    private readonly IPs;

    constructor(IPs: Array<string>) {
        this.IPs = IPs;
    }

    private createProbeStream(ip: string):Observable<ProbeOutcome> {

        return new Observable((subscriber) => {

            let shouldContinue = true;

            let probeRecursive = async () => {
                let isAlive = await ping.promise.probe(ip);
                subscriber.next({isAlive: isAlive.alive, ip, timestamp: Date.now()});
                if (!shouldContinue) {
                    return;
                }

                probeRecursive();
            };

            probeRecursive();

            return function unsubscribe() {
                shouldContinue = false;
            };
        });
    }

    getProbeObservable():Observable<ProbeOutcome> {
        let probes = this.IPs.map(ip => this.createProbeStream(ip).pipe(throttle(ev => interval(1500))));
        return merge(...probes);
    }

}