
//Facebook shit
window.fbAsyncInit = function() {
FB.init({
  appId      : '291380158062880',
  cookie     : true,
  xfbml      : true,
  version    : 'v2.12'
});

// FB.AppEvents.logPageView();

FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
});

};

(function(d, s, id){
 var js, fjs = d.getElementsByTagName(s)[0];
 if (d.getElementById(id)) {return;}
 js = d.createElement(s); js.id = id;
 js.src = "https://connect.facebook.net/en_US/sdk.js";
 fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function statusChangeCallback(response) {
 if(response.status === 'connected') {
   console.log('Logged in and authenticated');

   if(document.getElementById("loggedOut")) {
     document.getElementById("loggedOut").style.display = "none";
     document.getElementById("loggedIn").style.display = "block";
   }
   document.getElementById("fbLogin").style.display = "none";

   let at = response.authResponse.accessToken;

   // let at = 'EAACEdEose0cBAKuIQxNGRYoipoGizISxnjZAnRXqW3PZBmEoYFrZABrxffJII54zIvA0QvOPZADqhutZA4z3dGgQiQ2MVh8USdFMvB7jAhWdtUuMIUtg3nGmfHJ2VD8PFZBcwSYuOzln0UZAZAZCkTLZC4say86ZAYsVUvokRJ2PftwWMTh20rcK43NX0dmZAHqGy2ZAKZAlEYeWeIWdYgJY9JiWDh';

   getProfile(at);
 }
 else {
   console.log('Not authenticated');

   document.getElementById("loggedOut").style.display = "block";
   document.getElementById("loggedIn").style.display = "none";
   document.getElementById("fbLogin").style.display = "block";
 }
}

function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}

function getProfile(at) {
  FB.api('/' + 'me' + '?fields=name' + '&access_token=' + at, function(response) {
    if(response && !response.error) {
      console.log(response);

      var entry = document.createElement('li');
      entry.appendChild(document.createTextNode(response.name));
      document.getElementById("barList").appendChild(entry);
    }
    else {
      console.log(response.error);
    }
  })
}
