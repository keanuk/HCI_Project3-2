(function(){
  angular.module("volunteerApp")
    .factory("OrganizationService", OrganizationService);

    OrganizationService.$inject = ["$http"]; //$http == axios

    function OrganizationService($http){
      var baseURL = "/organizations";
      var organizations= [];

      function fetch(){
        return organizations;
      }

      function getAll(){
        return $http.get(baseURL)
                    .then(function(response){
                      organizations = response.data.organizations;
                    });
      }

      function getOne(organizationId){
        return $http.get(`${baseURL}/${organizationId}`)
                    .then(function(response) {
                      organizations = response.data.organizations;
                    });
      }


      function create(organization){
        return $http.post(baseURL, organization)
                    .then(getAll);
      }

      function deleteOrganization(organization){
        console.log(organization._id);
        return $http.delete(`${baseURL}/${organization._id}`)
                    .then(getAll);
      }

      function update(organization){
        return $http.put(`${baseURL}/${organization._id}`, organization)
                    .then(getAll);
      }


      return {
        getAll: getAll,
        getOne: getOne,
        create: create,
        delete: deleteOrganization,
        update: update,
        fetch: fetch
      };

    }
})()
