angular
    .module('user.module', [])    
    .service('userModel', user);
    
    user.$inject = ['url', 'api', '$rootScope']; 
    function user(url, api, $rootScope) {
        var service = {
            one: one,
            all: all,
            update: update
        };
        return service;

        function one(id) {
            return api.get(
                        url.user.one,
                        {
                            id: id
                        }
                    ).then(
                        data => {
                            console.log(data);
                            return data;
                        }
                    )
        }

        function all(data) {
            return api.get(
                        url.user.all,
                        data
                    ).then(
                        data => {
                            console.log(data);
                            return data;
                        }
                    )
        }

        function update(data) {
            return api.post(
                        url.user.update,
                        data
                    ).then(
                        data => {
                            console.log(data);
                            return data;
                        }
                    )
        }
    }
    