angular.module('myApp', ['ui.router'])

.config(function($stateProvider, $urlRouterProvider) {
	
  $urlRouterProvider.otherwise("/home");
  
  $stateProvider
    .state('home', {
      url: "/home",
      templateUrl: "templates/home.html",
      controller: 'HomeCtrl'
    })
    .state('settings', {
      url: "/settings",
      templateUrl: "templates/settings.html",
      controller: 'SettingsCtrl'
    });
})

.controller("HomeCtrl", function($scope, $http, $timeout) {
	
	$scope.loading = true;
	
	$scope.date = {};
 
	var updateTime = function() {
		$scope.date.raw = new Date();
			$timeout(updateTime, 1000);
		}
	
	updateTime();
    
    var apikey = 'API_KEY_HERE';
    var phase = '3b';
    
    $http.get('http://api.jchui.me/minerva/?apikey=' + apikey + '&phase=' + phase).
		success(function(data, status, headers, config) {
		$scope.posts = data;
		$scope.loading = false;
	}).
		error(function(data, status, headers, config) {
			// Log error
	});
	
	$scope.key = apikey;
	
})

.controller('SettingsCtrl',
  function($scope) {
    // Settings stuff
});