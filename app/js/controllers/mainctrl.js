module.exports = function($scope, $http) {
	$scope.eventList = [];

// 	{
// 		name: "Adam's first shootout",
// 		date: 1430401607860,
// 			location: {
// 			name: "Adam's House",
// 			address: "20404 Treyburn Ln",
// 			city: "Pflugerville",
// 			state: "TX",
// 			zip: "78660",
// 			longitude: -97.572462,
// 			latitude: 30.481912
// 		}
// },

// $scope.singleton = {
// 		name: "Adam's first shootout",
// 		date: 1430401607860,
// 			location: {
// 			name: "Adam's House",
// 			address: "20404 Treyburn Ln",
// 			city: "Pflugerville",
// 			state: "TX",
// 			zip: "78660",
// 			longitude: -97.572462,
// 			latitude: 30.481912
// 		}
// };
$scope.grabData = function() {
	// $http.get("http://localhost:9000" + "/" + "event").then(
		$http.get("/" + "event/").then(
		function(resp){
			console.log('Here comes the response!!!');
		console.log(resp);
        $scope.eventList = resp.data;
    });
};
$scope.locationStuff = function() {
        $scope.lat = "0";
        $scope.lng = "0";
        $scope.accuracy = "0";
        $scope.error = "";
        $scope.model = { myMap: undefined };
        $scope.myMarkers = [];
 
        $scope.showResult = function () {
            return $scope.error == "";
        }
 
        // $scope.mapOptions = {
        //     center: new google.maps.LatLng($scope.lat, $scope.lng),
        //     zoom: 15,
        //     mapTypeId: google.maps.MapTypeId.ROADMAP
        // };
 
        $scope.showPosition = function (position) {
            $scope.lat = position.coords.latitude;
            $scope.lng = position.coords.longitude;
            $scope.accuracy = position.coords.accuracy;
            $scope.$apply();
 
            // var latlng = new google.maps.LatLng($scope.lat, $scope.lng);
            // $scope.model.myMap.setCenter(latlng);
            // $scope.myMarkers.push(new google.maps.Marker({ map: $scope.model.myMap, position: latlng }));
        }
 
        $scope.showError = function (error) {
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    $scope.error = "User denied the request for Geolocation."
                    break;
                case error.POSITION_UNAVAILABLE:
                    $scope.error = "Location information is unavailable."
                    break;
                case error.TIMEOUT:
                    $scope.error = "The request to get user location timed out."
                    break;
                case error.UNKNOWN_ERROR:
                    $scope.error = "An unknown error occurred."
                    break;
            }
            $scope.$apply();
        }
 
        $scope.getLocation = function () {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition($scope.showPosition, $scope.showError);
            }
            else {
                $scope.error = "Geolocation is not supported by this browser.";
            }
        }
    }

  $scope.test = "Testing...";
  console.log("more test!");
  $scope.grabData();
  console.log("start");
  navigator.geolocation;
  navigator.geolocation.getCurrentPosition( function(position) {
    $scope.lat = position.coords.latitude;
    $scope.lng = position.coords.longitude;
    
  },
  $scope.showError = function (error) {
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    $scope.error = "User denied the request for Geolocation."
                    break;
                case error.POSITION_UNAVAILABLE:
                    $scope.error = "Location information is unavailable."
                    break;
                case error.TIMEOUT:
                    $scope.error = "The request to get user location timed out."
                    break;
                case error.UNKNOWN_ERROR:
                    $scope.error = "An unknown error occurred."
                    break;
            }
            $scope.$apply();
        });
  console.log("end");
 
        // $scope.getLocation();
        console.log("lat = " + $scope.lat);
    }
