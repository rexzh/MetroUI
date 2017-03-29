var app = angular.module('AppModule', ['ngRoute', 'http.service', 'common', 'metro.directive', 'data.service', 'l10n']);

app.constant('resetMenu', function () {
    var mn = $("#sidebar-left").first();
    mn.find("a").each(function () {
        if ($(this).attr('href') == '#/dashboard/')
            $(this).parent().addClass('active');
        else
            $(this).parent().removeClass('active');
    });
});

app.constant('resize', function(){
    console.log("resize!");
    var winHeight = $(window).height();
    var winWidth = $(window).width();

    var contentHeight = $("#content").height();

    if (winHeight) {
        $("#content").css("min-height", winHeight/* - 41 * 2 - 6*/);
    }

    if (contentHeight) {
        $("#sidebar-left2").css("height", contentHeight);
    }
});

app.config(function ($routeProvider, $LProvider) {
    var lang = localStorage.getItem('lang');
    if(lang)
        $LProvider.setLocale(lang);
    else
        $LProvider.setLocale('zh_cn');

    $routeProvider.
        when('/messages/', {
            templateUrl: './src/messages/messages.html',
            controller: 'MessagesCtrl'
        }).
        when('/dashboard/', {
            templateUrl: './src/dashboard/dashboard.html',
            controller: 'DashboardCtrl'
        }).
        when('/settings/', {
            templateUrl: './src/settings/settings.html',
            controller: 'SettingsCtrl'
        }).
        when('/forms/', {
            templateUrl: './src/forms/forms.html',
            controller: 'FormsCtrl'
        }).
        when('/management/', {
            templateUrl: './src/management/management.html',
            controller: 'ManagementCtrl'
        }).
        when('/about/', {
            templateUrl: './src/about/about.html',
            controller: 'AboutCtrl'
        }).
        when('/auth/', {
            templateUrl: './src/auth/auth.html',
            controller: 'AuthCtrl'
        }).
        when('/chgpwd/', {
            templateUrl: './src/chgpwd/chgpwd.html',
            controller: 'ChgpwdCtrl'
        }).
        otherwise({
            redirectTo: '/dashboard/'
        });
}).config(['$httpProvider', function($httpProvider) {
	$httpProvider.interceptors.push('ajaxInterceptor');
}]).run(function(resize) {
    $(window).bind("resize", resize);
});