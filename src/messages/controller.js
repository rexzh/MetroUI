app.controller('MessagesCtrl', function ($scope, MessageResource, $interval, $L, timeFormatter, resetMenu) {
    var mapStatusType = {
        "Normal": 'success',
        "High": 'block',
        "Low": 'block',
        "ExHigh": 'error',
        "ExLow": 'error',
        "Fail": 'error'
    };

    $scope.home = $L("Home");
    $scope.messages = $L("Messages");

    $scope.resetMenu = resetMenu;

    var count = localStorage.getItem('msgCount') || 10;
    
    
});