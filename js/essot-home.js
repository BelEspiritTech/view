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

essotHomeApp.controller('essotHomeController', function($scope, $http, $location) {

  $scope._href = '#/';
  if($location.host() != 'www.essotglobal.com'){
	$scope._href = '.html#/';
  }
  
  $http.get('http://122.160.164.121:8080/essotg/rest/category/menu')
       .success(function(data) {
		 $scope.loaded = true;
		 $scope.menus = data;
		 
		 $http.get('http://122.160.164.121:8080/essotg/rest/category/all')
			.success(function(data) {
				$scope.loaded = true;
				$scope.displayCatalogues = data;
				
				$scope.fadeArray = new Array();
				var categories = $scope.displayCatalogues.categories
				for(i=0;i<categories.length; i++){
					var categoryArray = new Array();
					categoryArray.push("image/"+categories[i].categoryName+".jpg");
					categoryArray.push("category"+$scope._href+categories[i].categoryID);
					categoryArray.push("_self");
					$scope.fadeArray.push(categoryArray);
				}
				
				var width =$(window).width(); 
				var height=$(window).height()*0.80;
				
				var mygallery=new fadeSlideShow({   
							wrapperid: "faddingBannerDiv", //ID of blank DIV on page to house Slideshow   
							dimensions: [width, height], //width/height of gallery in pixels. Should reflect dimensions of largest image
							imagearray:  $scope.fadeArray,
							displaymode: {type:'auto', pause:1000, cycles:0, wraparound:false},   
							persist: false, //remember last viewed slide and recall within same session?   
							fadeduration: 4000, //transition duration (milliseconds)  
							descreveal: "ondemand",
							togglerid: ""
				});
				
			}).error(function(err) {
				console.log(err);
			});
    }).error(function(err) {
      console.log(err);
   });   
});