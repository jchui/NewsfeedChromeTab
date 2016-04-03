angular.module('myApp', ['ngRoute'])

.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'templates/home.html', 
      controller: 'HomeCtrl'
    })
    .when('/settings', {
      templateUrl: 'templates/settings.html',
      controller: 'SettingsCtrl'
    })
    .otherwise({redirectTo: '/'});
})

.controller("HomeCtrl", function($scope, $http, $timeout) {
	
	$scope.loading = true;
	
	$scope.date = {};
 
	// Update function
	var updateTime = function() {
		$scope.date.raw = new Date();
			$timeout(updateTime, 1000);
		}
		
	// Kick off the update function
	updateTime();
    
    var apikey = '';
    var phase = '';
    
    /*$http.get('data/posts.json').*/
    
    $http.get('http://api.jchui.me/minerva/?apikey=' + apikey + '&phase=' + phase).
		success(function(data, status, headers, config) {
		$scope.posts = data;
		$scope.loading = false;
	}).
		error(function(data, status, headers, config) {
	// log error
	});
	
	$scope.key = "";
	
})

.controller('SettingsCtrl',
  function($scope) {
    // Our controller will go here
});