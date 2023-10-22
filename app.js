var app = angular.module('restaurantApp', ['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider
        .when('/signup', {
            templateUrl: 'signup.html',
            controller: 'SignUpController'
        })
        .when('/myinfo', {
            templateUrl: 'myinfo.html',
            controller: 'MyInfoController'
        })
        .otherwise({ redirectTo: '/signup' });
});

app.controller('MainController', function($scope, $location) {
    $scope.goToSignUp = function() {
        $location.path('/signup');
    };

    $scope.goToMyInfo = function() {
        $location.path('/myinfo');
    };
});

app.controller('SignUpController', function($scope, $http) {
    $scope.user = {};
    $scope.message = '';

    $scope.submitSignUpForm = function() {
        // Form validation here
        if ($scope.signUpForm.$valid) {
            var menuNumber = $scope.user.favoriteDish;
            // Check if menuNumber exists in the database
            $http.get(`https://coursera-jhu-default-rtdb.firebaseio.com/menu_items/${menuNumber}.json`)
                .then(function(response) {
                    if (response.data !== null) {
                        // Save user's preference (you can use a service for this)
                        // Display success message
                        $scope.message = 'Your information has been saved.';
                    } else {
                        $scope.signUpForm.favoriteDish.$setValidity('serverValidation', false);
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
        }
    };
});

app.controller('MyInfoController', function($scope) {
    // Retrieve user's registered information from the service and display it here
});
