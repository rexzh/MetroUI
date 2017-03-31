app.controller('MessagesCtrl', function ($scope, MessageResource, $interval, $L, timeFormatter, resetMenu, msgbox) {
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
    
    $scope.remove = function() {
        msgbox.show().then(function(x){
            if(x)
                console.log('confirmed');
            else
                console.log('canceled');
        });
    }
});