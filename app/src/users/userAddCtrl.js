(function () {
    'use strict';

    angular
        .module('app')
        .controller('UserAddCtrl', UserAddCtrl);

    UserAddCtrl.$inject = ['$rootScope', '$state', '$stateParams', 'UsersService', '$ionicLoading'];

    function UserAddCtrl($rootScope, $state, $stateParams, UsersService, $ionicLoading) {
        var vm = this;

        angular.extend(vm, {
            init: init,
            showSubmit: showSubmit,
            userSubmit: userSubmit
        });

        angular.extend(vm, $stateParams.item);

        init();

        function init() {
            vm.submitShowed = false;
        }

        function showSubmit() {
            vm.submitShowed = vm.submitShowed ? false : true;
        }

        function userSubmit() {
            if (vm.form.$invalid) {
                return;
            }

            $ionicLoading.show({
                template: '<ion-spinner></ion-spinner>'
            });

            var id = (Math.random() * 1000000).toFixed();
            var item = {
                id: id,
                name: vm.name,
                pass: vm.pass,
                description: vm.description
            };

            UsersService.addItem(item)
                .then(function () {
                    $ionicLoading.hide();
                    $state.go('root.users', {}, {reload: true});
                })
                .catch(errorHandler);
        }

        function errorHandler() {
            $rootScope.raisedError = true;
            $ionicLoading.hide();
        }
    }

})();
