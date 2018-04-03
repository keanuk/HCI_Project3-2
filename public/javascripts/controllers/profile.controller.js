(function(){
  angular.module('volunteerApp')
    .controller('ProfileController', ProfileController);

    ProfileController.$inject = ['$scope', '$location', 'OrganizationService'];

    function ProfileController($scope, $location, OrganizationService){

      $scope.organization = {};
      $scope.myUrl = $location.absUrl();

      console.log('my url: ' + $scope.myUrl);
      var orgId = $scope.myUrl.slice($scope.myUrl.lastIndexOf('profile') + 8);
      getOrganization(orgId);

      function getOrganization(organizationId){
        console.log('organization id: ' + organizationId);
        console.log(OrganizationService.getOne(organizationId));
      }

      // $scope.getOneOrganization = function(organizationId) {
      //   console.log('getting one organization: ' + organizationId);
      //   $scope.focusedOrganization = OrganizationService.getOne(organizationId);
      //   console.log('focusedOrganization = ' + $scope.focusedOrganization);
      //
      // };

    }
})()
