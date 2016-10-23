angular
    .module('api.module', [])
    .factory('api',
        function ($http, $q) {
            var request = function (method, url, data) {
                var config = {
                    dataType: 'json',
                    method: method,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json; charset=UTF-8'
                    }
                };

                if (method == "GET") {
                    config.params = data;
                } else {
                    config.data = data;
                }

                // if ($sessionStorage.auth_key) {
                //     config.url = url + '?access-token=' + $sessionStorage.auth_key;
                // } else {
                //     config.url = url;
                // }
                config.url = url;

                return $http(config).then(
                        response => {
                            console.info('response', url, response);
                            return response.data;
                        },
                        response => {
                            console.info('error', url, response);
                            return response.data;
                        }
                    );
            };
            var requestFile = function (url, data) {
                var config = {
                    transformRequest: angular.identity,
                    headers: {
                        'Content-Type': undefined
                    }
                };
                // if ($sessionStorage.auth_key) {
                //     url = url + '?auth_key=' + $sessionStorage.auth_key;
                // }

                return $http.post(url, data, config).then(
                    function (response) {
                        console.info('response', url, response);
                        return response.data;
                    },
                    function (response) {
                        console.info('error', url, response);
                        return response.data;
                    }
                )
            };

            return {
                get: function (url, data) {
                    return request('GET', url, data);
                },
                post: function (url, data) {
                    return request('POST', url, data);
                },
                delete: function (url, data) {
                    return request('DELETE', url, data);
                },
                put: function (url, data) {
                    return request('PUT', url, data);
                },
                file: function (url, data) {
                    return requestFile(url, data);
                }
            }
        }
    )