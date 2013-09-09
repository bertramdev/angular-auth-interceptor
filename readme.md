# Authentication Interceptor

intercepts responseError and listens for the 401 unauthorized response and broadcasts an event ('401:unauthorized') down the scope tree.

## Setup

* add 'authHandler' to your project

```
angular.module('myApp', ['authHandler']);
```

* configure your $rootScope variables

```
angular.module('myApp', ['authHandler']).run(function($rootScope) {
	$rootScope.auth = {
    	templateUrl: 'app/views/ajaxAuth.html',
		controller: 'AjaxAuthCtrl'
    }
})
```