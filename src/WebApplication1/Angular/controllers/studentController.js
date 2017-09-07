angular.module('controllers')
.controller('studentController', ['$window', '$scope', '$filter', 'studentService', function ($window, $scope, $filter, studentService) {

    $scope.students = [];

    $scope.adminName = 'Arshad Khan';//$window.prompt('Please enter your name:');

    $scope.errorCount = 0;
    $scope.totalCount = 0;

    $scope.initializeStudent = function (form) {
        $scope.student = { Name: "", Department: "", Subject: "" };
        if (form) {
            form.$setPristine();
            form.$setUntouched();
        }
    };

    list('a', '1');
    $scope.initializeStudent();

    function list(search, key) {
        studentService.getlist(search, key)
        .then(function (response) {
            if (response.status == 200) {
                $scope.students = response.data;
                $scope.totalCount = $scope.students.length;
            }
        });
    }

    $scope.addStudent = function () {
        if ($scope.form.$valid) {
            studentService.save($scope.student)
            .then(function (response) {
                if (response.status == 200) {
                    $scope.totalCount++;
                    if ($scope.totalCount > 6) {
                        $scope.adminMessage = 'Wil you continue till death ! \n Man please go it\'s not the End';
                    }
                    $scope.students = response.data;
                    $scope.initializeStudent();
                } else if ($scope.errorCount > 2) {
                    $scope.errorCount++;
                    $scope.adminMessage = 'Why you are trying to add something my system is not accepting it. I\' will kill my self in next bad attempt !';
                }
            });
        }
    }

    $scope.updateAdminName = function () {
        $scope.temp = $scope.adminName;
        $scope.editingAdminName = true;
    }

    $scope.saveAdminName = function () {
        $scope.editingAdminName = false;
    }

    $scope.closeAdminName = function () {
        $scope.adminName = $scope.temp;
        $scope.editingAdminName = false;
    }

    $scope.changed = false;
    $scope.Capital = "Capital";
    $scope.changeLetter = function () {
        if ($scope.student.Name) {
            if ($scope.changed) {
                $scope.Capital = "Capital"
                $scope.student.Name = $filter('lowercase')($scope.student.Name);
            }
            else {
                $scope.Capital = "Lower"
                $scope.student.Name = $filter('uppercase')($scope.student.Name);
            }

            $scope.changed = !$scope.changed;
        }
    }
}])