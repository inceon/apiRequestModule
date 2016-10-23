angular
    .module('api.url.module', [])
    .factory('url', [
        function () {
                var baseUrl = './';
                return {
                    user: {
                        all:         baseUrl + 'user/all.json',
                    }
                }
            }
    ]);