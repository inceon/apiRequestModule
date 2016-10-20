proxyMed
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/login");

        $stateProvider
            .state('login', {
                url: "/login",
                cache: false,
                templateUrl: 'templates/login.html',
                controller: 'loginCtrl'
            })

            .state('app', {
                url: '/app',
                abstract: true,
                cache: false,
                templateUrl: 'templates/menu.html',
                controller: 'AppCtrl'
            })

            .state('app.patients', {
                url: '/patients',
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: 'templates/patientsList.html',
                        controller: 'patientsCtrl'
                    }
                }
            })

            .state('app.patientInfo', {
                url: '/info/:id',
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: 'templates/patientInfo.html',
                        controller: 'patientInfoCtrl'
                    }
                }
            })

            .state('app.patientDocuments', {
                url: '/documents/:id',
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: 'templates/patientDocuments.html',
                        controller: 'patientDocumentsCtrl'
                    }
                }
            })
            .state('app.createDocument', {
                url: '/create/:id',
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: 'templates/createDocument.html',
                        controller: 'createDocumentCtrl'
                    }
                }
            })
            .state('app.updateDocument', {
                url: '/update/:id/:docId',
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: 'templates/createDocument.html',
                        controller: 'updateDocumentCtrl'
                    }
                }
            })
            .state('app.recordsList', {
                url: '/records-list/:id/:docId/:fieldId',
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: 'templates/recordsList.html',
                        controller: 'recordsListCtrl'
                    }
                }
            })
            .state('app.record', {
                url: '/record/:id/:docId/:fieldId/:recordId',
                cache: false,
                views: {
                    'menuContent': {
                        templateUrl: 'templates/record.html',
                        controller: 'recordCtrl'
                    }
                }
            });
    }]);