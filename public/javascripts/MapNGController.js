var app = angular.module('amicaMap', ['ui-leaflet']);


app.controller('MapController', [ '$scope', '$http', 'leafletData' function($scope, $http, leafletData) {

	$scope.coordinates = [];
	$http.get("/restaurantscoordinates").then(function(response) {
		$scope.coordinates = eval(response.data);
	});

	for(coordinate in $scope.coordinates) {
		leafletData.get('map').then(function(map) {
			L.marker([coordinate.x, coordinate.y]).addTo(map);
		});
	}
	angular.extend($scope, {
		defaults: {
			tileLayer: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            maxZoom: 15
        }
		});
	}
}]);