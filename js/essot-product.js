var essotProductApp = angular.module('essotProductApp', []);
essotProductApp.config(['$httpProvider', function($httpProvider) {
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

essotProductApp.controller('essotProductController', function($scope, $http, $location) {

  $scope.menus = [];
  $scope.product = [];
  $scope.pagetitle = '';
  $scope.thumbImages = [];
  $scope._href = '#/';
  if($location.host() != 'www.essotglobal.com'){
	$scope._href = '.html#/';
  }
  var skuName = $location.url().split('/')[1];
  var imageJsonPath = "image/"+skuName+"/images.json" ;
  
  	$http.get('http://122.160.164.121:8080/essotg/rest/category/menu')
		 .success(function(data) {
			$scope.loaded = true;
			$scope.menus = data;
	
		}).error(function(err) {
		  console.log(err);
		});

    var url = "http://122.160.164.121:8080/essotg/rest/product/detail/" + skuName;
	$http.get(url)
		 .success(function(data) {
				$scope.loaded = true;
				$scope.product = data;

				$http.get(imageJsonPath)
					 .success(function(data) {
						$scope.thumbImages = data;
						
						var imageBreak = $scope.thumbImages.images[0].split('_');
						var largeImage = "image/" +imageBreak[0]+"/"+ imageBreak[0] + "_" + imageBreak[1] + "_" + imageBreak[2] + "_large.jpg";
						var XlargeImage = "image/" +imageBreak[0]+"/"+ imageBreak[0] + "_" + imageBreak[1] + "_" + imageBreak[2] + "_xlarge.jpg";

						$('#productImage').attr("src",largeImage);

						var options = {	zoomSizeMode :'zoom',
										zoomOffsetX : 80,
										zoomOffsetY : 25,
										zoomImage : "image/" +imageBreak[0]+"/"+ imageBreak[0] + "_" + imageBreak[1] + "_" + imageBreak[2] + "_xlarge.jpg"};

				$('#productImage').CloudZoom(options); 
				
					}).error(function(err) {
						console.log(err);
					});
				 		 
                    $scope.pagetitle = $scope.product.details.productDetails.name;

		}).error(function(err) {
			console.log(err);
		});

   $scope.toggleEnCode = function(data) {
		var imageBreak = $scope.thumbImages.images[data].split('_');
        $scope.product.details.defaultEnCode = imageBreak[1]; 
		
		var largeImage = "image/" +imageBreak[0]+"/"+ imageBreak[0] + "_" + imageBreak[1] + "_" + imageBreak[2] + "_large.jpg";
		
		$('#productImage').data('CloudZoom').destroy();
		$('#productImage').attr("src",largeImage);
		 
		 var options = {zoomSizeMode :'zoom',
		                zoomOffsetX : 80,
						zoomOffsetY : 25,
				 		zoomImage : "image/" +imageBreak[0]+"/"+ imageBreak[0] + "_" + imageBreak[1] + "_" + imageBreak[2] + "_xlarge.jpg"};
		 
		 $('#productImage').CloudZoom(options);  
		
	};
});