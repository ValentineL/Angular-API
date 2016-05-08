angular.module("angular-table-example").controller("gitHubCtrl", [
  "$scope", "$http", function ( $scope, $http )
  {
    $scope.repos = [];
    $scope.url   = { type: "users", name: "" };

    $scope.config = {
      itemsPerPage: 5,
      fillLastPage: true
    }

//    $scope.$watch('search', function ()
//    {
////      $scope.fetchRepos();
//    });

    $scope.test = function(){
      console.log('%cIt works', 'color:blue');
    }

    $scope.myFunction = function() {
      $scope.count++;
    }

    $scope.fetchRepos = function ( type, name )
    {
      console.log('%cperforming API call', 'color:blue');
      console.log(type, name);

      $http.get('https://api.github.com/'+type+'/'+name+'/repos').then(function ( response )
      {
        console.log(response);
        // success
        if (response.status == 200) {
          $scope.repos = response.data;
        } else {
          console.error(response);
        }
      });
    }

  }
]);


angular.module("angular-table-example").controller("filteredTableCtrl", [
  "$scope", "$filter", function ( $scope, $filter )
  {

    console.log('here');

    $scope.list = $scope.$parent.personList;

    $scope.filteredList = $scope.list;

    // $scope.getList = function() {
    //   return $filter("filter")($scope.list, $scope.query);
    // }

    $scope.del = function ( i )
    {
      console.log("index: " + i);
      $scope.list.splice(i, 1);
      $scope.updateFilteredList();
    }

    $scope.updateFilteredList = function ()
    {
      $scope.filteredList = $filter("filter")($scope.list, $scope.query);
    };

  }
])

angular.module('formExample', [])
  .controller('ExampleController', ['$scope', function($scope) {
    $scope.master = {};

    $scope.update = function(user) {
      $scope.master = angular.copy(user);
    };

    $scope.reset = function() {
      $scope.user = angular.copy($scope.master);
    };

    $scope.reset();
  }]);