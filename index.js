import { of, fromEvent, from, interval } from 'rxjs';
import { map,tap, pluck, mapTo, filter, reduce, take, scan, count} from 'rxjs/operators'

//#region Transform streams using map, pluck, and mapTo

// of(1,2,3,4,5).pipe(
//     map(value=> value*10)
// ).subscribe(console.log)

// const keyUp$ = fromEvent(document, "keyup");

// const keycode$ = keyUp$.pipe(
//     map(event => event.code)
// ); 

// const keycodeWPluck$ = keyUp$.pipe(
//     pluck('code')
// );

// keycode$.subscribe(console.log);

// keycodeWPluck$.subscribe(console.log);


// const press$ = keyUp$.pipe(
//     mapTo('Key Pressed!')
// )

// press$.subscribe(console.log);
//#endregion


//#region Ignore unneeded values with filter
// // of(1,2,3,4,5).pipe(
// // filter(value=> value>2)
// // ).subscribe(console.log)


// const keyup$ = fromEvent(document, 'keyup');

// const keycode$ = keyup$.pipe(
//     map(event => event.code)
// );


// const enter$ = keycode$.pipe(
//     filter(code => code === 'Enter')
//   );

// enter$.subscribe(console.log);

// keycode$.subscribe(console.log);
//#endregion

//#region Lab 1. Create a scroll progress bar with fromEvent and Map

//helpers
// function calculateScrollPercent(element){
    
//     const{scrollTop, scrollHeight, clientHeight}= element;
//     return (scrollTop / (scrollHeight-clientHeight))*100;
  
// }

// //streams 

// const scroll$ = fromEvent(document,  'scroll');
// const progress$ = scroll$.pipe(
//  //percent progress
//     map(({target}) => calculateScrollPercent(target.documentElement))
// )


// progress$.subscribe(console.log)

//#endregion

//#region Accumulate data over time using reduce

// const numbers = [1,2,3,4,5];

// const totalReducer = (accumulator, currentValue)=>{
//     return accumulator + currentValue;
// };

// from(numbers).pipe(
//     take(3),
//     reduce(totalReducer, 0)
// ).subscribe(
//     console.log,
//     null,
//     ()=>console.log("Complete!")
//     )

//#endregion


//#region  Manage state changes incrementally with scan

// const numbers= [1,2,3,4,5];

// const user = [
//     {name: 'joaquin', loggedIn: false, token: null},
//     {name: 'joaquin', loggedIn: true, token: 'abc'},
//     {name: 'joaquin', loggedIn: true, token: '123'}
// ]

// const state$ = from(user).pipe(
//     scan((accumulator, currentvalue)=>{
//         return {...accumulator, ...currentvalue};
//     },{ })
// )

// const name$ = state$.pipe(
//    map(state=> state.name) 
// );

// name$.subscribe(
//     console.log,
//     null,
//     ()=> console.log('Complete!')
// )

//#endregion


//#region Lab 2. Create a countdown tiumer

// const countdown = document.getElementById('countdown');

// const message = document.getElementById('message');


// const counter$ = interval(1000);

// counter$.pipe(
//     mapTo(-1),
//     scan((accumulator, current)=>{
//         return accumulator + current;
//     }, 10),
//     filter(value => value>=0),
    
// ).subscribe(
//     value =>{
//         countdown.innerHTML = value;
//         if(!value){
//             message.innerHTML = "LiftOff";
//         }
//     }

// );




//#endregion 



//#region  Debug your observable streams with tap

const numbers$ = of(1,2,3,4,5);

numbers$.pipe(
    tap(value => console.log(`Values before map: ${value}`)), 
    map(value => value*10 ),
    tap(value => console.log(`Values after map: ${value}`)), 
).subscribe(value=>{
    console.log(`Values from subscriber: ${value}`)
});

//#endregion