import{ fromEvent, interval } from 'rxjs'
import{ debounceTime, distinctUntilChanged, pluck, debounce, throttleTime } from 'rxjs/operators'

//#region Take the latest value after a pause debounceTime

// //elems
// const inputBox = document.getElementById('text');
// //streams 
// const click$ = fromEvent(document, 'click');
// const input$ = fromEvent(inputBox, 'keyup')

// input$.pipe(
//     //debounce(()=> interval(1000)),
//     debounceTime(1000),
//     pluck('target', 'value'),
//     distinctUntilChanged()
// ).subscribe(console.log)

//#endregion


//#region Ignore values during windows using throttleTime


// const click$ = fromEvent(document, 'click');

// click$.pipe(
//     throttleTime(3000),
// ).subscribe(console.log)


//#endregion


//#region Sample a stream on a uniform duration using sampleTime

const click$ = fromEvent(document, 'click');
const timer$ = interval(1000);

click$
  .pipe(
    /*
     * At the duration you specify, sample time will emit the last
     * emitted value within that window. For instance, in this 
     * example we are sampling at an interval of 4s. When the 4s
     * interval timer begins, you can click twice. Once 4s passes,
     * the second click will be emitted. This behavior is then repeated.
     * If no values are emitted from the source in the sample
     * window no values are emitted by sampleTime.
     */
    sampleTime(4000),
    // @ts-ignore
    map(({ clientX, clientY }) => ({
      clientX,
      clientY
    }))
  )
  .subscribe(console.log);

timer$.pipe(
  /*
   * The sample window can also be based off another stream. 
   * For instance, in this example every time you click the
   * last value emitted by the timer$ observable will be emitted
   * by sample.
   */
  sample(click$)
).subscribe(console.log);

//#endregion
