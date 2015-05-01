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

$scope.singleton = {
		name: "Adam's first shootout",
		date: 1430401607860,
			location: {
			name: "Adam's House",
			address: "20404 Treyburn Ln",
			city: "Pflugerville",
			state: "TX",
			zip: "78660",
			longitude: -97.572462,
			latitude: 30.481912
		}
};
$scope.grabData = function() {
	// $http.get("http://localhost:9000" + "/" + "event").then(
		$http.get("/" + "event/").then(
		function(resp){
			console.log('Here comes the response!!!');
		console.log(resp);
        $scope.eventList = resp.data;
    });
};

  $scope.test = "Testing...";
  console.log("required!");
  $scope.grabData();
};
