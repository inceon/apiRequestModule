var proxyMed = angular.module('proxyMed',
    ['ionic',
        'ionic-toast',
        'ui.mask',
        'pascalprecht.translate',
        'ngCordova',
        'ionic-modal-select',

        'constants',
        'directive.footer',
        'toastModule',
        'factory.url',
        'factory.request',
        'model.user',
        'soundboard'
    ])
    .run(
        ['$ionicPlatform',
            '$rootScope',
            '$sessionStorage',
            'api',
            '$state',
            '$stateParams',
            '$localStorage',
            function ($ionicPlatform, $rootScope, $sessionStorage, api, $state, $stateParams) {
                $ionicPlatform.ready(function () {
                    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                        cordova.plugins.Keyboard.disableScroll(true);
                    }
                    if (window.StatusBar) {
                        StatusBar.styleDefault();
                    }
                });
                $rootScope.stateParams = $stateParams;
                // if ($localStorage.preferUserLanguage) {
                //     $translate.use($localStorage.preferUserLanguage);
                // }
                // if ($localStorage.auth_key) {
                //     $sessionStorage.access_token = $localStorage.access_token;
                // }
                if ($sessionStorage.access_token) {
                    userModel.get();
                    if ($rootScope.isLogged) {
                        $state.go('app.patients');
                    }
                }
                else {
                    $state.go('login');
                }
            }
        ]
    );