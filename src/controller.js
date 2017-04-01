app.controller('NavCtrl', function ($scope, $L) {
    $scope.brand = $L("Generic Platform");
});

app.controller('SystemStatusCtrl', function ($scope, $timeout, $L) {
    $scope.showWait = false;
    $scope.showMessage = false;

    $scope.message = {
        type: 'success',
        head: 'Attention',
        detail: '成功'
    }

    $scope.$on('ajaxStart', function(){
        $scope.showWait = true;
        $scope.showMessage = false;
    });

    $scope.$on('ajaxEnd', function(){
        $scope.showWait = false;
    });

    $scope.$on('serviceSuccess', function() {
        $scope.message = {
            type: 'success',
            head: '成功',
            detail: '成功'
        }
        $scope.showMessage = true;
        $timeout(function(){
            $scope.showMessage = false;
        }, 3000);
    });

    $scope.$on('serviceFailure', function(evt, resp) {
        $scope.message = {
            type: 'danger',
            head: '注意',
            detail: JSON.stringify(resp)
        }
        $scope.showMessage = true;
    });
});

app.controller('MenuCtrl', function ($rootScope, $scope, $timeout, $L, gritter) {
    var menus = [
        {"name": "Overview", "items": [{"name": "Dashboard", "icon": "icon-dashboard", "href": "#/dashboard/"}, {"name": "Messages", "icon": "icon-envelope", "href": "#/messages/"}, {"name": "Monitor", "icon": "icon-eye-open", "href": "#/monitor/"}]},
        {"name": "Management", "items": [{"name": "Forms", "icon": "icon-edit", "href": "#/forms/"}, {"name": "Settings", "icon": "icon-cog", "href": "#/settings/"}, {"name": "Password", "icon": "icon-key", "href": "#/chgpwd/"}]},
        {"name": "Help", "items": [{"name": 'About', "icon": 'icon-info-sign', "href": "#/about/"}]}
    ];


    for(var i = 0; i < menus.length; i++) {
        var mn = menus[i];
        mn.name = $L(mn.name);
        for(var j = 0; j < mn.items.length; j++) {
            var itm = mn.items[j];
            itm.name = $L(itm.name);
        }
    }
    
    $scope.menus = menus;
});