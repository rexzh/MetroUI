﻿app.controller('DashboardCtrl', function ($scope, $rootScope, $interval, $L, resetMenu) {
    var NORMAL = "Normal", WARNING = "Warning", ERROR = "Error", UNKNOWN = "Unknown";
    var mapStatusColor = {
        'Normal': 'green',
        'Warning': 'orange',
        'Error': 'red',
        'Unknown': 'black'
    };

    $scope.home = $L("Home");
    $scope.dashboard = $L("Dashboard");

    $scope.totalLabel = $L("Total");
    $scope.totalNormalLabel = $L("Normal");
    $scope.totalWarningLabel = $L("Warning");
    $scope.totalDangerLabel = $L("Danger");
    $scope.totalFailLabel = $L("Fail");

    $scope.systemStatus = $L("System Status");
    $scope.dongle = $L("Dongle");
    $scope.database = $L("Database");
    $scope.service = $L("Service");
    $scope.server = $L("Server");

    var frequency = localStorage.getItem('frequency') || 5000;

    

    var sysinfo = {
        "database": {}, "dongle": {}, "service": {}, "server": {}
    };
});