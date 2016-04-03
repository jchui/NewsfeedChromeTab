angular.module('myApp', [])

.controller("PostsCtrl", function($scope, $http, $timeout) {
	
	$scope.loading = true;
	
	$scope.date = {};
 
	// Update function
	var updateTime = function() {
		$scope.date.raw = new Date();
			$timeout(updateTime, 1000);
		}
		
	// Kick off the update function
	updateTime();
    
    
    /* $http.get('data/posts.json'). */
	$http.get('http://api.jchui.me/minerva/?apikey=YOUR_API_KEY_HERE').
		success(function(data, status, headers, config) {
		$scope.posts = data;
		$scope.loading = false;
	}).
		error(function(data, status, headers, config) {
	// log error
	});
	
	$scope.key = "";
	
});