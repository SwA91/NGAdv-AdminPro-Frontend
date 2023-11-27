import { OnDestroy, Component } from '@angular/core';
import { Subject } from 'rxjs';

@Component({ template: '' })
export class UnsubscribeComponent implements OnDestroy {
    componentIsDestroyed$ = new Subject<boolean>();

    constructor() { }

    ngOnDestroy() {
        this.componentIsDestroyed$.next(true);
        this.componentIsDestroyed$.complete();
    }
}