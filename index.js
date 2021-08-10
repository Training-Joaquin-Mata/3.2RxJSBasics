import { of, Observable, fromEvent} from 'rxjs';
import { map } from 'rxjs/operators'


const observer ={
    // next: value=> console.log(value),
    // error: error => console.log(error),
    // complete: () => console.log('Complete!')
}

const observable = new Observable(subscriber =>{
let count = 0;
const id = setInterval(()=>{
    subscriber.next(count);
    //subscriber.complete();
    count +=1;
}, 1000);

return () => {
    console.log("called")
    clearInterval(id)
}
});

console.log(`
start Script

`);

const subscription = observable.subscribe(
    // observer
    value=> console.log("next:"+value),
    error => console.log(error),
    () => console.log('Complete!')
); 

const subscription2 = observable.subscribe(
    // observer
    value=> console.log("next2:"+value),
    error => console.log(error),
    () => console.log('Complete!')
);

setTimeout(()=>{
    subscription.unsubscribe(
    value => console.log(value),
);
}, 3500)

setTimeout(()=>{
    subscription2.unsubscribe(
    value => console.log(value),
);
}, 5000)


console.log(`
end Script
`);