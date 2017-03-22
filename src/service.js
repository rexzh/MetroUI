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

(function(){
    'use strict';
    var svc = angular.module('common', []);

    svc.factory('regEx', function () {
        return function(pattern, string) {
            pattern = pattern.toString();
            var result = [];
            var groupRX = /\(\<(.*?)\>\s(.*?)\)/;
            while (groupRX.test(pattern)) {
                var match = groupRX.exec(pattern);
                result.push({
                    name : match[1],
                    pattern : match[2],
                    value : null
                });
                pattern = pattern.replace(groupRX, '('+match[2]+')');
            }
             
            var finalMatch=(new RegExp(pattern)).exec(string);
            if(finalMatch) {
                for (var i = 0, len = result.length; i < len; i++) {
                    if(finalMatch[(i + 1)] !== false) {
                        result[i].value = finalMatch[(i + 1)];
                    }
                }
            }
            return result;
        };
    });

    svc.factory('parseDate', function(regEx) {
        return function(str, format) {
            //var pt = '(<day> [0-9]+)-(<month> [0-9]+)-(<year> [0-9]+)';
            var pt = format.replace('yyyy', '(<year> [0-9]+)');
            if(pt.indexOf('MM') >= 0)
                pt = pt.replace('MM', '(<month> [0-9]+)');
            else
                pt = pt.replace('M', '(<month> [0-9]+)');
                
            if(pt.indexOf('dd') >= 0)
                pt = pt.replace('dd', '(<day> [0-9]+)');
            else
                pt = pt.replace('d', '(<day> [0-9]+)');
            var m = regEx(pt, str);
            var obj = {};
            for(var i = 0, len = m.length; i < len; i++){
                var v = parseInt(m[i].value);
                if(isNaN(v))
                    return null;
                obj[m[i].name] = v;
            }
            
            return new Date(obj.year, obj.month - 1, obj.day);
        }
    });
})();