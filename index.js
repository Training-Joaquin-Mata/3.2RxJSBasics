import { of, from, interval, timer, range ,Observable, fromEvent, asyncScheduler, asapScheduler} from 'rxjs';
import { map } from 'rxjs/operators'

//#region Create Observables from dom events using from event

// const observer = {
//     next: vale => console.log(vale),
//     error: err => console.log(err),
//     complete: () => console.log('Complete!')
// }

// const source$ = fromEvent(document, 'click');

// const subOne = source$.subscribe(observer);

// const subTwo = source$.subscribe(observer);


// setTimeout(()=>{
//     console.log("Unsubscribing...");
//     subOne.unsubscribe();
// }, 4000);

//#endregion

//#region Create observables from static values using of

// const observer = {
//     next: val => console.log("next: "+ val),
//     error: err => console.log(err),
//     complete: () => console.log('Complete!')
// }

// const source$ = of([1,2],3,4,5)  
// const subOne = source$.subscribe(observer);


// const source2$ = range(1, 5);
// source2$.subscribe(observer);

//#endregion

//#region Turn arrays, iterators, and promises into observables using from

// const observer = {
//     next: val => console.log('next', val),
//     error: err => console.log(err),
//     complete: () => console.log('Complete!')
// }

// const values = [1,2,3,4,5]
// const source$ = from(fetch(
//     'https://api.github.com/users/octocat'
// ));
// source$.subscribe(observer);
//#endregion

//#region Emit items based on a duration with interval and timer

// // const timer$ = interval(1000);

// //timer$.subscribe(console.log)

// const timer$ = timer(2000, 1000);

// timer$.subscribe(console.log)

//#endregion
