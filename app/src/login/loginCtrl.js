(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = ['$ionicLoading', '$rootScope', '$state', '$http', 'UsersService', 'AuditService'];

    function LoginCtrl($ionicLoading, $rootScope, $state, $http, UsersService, AuditService) {
        var vm = this;
		var webUrl = $rootScope.myConfig.webUrl;
		
        angular.extend(vm, {
            init: init,
			change: change,
            toLogin: toLogin,
            checkUser: checkUser,
            _check: check,
            _errorHandler: errorHandler
        });

        init();

        function init() {
            vm.name = '1';
            vm.pass = '1';
            $rootScope.currentUser = undefined;
            $rootScope.raisedError = false;
        }

        function change() {
            vm.error = false;
        }        
		
		function toLogin() {
            if (vm.form.$invalid) {
                return;
            }
            checkUser(vm.name, vm.pass);
        }

        function checkUser(name, pass) {
            if ($rootScope.mode == 'ON-LINE (Heroku)') {
                getUsersOn(name, pass);
            } else {
                vm.users = UsersLocalStorage.getUsers();
                check(vm.users, name, pass);
            }
        }
		
        function getUsersOn(name, pass) {
            $ionicLoading.show({
                template: '<ion-spinner></ion-spinner>'
            });
				var item = {
					"name": vm.name,
					"pass": vm.pass
                };
				
                $http.post(webUrl + 'api/login', item)
                        .then(function (results) {
							$rootScope.loading = false;
							$rootScope.access_token = results.data;
							console.log(results);
 
								$rootScope.currentUser = {
									name: vm.name,
									pass: vm.pass
								};
								
								var id = + new Date;
								var description  = navigator.userAgent;
								var item = {
									id: id,
									name: vm.name,
									description: description
								};
 
								AuditService.addItem(item)
									.then(function () {
										vm.error = false;
										$state.go('root.home');
									})
									.catch(errorHandler);
 								
 							$ionicLoading.hide();
                        })
						.catch(errorHandler);
        }
		
        function check(users, name, pass) {
            if (users) {
                for (var i = 0; i < users.length; i++) {
                    if (users[i].name == name && users[i].pass == pass) {
                        $rootScope.currentUser = {
                            name: name,
                            pass: pass
                        };
                        $state.go('root.home');
                    } else {
                        vm.error = true;
                    }
                }
            }
        }

        function errorHandler() {
            $rootScope.raisedError = true;
            $ionicLoading.hide();
        }
    }
})();
