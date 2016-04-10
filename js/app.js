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
    })
    .state('message', {
      url: "/:url?date",
      templateUrl: "templates/messages.html",
      controller: 'MessagesCtrl'
    });
})

.factory('UserService', function() {
  var defaults = {
  	apikey: '',
    phase: '3b'
  };
 
  var service = {
    user: {},
    save: function() {
      localStorage.newsfeed =
        angular.toJson(service.user);
    },
    restore: function() {
      // Pull from sessionStorage
      service.user = 
        angular.fromJson(localStorage.newsfeed) || defaults
 
      return service.user;
    }
  };
  // Immediately call restore from the session storage
  // so we have our user data available immediately
  service.restore();
  return service;
})

.controller("HomeCtrl", function($scope, $http, $timeout, UserService) {
	
	$scope.loading = true;
	$scope.user = UserService.user;
	$scope.date = {};
	
	// Loading Animation
	i = 0;
	setInterval(function() {
	  i = ++i % 4;
	  $("#loading").html("Loading Newsfeed"+Array(i+1).join("."));
	}, 800);
 
	var updateTime = function() {
		$scope.date.raw = new Date();
			$timeout(updateTime, 1000);
		}
	
	updateTime();
    
    var apikey = $scope.user.apikey;
    var phase = $scope.user.phase;
    var version = '0.3';
    
    $http.get('http://api.jchui.me/minerva/?apikey=' + apikey + '&phase=' + phase + '&version=' + version).
		success(function(data, status, headers, config) {
		$scope.posts = data;
		$scope.loading = false;
	}).
		error(function(data, status, headers, config) {
			// Log error
	});
	
	$scope.key = apikey;
	$scope.phase = phase;
	
})

.controller('SettingsCtrl',
  function($scope, UserService, $location, $http) {
   
	$scope.user = UserService.user;
	
	$http.get('http://api.jchui.me/minerva/notice/').
		success(function(data, status, headers, config) {
		$scope.notice = data;
	}).
		error(function(data, status, headers, config) {
			// Log error
	});
	
	$scope.save = function() {
       UserService.save();
       $location.path('/home');
    }   
   
})

.controller('MessagesCtrl', function($scope, $state, $stateParams, $http, UserService, $sce) {
    
    $scope.loading = true;
    
    // Loading Animation
	i = 0;
	setInterval(function() {
	  i = ++i % 4;
	  $("#loading").html("Fetching Newsfeed content"+Array(i+1).join("."));
	}, 800);
    
    $scope.user = UserService.user;
    var apikey = $scope.user.apikey;
 
    var url = $stateParams.url; //getting url
    var date = $stateParams.date; //getting url
    
    $scope.state = $state.current
    $scope.params = $stateParams; 
    
    $scope.url = url;
    $scope.date = date;
    
    $http.get('http://api.jchui.me/minerva/posts/?apikey=' + apikey + '&notice=' + url).
		success(function(data, status, headers, config) {
		$scope.notice = data;
		
		$scope.getNewsfeedData = function() {
	       return $sce.trustAsHtml(data.content);
	   	};
	   	
	   	$scope.loading = false;
		
	}).
		error(function(data, status, headers, config) {
			// Log error
	});
	
});