
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

   // $scope.loggedOut = {'display': 'none'};
   // $scope.loggedIn = {'display': 'block'};

   document.getElementById("loggedOut").style.display = "none";
   document.getElementById("loggedIn").style.display = "block";


   let at = response.authResponse.accessToken;

   // let at = 'EAACEdEose0cBAKuIQxNGRYoipoGizISxnjZAnRXqW3PZBmEoYFrZABrxffJII54zIvA0QvOPZADqhutZA4z3dGgQiQ2MVh8USdFMvB7jAhWdtUuMIUtg3nGmfHJ2VD8PFZBcwSYuOzln0UZAZAZCkTLZC4say86ZAYsVUvokRJ2PftwWMTh20rcK43NX0dmZAHqGy2ZAKZAlEYeWeIWdYgJY9JiWDh';

   console.log("Access token: " + at);

   // for(org in orgs) {
   //   populateDB(orgs[org], at);
   // }

 }
 else {
   console.log('Not authenticated');
 }
}

function checkLoginState() {
FB.getLoginStatus(function(response) {
  statusChangeCallback(response);
});
}

function populateDB(org, at) {
  FB.api('/' + org + '?fields=name,events' + '&access_token=' + at, function(response) {
    if(response && !response.error) {
      console.log(response);
    }
    else {
      console.log(response.error);
    }
  })
}
