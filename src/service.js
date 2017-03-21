(function(){
    'use strict';
    var svc = angular.module('http.service', []);

    svc.factory('ajaxInterceptor', function () {
        var interceptor = {
            request: function(config) {
                //console.log("request", config);
                return config;
            },

            response: function(response) {
                //if(response.config.url.match(/^(.)*.json/g)) {
                //}
                //console.log("response", response);
                return response;
            },

            responseError: function(response) {
                if(response.status == 401) {
                    //TODO:Auth
                } else {
                    //Error
                }
                //console.log("response", response);
                return response;
            }
        }

        return interceptor;
    });
})();