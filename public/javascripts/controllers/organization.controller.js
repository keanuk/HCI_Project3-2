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

      let fbToken = 'EAACEdEose0cBAPm4uSCfcYwkZBfbDWsC71lMWP21iqasJI9f4mVF214AL9Ts1RrSUExZBUZCFFm7nDsgvzmdOEgd54CZBherRLLbMkx7YFBM4ponrIgnRibWLbABzTgnfFHYwm3QqQ4VW4gKYs2bPKUhK8sBKEJJoZCQ0svXuNJ3SfE0aInALUyCfXidLSrDbsdyN5fU5ZCkhCUqoEElpG';

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

            var entry = document.createElement('li');
            entry.appendChild(document.createTextNode(response.name));
            document.getElementById("barList").appendChild(entry);
          }
          else {
            console.log(response.error);
          }
        })
      }

      function getFBData(newOrganization) {
        console.log("new org");
        console.log(newOrganization);

        if(newOrganization.username) {
          FB.api('/' + newOrganization.username + '?fields=id,name,website,about,events,feed,picture' + '&access_token=' + fbToken, function(response) {
            if(response && !response.error) {
              console.log("getting data from fb");
              console.log(response);
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
