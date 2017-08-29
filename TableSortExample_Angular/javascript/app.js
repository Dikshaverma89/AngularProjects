//Creating angular module
var app = angular.module('app',['ngRoute']);

//Angular routing
app.config(function($routeProvider){
	
	$routeProvider.when('/home',{
		templateUrl : 'templates/table.html',
		controller : 'tableCtrl'
	}).otherwise({
			redirectTo: '/home'
		});
	
});

//Creting fatory for fetching records from "http://jsonplaceholder.typicode.com/posts" 
app.factory('nextFactory',function($http,$q){
	var getTableData = function(){
		var deferred = $q.defer();
		$http.get(" http://jsonplaceholder.typicode.com/posts").then(
			function(response){
				if(response.data.error)
					deferred.reject(response.data);
				else
					deferred.resolve(response.data);
				
			},
			function(error){
				deferred.reject("Internal Server Error",error);
			});
			return deferred.promise;
	};
	
	
	return {
		getTableData : getTableData
	}
});

//Create controller
app.controller('tableCtrl',['$scope','nextFactory', function($scope,nextFactory) {
	$scope.sortTypeCol     = 'Id'; //Default sort type
	$scope.sortReverse  = false;  //Default sort order
	$scope.sortType = function(col){
		$scope.sortReverse=($scope.sortTypeCol == col)? !$scope.sortReverse:false;
		$scope.sortTypeCol     = col;
	}
	//Binding factory data to $scope.tableList
	nextFactory.getTableData().then(function(response){
				$scope.tableList = response;
			},function(response){
				$scope.error = response+"Please try agin later";
			});
}]);


	