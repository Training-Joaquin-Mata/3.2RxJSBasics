import { fromEvent, interval } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { mergeMap, catchError, takeUntil, map} from 'rxjs/operators';

//#region Flatten inner observables as they occur with mergeMap
// const interval$ = interval(1000);
// const click$ = fromEvent(document, 'click');

// // click$.pipe(
//   /*
//    * mergeMap invokes the function you provide,
//    * subscribing to each returned observable internally.
//    * Any values emitted by these inner observables
//    * are then emitted by mergeMap. By default there
//    * is no limit to the number of active inner
//    * subscriptions that can be active at a time
//    * with mergeMap, so if you continually click on
//    * the page more and more timers will be activated.
//    * This can be dangerous if you have long 
//    * running inner observables and forget to clean
//    * them up.
//    */
// //   mergeMap(() => interval$)
// // ).subscribe(console.log);

// /*
//  * BEGIN SECOND SECTION
//  */
// const mousedown$ = fromEvent(document, 'mousedown');
// const mouseup$ = fromEvent(document, 'mouseup');

// // mousedown$.pipe(
//   /*
//    * In this case, we are mapping to a new interval
//    * observable on mousedown, but we are limiting it's
//    * lifetime by using the takeUntil operator with
//    * the mouseup$ stream.
//    */
// //   mergeMap(() => interval$.pipe(
// //     takeUntil(mouseup$)
// //   ))
// // ).subscribe(console.log);

// /*
//  * BEGIN THIRD SECTION
//  */
// const coordinates$ = click$.pipe(
//   map((event) => ({
//     x: event.clientX,
//     y: event.clientY
//   }))
// );

// const coordinatesWithSave$ = coordinates$.pipe(
//   /*
//    * mergeMap is good for 'fire and forget' save request
//    * you do not want to be cancelled. For instance, in this
//    * example we are emulating a save of coordinates
//    * anytime the user clicks on the page.
//    */
//   mergeMap(coords => ajax.post(
//     'https://www.mocky.io/v2/5185415ba171ea3a00704eed'
//   ))
// );

// coordinatesWithSave$.subscribe(console.log);

//#endregion


//#region Switch to a new observable on emissions using switchMap

// const interval$ = interval(1000);
// const click$ = fromEvent(document, 'click');

// click$.pipe(
//   /*
//    * switchMap switches to a new observable on each emission
//    * from the source, cancelling any previous inner 
//    * observables. For instance, if you click once a new
//    * interval observable will be subscribed to internally,
//    * with it's values emitted. When you click again,
//    * that observable will be completed, and the next 
//    * interval will be subscribed to, restarting
//    * the count. This will happen on each emission from
//    * the click$ observable.
//    */
//   switchMap(() => interval$)
// ).subscribe(console.log);

// /*
//  * BEGIN SECOND SECTION
//  */
// const BASE_URL = 'https://api.openbrewerydb.org/breweries';

// //elems
// const inputBox = document.getElementById('text-input');
// const typeaheadContainer = document.getElementById('typeahead-container');

// // streams
// const input$ = fromEvent(inputBox, 'keyup');

// input$
//   .pipe(
//     debounceTime(200),
//     pluck('target', 'value'),
//     distinctUntilChanged(),
//     /*
//      * switchMap is perfect for GET requests, as you do
//      * not normally care about the previous request
//      * to the same URL if another has fired. For instance,
//      * in this example if the user continues typing
//      * and the previuos request has not returned,
//      * switchMap will go ahead and cancel it and only
//      * the current request will be considered.
//      */
//     switchMap(searchTerm => ajax.getJSON(
//       `${BASE_URL}?by_name=${searchTerm}`
//       )
//     )
//   )
//   .subscribe((response) => {
//     // update ui
//     typeaheadContainer.innerHTML = response.map(b => b.name).join('<br>');
//   });

//#endregion


//#region Subscribe to observables in order with concatMap

// // const interval$ = interval(1000);
// // const click$ = fromEvent(document, 'click');

// // click$.pipe(
//   /*
//    * concat based operators are the 'single file line' 
//    * of operators, maintaining 1 active inner observable at
//    * a time. For instance, in this example on the first click a new
//    * interval observable will be subscribed to internally,
//    * with any emitted values being emitted by concatMap. 
//    * If you click again while that inner interval
//    * is active, the next interval will be queued until
//    * the current active interval completes. At this point,
//    * the next inner observable will be activated and so on...
//    */
// //   concatMap(() => interval$.pipe(take(3)))
// // ).subscribe(console.log);

// /*
//  * BEGIN SECOND SECTION
//  */
// const saveAnswer = answer => {
//     // simulate delayed request
//     return of(`Saved: ${answer}`).pipe(delay(1500));
//   };
  
//   // elems
//   const radioButtons = document.querySelectorAll('.radio-option');
  
//   // streams
//   const answerChange$ = fromEvent(radioButtons, 'click');
  
//   answerChange$
//     .pipe(
//       /*
//        * concatMap can be useful if you need to queue
//        * requests client side. For instance, in this example
//        * we are emulating save requests on a quiz, ensuring
//        * order remains in tact by not initiating the next 
//        * request until the previous completes. Be careful though,
//        * as long running inner observables could cause backups.
//        */
//       concatMap((event) => saveAnswer(event.target.value))
//     )
//     .subscribe(console.log);


//#endregion

//#region Catch errors on observables with catchError

// const BASE_URL = 'https://api.openbrewerydb.org/breweries';

// //elems
// const inputBox = document.getElementById('text-input');
// const typeaheadContainer = document.getElementById('typeahead-container');

// // streams
// const input$ = fromEvent(inputBox, 'keyup');

// input$
//   .pipe(
//     debounceTime(200),
//     pluck('target', 'value'),
//     distinctUntilChanged(),
//     switchMap(searchTerm => ajax.getJSON(
//       `${BASE_URL}?by_name=${searchTerm}`
//       ).pipe(
//         /*
//          * catchError receives the error and the
//          * observable on which the error was caught
//          * (in case you wish to retry). In this case,
//          * we are catching the error on the ajax
//          * observable returned by our switchMap
//          * function, as we don't want the entire
//          * input$ stream to be completed in the
//          * case of an error.
//          */
//         catchError((error, caught) => {
//           /*
//            * In this case, we just want to ignore
//            * any errors and hope the next request
//            * succeeds so we will just return an 
//            * empty observable (completes without
//            * emitting any values).
//            * 
//            * You can also use the EMPTY import, 
//            * which is just a shortcut for empty(). 
//            * Behind the scenes empty() returns the
//            * EMPTY constant when a scheduler is not provided.
//            * ex. import { EMPTY } from 'rxjs';
//            * return EMPTY;
//            * https://github.com/ReactiveX/rxjs/blob/fc3d4264395d88887cae1df2de1b931964f3e684/src/internal/observable/empty.ts#L62-L64
//            */
//           return empty();
//         })
//       )
//     )
//   )
//   .subscribe((response) => {
//     // update ui
//     typeaheadContainer.innerHTML = response.map(b => b.name).join('<br>');
//   });

//#endregion

