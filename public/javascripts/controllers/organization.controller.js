(function(){
  angular.module("volunteerApp")
    .controller("OrganizationController", OrganizationController);

    OrganizationController.$inject = ["$scope", "OrganizationService"];

    function OrganizationController($scope, OrganizationService){
      $scope.search = '';
      $scope.searchBar = '';
      $scope.organizations = [];
      $scope.newOrganization = {};
      $scope.addOrganization = addOrganization;
      $scope.getFBData = getFBData;
      $scope.deleteOrganization = deleteOrganization;
      $scope.update = update;
      $scope.edit = edit;
      $scope.focusedOrganization = {};

      let fbToken = 'EAACEdEose0cBAPaPy2d55fWpN4vS8wv6p1c3l994LhXWWZAVBFWUfBRgbrFW6oGMg6SZApb66QzN3Q9ZBGEcUFN8nHldD5lqP9vOVdf9ZCSeEEvXRLskQZAsHgS11IEmtHfG3gYVh8VpFq7sfu25Jqkxo6g99g5byEMCMcCgr4lVHDLXJaZBGRhpEnr8uyu8oqxvap7SM89ji7k9zuYjzT';

      getFB();

      $scope.$watch(function watcher(){
        return OrganizationService.fetch();
      },
      function onChange(){
        $scope.organizations = OrganizationService.fetch();
      });

      $scope.Click = function() {
        $scope.search = $scope.searchBar;
      }

      function edit(organization){
        console.log("editing");
        organization.edit = true;
      }

      function update(organization){
        console.log("updating");
        organization.edit = false;
        OrganizationService.update(organization);
      }

      function deleteOrganization(organization){
        OrganizationService.delete(organization);
      }

      function addOrganization(newOrganization){
        newOrganization.category = document.getElementById("cateSelect").value
        OrganizationService.create(newOrganization)
                  .then(function(response){
                    $scope.newOrganization = {};
                  });
      }

      function getOrganizations(){
        console.log("getting the organizations");
        OrganizationService.getAll();
        console.log(OrganizationService.getAll());
      }


      $scope.getOneOrganization = function(organizationId) {
        console.log('getting one organization: ' + organizationId);
        $scope.focusedOrganization = OrganizationService.getOne(organizationId);
        console.log('focusedOrganization = ' + $scope.focusedOrganization);

      };



      function getFB() {
        window.fbAsyncInit = function() {
        FB.init({
          appId      : '291380158062880',
          cookie     : true,
          xfbml      : true,
          version    : 'v2.12'
        });

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

      }


      function statusChangeCallback(response) {
       if(response.status === 'connected') {
         console.log('Logged in and authenticated');

         if(document.getElementById("loggedOut")) {
           document.getElementById("loggedOut").style.display = "none";
           document.getElementById("loggedIn").style.display = "block";
         }
         document.getElementById("fbLogin").style.display = "none";

         let at = response.authResponse.accessToken;

         // fbToken = response.authResponse.accessToken;

         getProfile(at);

         getOrganizations();
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

            var entry = document.createElement('h3');
            entry.appendChild(document.createTextNode(response.name));
            document.getElementById("fbstatus").appendChild(entry);
          }
          else {
            console.log(response.error);
          }
        })
      }

      function getFBData(newOrganization) {
        if(newOrganization.username) {
          newOrganization.name = "No name";
          newOrganization.description = "No information";
          newOrganization.website = "No website";

          FB.api('/' + newOrganization.username + '?fields=id,name,website,about,events,feed,picture,cover' + '&access_token=' + fbToken, function(response) {
            if(response && !response.error) {
              newOrganization.facebookURL = "https://www.facebook.com/" + newOrganization.username;
              if(response.name) {
                newOrganization.name = response.name;
              }
              if(response.about) {
                newOrganization.description = response.about;
              }
              if(response.website) {
                newOrganization.website = response.website;
              }
              if(response.picture.data.url) {
                newOrganization.profileImg = response.picture.data.url;
              }
              if(response.cover.source) {
                newOrganization.headerImg = response.cover.source;
              }
              if(response.events.data) {
                newOrganization.events = new Array(response.events.data.length);
                let eTitle = "No Title";
                let eDesc = "No Description";
                let eLoc = "No location";
                for(i in response.events.data) {
                  if(response.events.data[i].name) {
                    eTitle = response.events.data[i].name;
                  }
                  if(response.events.data[i].description) {
                    eDesc = response.events.data[i].description;
                  }
                  if(response.events.data[i].place) {
                    eLoc = response.events.data[i].place.name;
                  }
                  newOrganization.events[i] = {"title" : eTitle, "description" : eDesc, "location" : eLoc};
                }
              }
              if(response.feed) {
                newOrganization.feed = new Array(response.feed.data.length);
                for(i in response.feed.data) {
                  newOrganization.feed[i] = {"message": response.feed.data[i].message};
                }
                console.log(newOrganization.feed);
              }
              addOrganization(newOrganization);
            }
            else {
              console.log(response.error);
              addOrganization(newOrganization);
            }
          })
        }
        else {
          addOrganization(newOrganization);
        }
      }
    }
})()
