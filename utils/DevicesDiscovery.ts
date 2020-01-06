import * as rxjs from 'rxjs';
import * as ping from 'ping';


export class DevicesDiscovery {

    IPs = [];
    private readonly timeOut;

    constructor(IPs: Array<string>, timeOut = 2000) {
        this.IPs = IPs;
        this.timeOut = timeOut;
    }

    private static shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    private async probe(): Promise<boolean> {
        for await(let ip of DevicesDiscovery.shuffle(this.IPs)) {
            let {alive} = await ping.promise.probe(ip);
            if (alive) {
                return true;
            }
        }
        return false;
    }

    isTriggerPresent() {

        return new rxjs.Observable((subscriber: rxjs.Subscriber<{isPresent: boolean, timestamp: number}>) => {

            let shouldContinue = true;

            let probeRecursive = async () => {
                let isPresent = await this.probe();
                subscriber.next({isPresent, timestamp: Date.now()});
                if (!shouldContinue) {
                    return;
                }

                switch (isPresent) {
                    case false:
                        probeRecursive();
                        break;
                    case true:
                        setTimeout(() => {
                            probeRecursive();
                        }, this.timeOut);
                        break
                }
            };

            probeRecursive();

            return function unsubscribe() {
                shouldContinue = false;
            };
        });
    }
}