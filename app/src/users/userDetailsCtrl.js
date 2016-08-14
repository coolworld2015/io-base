(function () {
    'use strict';

    angular
        .module('app')
        .controller('UserDetailsCtrl', UserDetailsCtrl);

    UserDetailsCtrl.$inject = ['$rootScope', '$state', '$stateParams', 'UsersService', '$ionicLoading'];

    function UserDetailsCtrl($rootScope, $state, $stateParams, UsersService, $ionicLoading) {
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
            $ionicLoading.show({
                template: '<ion-spinner></ion-spinner>'
            });

            var item = {
                id: vm.id,
                name: vm.name,
                pass: vm.pass,
                description: vm.description
            };

            UsersService.editItem(item)
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
