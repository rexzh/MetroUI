app.controller('FormsCtrl', function ($scope, $routeParams, $location, $L, resetMenu) {
    $scope.home = $L("Home");

    $scope.resetMenu = resetMenu;

    $scope.forms = $L("Forms");

    
});