(function () {
    'use strict';

    angular
        .module('app')
        .config(routeConfig);

    routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('root', {
                url: '/root',
                abstract: true,
                templateUrl: 'app/root.html'
            })

            .state('root.home', {
                url: '/home',
                data: {
                    requireLogin: true
                },
                views: {
                    'root-home': {
                        templateUrl: 'app/home.html'
                    }
                }
            })
 
            .state('root.phones', {
                url: '/phones',
                data: {
                    requireLogin: true
                },
                views: {
                    'root-phones': {
                        templateUrl: 'phones/phones.html',
                        controller: 'PhonesCtrl',
                        controllerAs: 'phonesCtrl'
                    }
                }
            })

            .state('root.phone-details', {
                url: '/phone-details',
                data: {
                    requireLogin: true
                },
                params: {item: {}},
                views: {
                    'root-phones': {
                        templateUrl: 'phones/phone-details.html',
                        controller: 'PhoneDetailsCtrl',
                        controllerAs: 'phoneDetailsCtrl'
                    }
                }
            })

            .state('root.phones-search', {
                url: '/phones-search',
                data: {
                    requireLogin: true
                },
                views: {
                    'root-phones': {
                        templateUrl: 'phones/phones-search.html',
                        controller: 'PhonesSearchCtrl',
                        controllerAs: 'phonesSearchCtrl'
                    }
                }
            })

            .state('root.phones-search-results', {
                url: '/phones-search-results?name?search?finds',
                data: {
                    requireLogin: true
                },
                views: {
                    'root-phones': {
                        templateUrl: 'phones/phones-search-results.html',
                        controller: 'PhonesSearchResultsCtrl',
                        controllerAs: 'phonesSearchResultsCtrl'
                    }
                },
                resolve: {
                    items: ['$http', '$stateParams', '$rootScope', '$ionicLoading',
                        function ($http, $stateParams, $rootScope, $ionicLoading) {
                            var api;
                            var name = $stateParams.name;
                            var type = $stateParams.search;

                            if (type == 'name') {
                                api = 'api/items/findByName/';
                            } else {
                                api = 'api/items/findByPhone/';
                            }

                            var webUrl = $rootScope.myConfig.webUrl + api;
                            return $http.get(webUrl + name)
                                .then(function (data) {
                                    $ionicLoading.hide();
                                    return data.data;
                                })
                                .catch(function () {
									$rootScope.raisedError = true;
									$ionicLoading.hide();
                                    return [];
                                });
                        }
                    ]
                }
            })

            .state('root.audit', {
                url: '/audit',
                data: {
                    requireLogin: true
                },
                views: {
                    'root-audit': {
                        templateUrl: 'audit/audit.html',
                        controller: 'AuditCtrl',
                        controllerAs: 'auditCtrl'
                    }
                }
            })

            .state('root.audit-details', {
                url: '/audit-details',
                data: {
                    requireLogin: true
                },
                params: {item: {}},
                views: {
                    'root-audit': {
                        templateUrl: 'audit/audit-details.html',
                        controller: 'AuditDetailsCtrl',
                        controllerAs: 'auditDetailsCtrl'
                    }
                }
            })
			
           .state('root.users', {
                url: '/users',
                data: {
                    requireLogin: true
                },
                views: {
                    'root-users': {
                        templateUrl: 'users/users.html',
                        controller: 'UsersCtrl',
                        controllerAs: 'usersCtrl'
                    }
                }
            })			
		
            .state('root.user-details', {
                url: '/user-details',
                data: {
                    requireLogin: true
                },
                params: {item: {}},
                views: {
                    'root-users': {
                        templateUrl: 'users/user-details.html',
                        controller: 'UserDetailsCtrl',
                        controllerAs: 'userDetailsCtrl'
                    }
                }
            })
			
            .state('root.user-add', {
                url: '/user-add',
                data: {
                    requireLogin: true
                },
                params: {item: {}},
                views: {
                    'root-users': {
                        templateUrl: 'users/user-add.html',
                        controller: 'UserAddCtrl',
                        controllerAs: 'userAddCtrl'
                    }
                }
            })
			
			.state('login', {
                url: '/login',
                data: {
                    requireLogin: false
                },
                templateUrl: 'login/login.html',
                controller: 'LoginCtrl',
                controllerAs: 'loginCtrl'
            });
			
        $urlRouterProvider.otherwise('login');
    }

})();