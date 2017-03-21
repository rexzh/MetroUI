app.controller('HistoryCtrl', function ($scope, $routeParams, $location, $L, resetMenu) {
    $scope.home = $L("Home");
    $scope.history = $L("History");    
    $scope.realtime = $L("Realtime");
    $scope.search = $L("Search");
    $scope.day = $L("Day");

    $scope.resetMenu = resetMenu;

    var boxId = $routeParams.boxId;
    var blockId = $routeParams.blockId;
    var sensorId = $routeParams.sensorId;

    
});