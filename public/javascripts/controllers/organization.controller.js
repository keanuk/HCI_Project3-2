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

      getOrganizations();

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
        console.log("creating a new organization");
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
    }
})()
