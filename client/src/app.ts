import * as Rx from '@reactivex/rxjs';
import { MyElement } from "./components/my-element";

var url = '/api'

var refreshButton = document.querySelector('.refresh') as HTMLButtonElement;
var closeButton1 = document.querySelector('.close1') as HTMLButtonElement;
var closeButton2 = document.querySelector('.close2') as HTMLButtonElement;
var closeButton3 = document.querySelector('.close3') as HTMLButtonElement;

interface ClickEvent {
  event: string
}

interface Person {
  name: string,
  html_url: string,
  login: string
}

var refreshClickStream = Rx.Observable.fromEvent<ClickEvent>(refreshButton, 'click');
var close1ClickStream = Rx.Observable.fromEvent<ClickEvent>(closeButton1, 'click');
var close2ClickStream = Rx.Observable.fromEvent<ClickEvent>(closeButton2, 'click');
var close3ClickStream = Rx.Observable.fromEvent<ClickEvent>(closeButton3, 'click');

var startupRequestStream = Rx.Observable.from([url]);

var requestStream = refreshClickStream.startWith({event: 'first click'})
  .map(function() {
    var randomOffset = Math.floor(Math.random()*500);
    return '/api?since=' + randomOffset;
  });


var responseStream  = requestStream
  .flatMap<Array<Person>>(function(requestUrl) {
    return Rx.Observable.fromPromise(fetch(requestUrl)
      .then(function(response) {
        return response.json();
      }));
  })
  .publish().refCount();

responseStream.subscribe(function(response) {
  console.log('response: %o', response )
});

function createSuggestionStream(closeClickStream : Rx.Observable<ClickEvent>) : Rx.Observable<Person> {
    return closeClickStream.startWith({event: 'startup'})
        .combineLatest(responseStream,
            function(click : ClickEvent, listUsers : Array<Person>) {
                return listUsers[Math.floor(Math.random()*listUsers.length)];
            }
        )
        .merge(
            refreshClickStream.map(function(){
                return null;
            })
        )
        .startWith(null);
}

const suggestion1Stream = createSuggestionStream(close1ClickStream);
const suggestion2Stream = createSuggestionStream(close2ClickStream);
const suggestion3Stream = createSuggestionStream(close3ClickStream);


// Rendering ---------------------------------------------------
function renderSuggestion(suggestedUser : Person, selector : string) {
    var suggestionEl = document.querySelector(selector) as HTMLElement;
    if (suggestedUser === null) {
        suggestionEl.style.visibility = 'hidden';
    } else {
        suggestionEl.style.visibility = 'visible';
        var usernameEl = suggestionEl.querySelector('.username') as HTMLAnchorElement
        usernameEl.href = suggestedUser.html_url
        usernameEl.textContent = suggestedUser.login;
    }
}

suggestion1Stream.subscribe(function (suggestedUser) {
    renderSuggestion(suggestedUser, '.suggestion1');
});

suggestion2Stream.subscribe(function (suggestedUser) {
    renderSuggestion(suggestedUser, '.suggestion2');
});

suggestion3Stream.subscribe(function (suggestedUser) {
    renderSuggestion(suggestedUser, '.suggestion3');
});

window.customElements.define('my-element', MyElement);
