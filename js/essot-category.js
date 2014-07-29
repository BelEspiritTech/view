var essotCategoryApp = angular.module('essotCategoryApp', []);

essotCategoryApp.config(['$httpProvider', function($httpProvider) {
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

essotCategoryApp.controller('essotCategoryController', function($scope, $http, $location) {
  $scope.menus = [];
  $scope.products = [];
  $scope.categoryPage = true;
  var catID = $location.url().split('/')[1];
  //var catID = $location.url().split('=')[1]; 
  $http.get('http://122.160.164.121:8080/essotg/rest/category/menu')
       .success(function(data) {
		 $scope.loaded = true;
		 $scope.menus = data;
    }).error(function(err) {
      console.log(err);
   });

   var url = "http://122.160.164.121:8080/essotg/rest/productCategory/" + catID;
   $http.get(url)
       .success(function(data) {
		 $scope.loaded = true;
		 $scope.products = data;
    }).error(function(err) {
       console.log(err);
   });

    $scope.loadCategoryPage = function(data) {
		var url = "category#/"+data.categoryID;
		window.location.href = url;	
		window.location.reload(false);
    };
});