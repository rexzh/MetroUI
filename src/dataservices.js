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

    svc.factory('SystemResource', function ($resource, $q) {
        return {
            query: function () {
                var url = baseUrl + "system/";
                return simpleQuery($resource, $q, url);
            }
        }
	});
    
	svc.factory('StatusResource', function ($resource, $q) {
	    return {
	        queryGlobal: function(){
	            var url = baseUrl + "gstatus/";
	            return simpleQuery($resource, $q, url);
	        },

            queryAll: function () {
                var url = baseUrl + "status/";
                return simpleQuery($resource, $q, url);
            },

            queryBlock: function (boxId, blockId) {
                var url = baseUrl + "status/" + boxId + '/' + blockId;
                return simpleQuery($resource, $q, url);
            },

            querySensor: function (boxId, blockId, sensorId) {
                var url = baseUrl + "status/" + boxId + '/' + blockId + '/' + sensorId;
                return simpleQuery($resource, $q, url);
            },

            queryHistory: function (boxId, blockId, sensorId, timeRange) {
                var url = baseUrl + "history/" + boxId + '/' + blockId + '/' + sensorId + '?range=' + timeRange;
                return simpleQuery($resource, $q, url);
            }
        }
	});

	svc.factory('PwdResource', function ($q, $http) {
	    return {
	        change: function (data) {
	            var url = baseUrl + "password/";
	            var delay = $q.defer();
	            $http.put(url, data).success(function (data, status) {
	                delay.resolve(data);
	            }).error(function (data, status) {
	                delay.reject(data);
	            });
	            return delay.promise;
	        }
	    }
	});

	svc.factory('MetaResource', function ($q, $http, $resource) {
	    return {
	        queryBoxes: function () {
	            var url = baseUrl + "meta/";
	            return arrayQuery($resource, $q, url);
	        },

	        queryBlock: function (boxId, blockId) {
	            var url = baseUrl + "meta/" + boxId + '/' + blockId;
	            return simpleQuery($resource, $q, url);
	        },

	        saveBlock: function (obj) {
	            var url = baseUrl + "meta/";
	            var delay = $q.defer();
	            $http.post(url, obj).success(function (data, status) {
	                delay.resolve(status);
	            }).error(function (data, status) {
	                delay.reject(status);
	            });
	            return delay.promise;
	        },

	        saveBox: function (obj) {
	            var url = baseUrl + "meta/box/";
	            var delay = $q.defer();
	            $http.post(url, obj).success(function (data, status) {
	                delay.resolve(status);
	            }).error(function (data, status) {
	                delay.reject(status);
	            });
	            return delay.promise;
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