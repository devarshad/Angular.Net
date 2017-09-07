angular.module('directives')
.directive('studentEntry', function () {
    return {
        template:
            '<table class="table">' +
            '<thead><th>Name</th><th>Department</th><th>Subject</th></thead>' +
                '<tbody>' +
                    '<tr ng-repeat="item in entities | filter: query as results" class="animate-repeat">' +
                        '<td ng-bind="item.Name"></td>' +
                        '<td ng-bind="item.Department"></td>' +
                        '<td ng-bind="item.Subject"></td>' +
                    '</tr>' +
                '</tbody>' +
            '</table>'
    };
})
.directive('studentList', function () {
    return {
        scope: {
            entities: '=info'
        },
        template: '<div class="col-md-5">' +
            '<div class="page-header">' +
                'Students till now !' +
                '<input type="text" class="form-control" ng-model="query"' +
            '</div>' +
            '<student-entry></student-entry>' +
            '</div>'
    };
})
.directive('studentCreate', function () {
    return { templateUrl: '../Angular/templates/CreateStudent.html' };
})
.directive('integer', function ($q, $timeout) {
    return {
        require: 'ngModel',
        link: function (scope, elem, attrs, ctrl) {
            ctrl.$asyncValidators.integer = function (modelValue, viewValue) {

                if (ctrl.$isEmpty(modelValue))
                    return $q.resolve();

                var d = $q.defer();

                $timeout(function () {
                    /^\d+$/.test(viewValue) ? d.resolve() : d.reject();
                }, 2000);

                return d.promise;
            }
        }
    }
})