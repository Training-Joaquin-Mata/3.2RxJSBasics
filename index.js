import { of, fromEvent, interval, from} from 'rxjs'
import { take, map, first,scan,  takeWhile, takeUntil, distinctUntilChanged, distinctUntilKeyChanged} from 'rxjs/operators'


//#region Emit a set number of values from a stream with TAKE
// const numbers$ = of(1,2,3,4,5)
// const click$ = fromEvent(document, 'click')

// click$.pipe(
//     map(value => ({
//         x: event.clientX,
//         y: event.clientY
//     })),
//    // take(3)
//    first(({y})=> y > 200)
//     ).subscribe(
//         console.log,
//         null,
//         () => console.log("Complete!")
//         )
//#endregion

//#region Complete a stream when a condition is met with TAKEWHILE 


// const click$ = fromEvent(document, 'click')

// click$.pipe(
//     map(value => ({
//         x: event.clientX,
//         y: event.clientY
//     })),
//     takeWhile(({y}) => y < 200)
//   // first(({y})=> y > 200)
//     ).subscribe(
//         console.log,
//         null,
//         () => console.log("Complete!")
//         )
 
//#endregion

//#region Complete a stream based on another stream using takeUntil

// const counter$ = interval(1000);

// const click$ = fromEvent(document, 'click');

// counter$.pipe(
//     takeUntil(click$)
// ).subscribe(console.log, null, ()=>console.log("complete"))

//#endregion

//#region Ignore non unique values using distinctUntilChanged

const numbers$ = of(1,1,2,3,3,3,4,5);

numbers$.pipe(
    distinctUntilChanged(),
).subscribe(console.log);


const user = [
    { name: 'Joaquin', loggedIn: false, token: null },
    { name: 'Joaquin', loggedIn: true, token: 'abc' },
    { name: 'Joaquin', loggedIn: true, token: '123' }
  ];
  
  const state$ = from(user).pipe(
    scan((accumulator, currentValue) => {
      return { ...accumulator, ...currentValue };
    }, {})
  );
  
  const name$ = state$.pipe(

    distinctUntilKeyChanged('name'),
  
    map((state) => state.name)
  );
  
  name$.subscribe(console.log);

  
  


//#endregion
