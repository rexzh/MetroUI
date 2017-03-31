(function () {
    'use strict';
	var baseUrl = '/service/';
	var svc = angular.module('data.service', ['ngResource']);

	function errMsg(url, response) {
	    var msg = 'Error when call: ' + url;
	    if (response) {
	        msg += ' [' + response.status + ':' + response.statusText + '] ';
	    }
	    
	    if (response && response.data && response.data.errorMessage) {
	        msg = response.data.errorMessage + msg;
	    }
	    return msg;
	};

	function simpleQuery($resource, $q, url) {
	    var res = $resource(url);
	    var delay = $q.defer();
	    res.get(
            function (response) {
                if (response) {
                    delay.resolve(response);
                } else {
                    delay.reject(errMsg(url, response));
                }
            },
            function (response) {
                delay.reject(errMsg(url, response));
            });

	    return delay.promise;
	};

	function arrayQuery($resource, $q, url) {
	    var res = $resource(url);
	    var delay = $q.defer();
	    res.query(
            function (response) {
                if (response) {
                    delay.resolve(response);
                } else {
                    delay.reject(errMsg(url, response));
                }
            },
            function (response) {
                delay.reject(errMsg(url, response));
            });

	    return delay.promise;
	};

	svc.factory('AboutResource', function ($resource, $q) {
	    return {
	        query: function () {
	            var url = baseUrl + "about/";
	            return simpleQuery($resource, $q, url);
	        }
	    }
	});

	svc.factory('AuthResource', function ($q, $http) {
	    return {
	        auth: function (pwd) {
	            var url = baseUrl + "authentication/";
	            var delay = $q.defer();
	            $http.post(url, { password: pwd }).success(function (data, status) {
	                delay.resolve(data);
	            }).error(function (data, status) {
	                delay.reject(data);
	            })
	            return delay.promise;
	        }
	    }
	});

	svc.factory('MessageResource', function ($resource, $q) {
	    return {
	        query: function (data) {
	            var url = baseUrl + "messages/";
	            return arrayQuery($resource, $q, url);
	        }
	    }
	});
})();