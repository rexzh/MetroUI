app.controller('FormsCtrl', function ($scope, $routeParams, $location, $L, resetMenu) {
    $scope.home = $L("Home");

    $scope.resetMenu = resetMenu;

    $scope.forms = $L("Forms");

    $scope.disabled = false;
    $scope.check = true;
    $scope.file = "XDoc";

    $scope.go = function() {
        //$scope.disabled = !$scope.disabled;

        console.log('input:', $scope.file);
        console.log('checkbox:', $scope.check);
    }
});