angular.module('factory.request', [
    'ngStorage',
    'toastModule'
])
    .factory('api', ['$http', '$sessionStorage', '$state', 'toast', '$ionicLoading',
        function ($http, $sessionStorage, $state, toast, $ionicLoading) {
            var request = function (method, url, data, successCallback, errorCallback) {
                $ionicLoading.show({
                    templateUrl: 'templates/loading.html'
                }).then(function () {
                });
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

                if ($sessionStorage.auth_key) {
                    config.url = url + '?access-token=' + $sessionStorage.auth_key;
                } else {
                    config.url = url;
                }

                return $http(config).then(
                    function (response) {
                        console.info('response', url, response);
                        $ionicLoading.hide().then(function(){});
                        if (response.data.error) {
                            toast.simpleToast(response.data.error);
                        }
                        else if (successCallback) {
                            successCallback(response.data);
                        }
                    },
                    function (response) {
                        console.info('error', url, response);
                        $ionicLoading.hide().then(function(){});
                        if (response.status == 200) {
                            toast.simpleToast("Server Error: " + response.data);
                        }
                        else if (response.status == -1) {
                            toast.simpleToast("Server unavailable");
                        }
                        else if (response.status == 500) {
                            toast.simpleToast("Server Error: " + response.status + ' ' + response.data.message);
                        }
                        else {
                            toast.simpleToast("Server Error: " + response.status + ' ' + response.statusText);
                        }

                        if (errorCallback) {
                            errorCallback(response.data);
                        }
                    }
                )
            };
            var requestFile = function (url, data, successCallback, errorCallback) {
                $ionicLoading.show({
                    templateUrl: 'templates/loading.html'
                }).then(function () {
                });
                var config = {
                    transformRequest: angular.identity,
                    headers: {
                        'Content-Type': undefined
                    }
                };
                if ($sessionStorage.auth_key) {
                    url = url + '?auth_key=' + $sessionStorage.auth_key;
                }

                return $http.post(url, data, config).then(
                    function (response) {
                        console.info('response', url, response);
                        $ionicLoading.hide().then(function(){});
                        if (response.data.error) {
                            toast.simpleToast(response.data.error);
                        }
                        else if (successCallback) {
                            successCallback(response.data);
                        }
                    },
                    function (response) {
                        console.info('error', url, response);
                        $ionicLoading.hide().then(function(){});
                        if (response.status == 200) {
                            toast.simpleToast("Server Error: " + response.data);
                        }
                        else if (response.status == -1) {
                            toast.simpleToast("Server unavailable");
                        }
                        else if (response.status == 500) {
                            toast.simpleToast("Server Error: " + response.status + ' ' + response.data.message);
                        }
                        else {
                            toast.simpleToast("Server Error: " + response.status + ' ' + response.statusText);
                        }

                        if (errorCallback) {
                            errorCallback(response.data);
                        }
                    }
                )
            };

            return {
                get: function (url, data, successCallback, errorCallback) {
                    return request('GET', url, data, successCallback, errorCallback);
                },
                post: function (url, data, successCallback, errorCallback) {
                    return request('POST', url, data, successCallback, errorCallback);
                },
                delete: function (url, data, successCallback, errorCallback) {
                    return request('DELETE', url, data, successCallback, errorCallback);
                },
                put: function (url, data, successCallback, errorCallback) {
                    return request('PUT', url, data, successCallback, errorCallback);
                },
                file: function (url, data, successCallback, errorCallback) {
                    return requestFile(url, data, successCallback, errorCallback);
                }
            }
        }
    ]);