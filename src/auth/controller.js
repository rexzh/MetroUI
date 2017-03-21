app.controller('AuthCtrl', function ($rootScope, $scope, AuthResource, $location, $L, resetMenu) {
    $scope.home = $L("Home");
    $scope.auth = $L("Input Password");
    $scope.ok = $L("OK");

    $scope.resetMenu = resetMenu;
    $scope.pwd = '';
    $scope.authentication = function () {
        
    }
});