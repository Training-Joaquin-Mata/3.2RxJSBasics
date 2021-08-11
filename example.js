import { of, fromEvent, interval, from} from 'rxjs'
import { take, map, first, takeWhile, mapTo, filter, scan, tap, takeUntil} from 'rxjs/operators'

const countdown = document.getElementById('countdown');
const message = document.getElementById('message'); 
const abortButton = document.getElementById('button');

const counter$= interval(1000);

const abortClick$ = fromEvent(abortButton, 'click' );

counter$.pipe(
    mapTo(-1),
    scan((accumulator, current) => {
      return accumulator + current;
    }, 10),
    tap(console.log),
    takeWhile(value => value >= 0),
    takeUntil(abortClick$)
  )
  .subscribe((value) => {
    countdown.innerHTML = value;
    if (!value) {
      message.innerHTML = 'Liftoff!';
    }
  });