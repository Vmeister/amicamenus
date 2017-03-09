var app = angular.module('amicaRestaurants', ['ui-leaflet']);

app.controller('AmicaController', [ '$scope', '$http', 'leafletData', function($scope, $http, leafletData) {
	$scope.restaurantList = [];

	var featureGroup = L.featureGroup();

	$http.get("/restaurants").then(function(response) {
		var coordinates = [];
		for(i = 0; i < response.data.length; i++) {
			coordinates.push(response.data[i].coordinates);
			var marker = L.marker([coordinates[i].x, coordinates[i].y]);
			featureGroup.addLayer(marker);

			var popup = "Ravintola: " + response.data[i].name;
			marker.bindPopup(popup);

		}

		leafletData.getMap('map').then(function(map) {
			featureGroup.addTo(map);
			map.fitBounds(featureGroup.getBounds());
		});
	});

	angular.extend($scope, {
		defaults: {
			tileLayer: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            maxZoom: 15
        }
	});

	$http.get("/restaurants").then(function(response) {
		var restaurants = response.data;
		for(i = 0; i < restaurants.length; i++) {
			$scope.restaurantList.push(restaurants[i]);
		}

		$scope.restaurant = restaurants[0];
	});

	$scope.selection = function(restaurant) {
		$http.get("restaurant/" + restaurant.id).then(function(response) {
			$scope.date = response.data.MenusForDays[0].Date;
			$scope.restaurantName = response.data.RestaurantName;
			$scope.openingHours = response.data.MenusForDays[0].LunchTime;
			$scope.menus = response.data.MenusForDays[0].SetMenus;
		});
	};
}]);
