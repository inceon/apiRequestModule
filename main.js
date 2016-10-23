angular
    .module('main', ['user.module', 'api.module', 'api.url.module'])
    .controller('Test', function($http, userModel){
        var vm = this;
        userModel
            .all()
            .then(
                response => {
                    vm.info = response
                }, 
                err => {
                    console.log(err)
                }
            );
    })