import * as express from "express";
import * as path from "path";

console.log('starting in ' + process.cwd())

var app = express();

// TODO - use env variable?
var publicpath = path.join(process.cwd(), '../../client/build');
console.log(publicpath);

// TODO - nodemon? reload server
app.use(express.static(publicpath));

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/api', function (req, res) {
  res.json([
  {
    "login": "moxombo",
    "id": 1,
    "avatar_url": "https://avatars.githubusercontent.com/u/1?v=3",
    "gravatar_id": "",
    "url": "https://api.github.com/users/mojombo",
    "html_url": "https://github.com/mojombo",
    "followers_url": "https://api.github.com/users/mojombo/followers",
    "following_url": "https://api.github.com/users/mojombo/following{/other_user}",
    "gists_url": "https://api.github.com/users/mojombo/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/mojombo/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/mojombo/subscriptions",
    "organizations_url": "https://api.github.com/users/mojombo/orgs",
    "repos_url": "https://api.github.com/users/mojombo/repos",
    "events_url": "https://api.github.com/users/mojombo/events{/privacy}",
    "received_events_url": "https://api.github.com/users/mojombo/received_events",
    "type": "User",
    "site_admin": false
  },
  {
    "login": "defunkt",
    "id": 2,
    "avatar_url": "https://avatars.githubusercontent.com/u/2?v=3",
    "gravatar_id": "",
    "url": "https://api.github.com/users/defunkt",
    "html_url": "https://github.com/defunkt",
    "followers_url": "https://api.github.com/users/defunkt/followers",
    "following_url": "https://api.github.com/users/defunkt/following{/other_user}",
    "gists_url": "https://api.github.com/users/defunkt/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/defunkt/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/defunkt/subscriptions",
    "organizations_url": "https://api.github.com/users/defunkt/orgs",
    "repos_url": "https://api.github.com/users/defunkt/repos",
    "events_url": "https://api.github.com/users/defunkt/events{/privacy}",
    "received_events_url": "https://api.github.com/users/defunkt/received_events",
    "type": "User",
    "site_admin": true
  },
  {
    "login": "pjhyett",
    "id": 3,
    "avatar_url": "https://avatars.githubusercontent.com/u/3?v=3",
    "gravatar_id": "",
    "url": "https://api.github.com/users/pjhyett",
    "html_url": "https://github.com/pjhyett",
    "followers_url": "https://api.github.com/users/pjhyett/followers",
    "following_url": "https://api.github.com/users/pjhyett/following{/other_user}",
    "gists_url": "https://api.github.com/users/pjhyett/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/pjhyett/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/pjhyett/subscriptions",
    "organizations_url": "https://api.github.com/users/pjhyett/orgs",
    "repos_url": "https://api.github.com/users/pjhyett/repos",
    "events_url": "https://api.github.com/users/pjhyett/events{/privacy}",
    "received_events_url": "https://api.github.com/users/pjhyett/received_events",
    "type": "User",
    "site_admin": true
  },
  {
    "login": "wycats",
    "id": 4,
    "avatar_url": "https://avatars.githubusercontent.com/u/4?v=3",
    "gravatar_id": "",
    "url": "https://api.github.com/users/wycats",
    "html_url": "https://github.com/wycats",
    "followers_url": "https://api.github.com/users/wycats/followers",
    "following_url": "https://api.github.com/users/wycats/following{/other_user}",
    "gists_url": "https://api.github.com/users/wycats/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/wycats/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/wycats/subscriptions",
    "organizations_url": "https://api.github.com/users/wycats/orgs",
    "repos_url": "https://api.github.com/users/wycats/repos",
    "events_url": "https://api.github.com/users/wycats/events{/privacy}",
    "received_events_url": "https://api.github.com/users/wycats/received_events",
    "type": "User",
    "site_admin": false
  },
  {
    "login": "ezmobius",
    "id": 5,
    "avatar_url": "https://avatars.githubusercontent.com/u/5?v=3",
    "gravatar_id": "",
    "url": "https://api.github.com/users/ezmobius",
    "html_url": "https://github.com/ezmobius",
    "followers_url": "https://api.github.com/users/ezmobius/followers",
    "following_url": "https://api.github.com/users/ezmobius/following{/other_user}",
    "gists_url": "https://api.github.com/users/ezmobius/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/ezmobius/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/ezmobius/subscriptions",
    "organizations_url": "https://api.github.com/users/ezmobius/orgs",
    "repos_url": "https://api.github.com/users/ezmobius/repos",
    "events_url": "https://api.github.com/users/ezmobius/events{/privacy}",
    "received_events_url": "https://api.github.com/users/ezmobius/received_events",
    "type": "User",
    "site_admin": false
  },
  {
    "login": "ivey",
    "id": 6,
    "avatar_url": "https://avatars.githubusercontent.com/u/6?v=3",
    "gravatar_id": "",
    "url": "https://api.github.com/users/ivey",
    "html_url": "https://github.com/ivey",
    "followers_url": "https://api.github.com/users/ivey/followers",
    "following_url": "https://api.github.com/users/ivey/following{/other_user}",
    "gists_url": "https://api.github.com/users/ivey/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/ivey/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/ivey/subscriptions",
    "organizations_url": "https://api.github.com/users/ivey/orgs",
    "repos_url": "https://api.github.com/users/ivey/repos",
    "events_url": "https://api.github.com/users/ivey/events{/privacy}",
    "received_events_url": "https://api.github.com/users/ivey/received_events",
    "type": "User",
    "site_admin": false
  }]);
});


app.listen(3010, () => console.log('Example app listening on port 3010!'));
