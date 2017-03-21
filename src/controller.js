﻿app.controller('NavCtrl', function ($scope, $L) {
    $scope.brand = $L("Generic Platform");
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