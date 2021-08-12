import { asyncScheduler, fromEvent } from 'rxjs';
import { map, throttleTime, tap } from 'rxjs/operators';

function calculateScrollPercent(element) {
  const { scrollTop, scrollHeight, clientHeight } = element;

  return (scrollTop / (scrollHeight - clientHeight)) * 100;
}


const progressBar= document.querySelector('.progress-bar');


const scroll$ = fromEvent(document, 'scroll');

const progress$ = scroll$.pipe(

  throttleTime(30, asyncScheduler, {
      leading: false,
      trailing: true
  }),
  map(({ target }) => calculateScrollPercent(target.documentElement)),
  tap(console.log)
);
progress$.subscribe(percent => {
  progressBar.style.width = `${percent}%`;
});