app.controller('FormsCtrl', function ($scope, $routeParams, $location, $L, resetMenu) {
    $scope.home = $L("Home");

    $scope.resetMenu = resetMenu;

    $scope.forms = $L("Forms");

    //$scope.startDate = "2009/02/05";
    $scope.go = function() {
        console.log($scope.startDate);
        console.log($scope.filename);
        console.log($scope.check);
    }
});