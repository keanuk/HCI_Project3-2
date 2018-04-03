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
      $scope.deleteOrganization = deleteOrganization;
      $scope.update = update;
      $scope.edit = edit;

      let fbToken = '';

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
        console.log("creating a new organization: " + newOrganization);
        // if(newOrganization.username) {
        //   newOrganization = getFBData(newOrganization.username, newOrganization);
        // }
        OrganizationService.create(newOrganization)
                  .then(function(response){
                    $scope.newOrganization = {};
                  });
      }

      function getOrganizations(){
        console.log("getting the organizations");
        OrganizationService.getAll();
        console.log(OrganizationService.getAll());
        fbTest();
      }


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

         fbToken = 'EAACEdEose0cBACla863UvdsOHvS2BZCMFH6RMqsJ92IxIyFWoLxO76MMUnXJ6IAOdM6mU1AhZBJBOZCJZCvBSfC9t28vn4OBkjH4W5fyKGJzvuInvNKkswrzezqWV7z2l89zd1vmxPOiuC70ownz9nuhh0A1gP7Gk9L6cHvRoYYvPD3qyDZC5186E3VcjMdzZBAQ0VtaZByQn0Y40WYlhFt';

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

      function getFBData(orgName, newOrganization) {
        FB.api('/' + orgName + '?fields=name,feed' + '&access_token=' + fbToken, function(response) {
          if(response && !response.error) {
            console.log("getting data from fb");
            console.log(response);
            if(response.name) {
              newOrganization.name = response.name;
            }
            return newOrganization;
          }
          else {
            console.log(response.error);
            return newOrganization;
          }
        })
      }

      function fbTest() {
        FB.api('/' + 'me' + '?fields=name,feed' + '&access_token=' + fbToken, function(response) {
          if(response && !response.error) {
            console.log("Test");
            console.log(response);
          }
          else {
            console.log(response.error);
          }
        })
      }


    }
})()
