function HomeController($scope, $window) {
	$scope.signup = function() {
		$window.location.href = '/signup';
	};
}