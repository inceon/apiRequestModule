angular.module('model.user', [
    'ngStorage'
])
    .service('userModel',
        ['url',
            'api',
            '$sessionStorage',
            '$localStorage',
            '$rootScope',
            '$q',
            '$ionicLoading',
            function (url, api, $sessionStorage, $localStorage, $rootScope) {
                // get current user into dashboard
                this.get = function (callback) {
                    api.get(
                        url.user.current,
                        {},
                        function (data) {
                            console.log(data);
                            delete data['auth_key'];
                            $rootScope.user = data;
                            $rootScope.isLogged = true;

                            callback(data);
                        }
                    )
                };
                this.login = function (phone, password, callback) {
                    api.post(
                        url.user.login,
                        {
                            phone: phone,
                            password: password
                        },
                        function (data) {
                            $sessionStorage.auth_key = data.user['auth_key'];
                            // if(isRememberMe) {
                            //     $localStorage.auth_key = data.user['auth_key'];
                            // }
                            delete data.user['auth_key'];
                            $rootScope.user = data;
                            $rootScope.isLogged = true;
                            callback();
                        }
                    );
                };
                this.create = function (userName, image, firstName, lastName, email, password, callback) {
                    api.post(
                        url.user.create,
                        {
                            username: userName,
                            image_id: image,
                            first_name: firstName,
                            last_name: lastName,
                            email: email,
                            password: password
                        },
                        function (data) {
                            $sessionStorage.auth_key = data['auth_key'];

                            delete data['auth_key'];
                            $rootScope.user = data;
                            $rootScope.isLogged = true;

                            callback(data);
                        }
                    );
                };
                this.patients = function (role, lastname, callback) {
                    api.get(
                        url.list.getAll,
                        {
                            role: role,
                            last_name: lastname
                        },
                        function (data) {
                            callback(data);
                        }
                    );
                };
                this.patient = function (id, callback) {
                    api.get(
                        url.list.getOne,
                        {
                            user_id: id
                        },
                        function (data) {
                            callback(data);
                        }
                    );
                };
                this.documents = function (id, callback) {
                    api.get(
                        url.docs.getDocs,
                        {
                            patient_id: id
                        },
                        function (data) {
                            callback(data);
                        }
                    );
                };
                this.downloadUrl = function(id, callback) {
                    api.get(
                        url.docs.getFileUrl,
                        {
                            document_id: id
                        },
                        function (data) {
                            callback(data);
                        }
                    );
                };
                this.getDocTypes = function(callback) {
                    api.get(
                        url.docs.getTypeDoc,
                        {},
                        function (data) {
                            callback(data);
                        }
                    );
                };
                this.getFields = function(id, callback) {
                    api.get(
                        url.docs.getDocFields,
                        {
                            document_id: id
                        },
                        function (data) {
                            callback(data);
                        }
                    );
                };
                this.getUpdateFields = function(id, callback) {
                    api.get(
                        url.docs.getDocUpdate,
                        {
                            document_id: id
                        },
                        function (data) {
                            callback(data);
                        }
                    );
                };
                this.createDocument = function(data, callback) {
                    api.post(
                        url.docs.createDoc,
                        data,
                        function (data) {
                            callback(data);
                        }
                    );
                };
                this.updateDocument = function(data, callback) {
                    api.post(
                        url.docs.updateDoc,
                        data,
                        function (data) {
                            callback(data);
                        }
                    );
                };
                // this.uploadSoundSamples = function(data, callback) {
                //     api.file(
                //         url.docs.uploadSamples,
                //         data,
                //         function (data) {
                //             callback(data);
                //         }
                //     );
                // };
                this.logout = function () {
                    $rootScope.isLogged = false;
                    delete $rootScope.user;
                    delete $sessionStorage.auth_key;
                    // delete $localStorage.auth_key;
                };
            }
        ]);