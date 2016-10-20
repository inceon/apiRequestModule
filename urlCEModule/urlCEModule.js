// url for API
angular.module('factory.url', [])
    .factory('url', [
        function() {
            var baseUrl = 'http://proxymed.apes-at-work.com/api/web/v3/';
            return {
                user: {
                    token: baseUrl + 'site/login-key',
                    login: baseUrl + 'site/login'
                },
                list: {
                    getAll: baseUrl + 'user/view-all',
                    getOne: baseUrl + 'user/view-one'
                },
                docs: {
                    getDocs: baseUrl + 'document/view-all',
                    getFileUrl: baseUrl + 'document/download-pdf',
                    getTypeDoc: baseUrl + 'doc-template/view-all',
                    getDocFields: baseUrl + 'doc-template/view-one',
                    getDocUpdate: baseUrl + 'document/view-one',
                    createDoc: baseUrl + 'document/add',
                    updateDoc: baseUrl + 'document/update',
                    // uploadSamples: baseUrl + 'some/here'
                }
            }
        }
    ]);