describe('ApiCall', function() {
    var scope, httpBackend, createController;

    beforeEach(module('angularTable'));

    beforeEach(inject(function($rootScope, $httpBackend, $controller) {
        httpBackend = _$httpBackend_;
        scope = $rootScope.$new();

        createController = function() {
            return $controller('listdata', {
                '$scope': scope
            });
        };
    }));

    afterEach(function() {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it('should run the Test to get the repositories', function() {
        var controller = createController();

        httpBackend.expect('GET', 'https://api.github.com/users/valentinel/repos')
            .respond({
                "success": true
            });

        // have to use $apply to trigger the $digest which will
        // take care of the HTTP request
        scope.$apply(function() {
            scope.fetchRepos();
        });

        expect(scope.parseOriginalUrlStatus).toEqual('calling');

        httpBackend.flush();

        expect(scope.parseOriginalUrlStatus).toEqual('waiting');
        expect(scope.doneScrapingOriginalUrl).toEqual(true);
    });
});
/**
 * Created by valen on 09/05/2016.
 */
