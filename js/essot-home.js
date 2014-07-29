var essotHomeApp = angular.module('essotHomeApp', []);

 essotHomeApp.config(['$httpProvider', function($httpProvider) {
          $httpProvider.defaults.useXDomain = true;

          /**
           * Just setting useXDomain to true is not enough. AJAX request are also
           * send with the X-Requested-With header, which indicate them as being
           * AJAX. Removing the header is necessary, so the server is not
           * rejecting the incoming request.
           **/
          delete $httpProvider.defaults.headers.common['X-Requested-With'];
      }
  ]);

essotHomeApp.controller('essotHomeController', function($scope, $http) {

  $http.get('http://122.160.164.121:8080/essotg/rest/category/menu')
       .success(function(data) {
		 $scope.loaded = true;
		 $scope.menus = data;
		 
		 $http.get('http://122.160.164.121:8080/essotg/rest/category/all')
			.success(function(data) {
				$scope.loaded = true;
				$scope.displayCatalogues = data;						
			}).error(function(err) {
				console.log(err);
			});
    }).error(function(err) {
      console.log(err);
   });   
  
});