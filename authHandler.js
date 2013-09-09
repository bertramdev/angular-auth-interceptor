'use strict';

angular.module('authHandler', ['ui.bootstrap']).config(['$provide', '$httpProvider', function ($provide, $httpProvider) {
	$provide.factory('authHandler', ['$rootScope', '$q', function ($rootScope, $q) {
		return {
			responseError: function (rejection) {
				if (rejection.status === 401) {
					$rootScope.$broadcast('401:unauthorized');
					return $q.reject(rejection);
				}
			}
		};
	}]);
	 
	$httpProvider.interceptors.push('authHandler');
}]);

angular.module('authHandler').controller('AuthCtrl', ['$scope', '$route', '$dialog', function ($scope, $route, $dialog) {
	$scope.opts = angular.copy($scope.$root.dialogOpts);
	
	$scope.$on('401:unauthorized', function () {
		if (!$scope.dialogOpen) {
			$scope.dialogOpen = true;
			$dialog.dialog($scope.opts)
				.open($scope.$root.auth.templateUrl,
					$scope.$root.auth.controller)
						.then(
							function (successful) {
								if (successful) {
									$scope.dialogOpen = false;
									$route.reload();
								}
								else {
									$scope.dialogOpen = false;
								}
							}
						);
		}
	});
}]);