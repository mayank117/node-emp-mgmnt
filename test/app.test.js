//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let server = require('../app');

var expect  = require('chai').expect;
var request = require('request');
var fs = require('fs');

describe('employees test suite', function() {
	before(function() {
		var filePath = './../employees.json'; 
		if (fs.existsSync(filePath)) {
    		fs.unlinkSync(filePath);
		}        
    });
    
	describe('/POST employees', function() {
        it('should get created when employee id is present', function(done){
            request.post('http://localhost:9899/employees', {
  				json: {
    				'id':'123','name':'abc','age':'21','salary':'12000'
  				}
					}, function(error, response, body) {						
                expect(response.statusCode).to.equal(201);
                done();
            });
        });

        it('should not create when employee id is not present', function(done){
            request.post('http://localhost:9899/employees', {
  				json: {
    				'name':'abc','age':'21','salary':'12000'
  				}
					}, function(error, response, body) {						
                expect(response.statusCode).to.equal(400);
                done();
            });
        });

        it('should not create when employee id already exists', function(done){
            request.post('http://localhost:9899/employees', {
  				json: {
    				'id':'123','name':'abc','age':'21','salary':'12000'
  				}
				}, function(error, response, body) {						
                expect(response.statusCode).to.equal(400);
                done();
            });
        });

    });

    describe ('/PUT employees', function() {
       it('when employee id doesnt exist', function(done){
            request.put('http://localhost:9899/employees/12', {
  				json: {
    				'id':'123','name':'abc','age':'21','salary':'12000'
  				}
				}, function(error, response, body) {						
                expect(response.statusCode).to.equal(500);
                done();
            });
        });
        it('when employee id exists and gets updated', function(done){
            request.put('http://localhost:9899/employees/123', {
  				json: {
    				'id':'123','name':'abc','age':'21','salary':'12000'
  				}
				}, function(error, response, body) {						
                expect(response.statusCode).to.equal(200);
                done();
            });
        });     
	});

	describe ('/GET employees', function() {
       it('get all employees', function(done){
            request('http://localhost:9899/employees', function(error, response, body) {						
                expect(response.statusCode).to.equal(200);
                done();
            });
        });
        it('get employee by id when employee exist', function(done){
            request('http://localhost:9899/employees/123', function(error, response, body) {						
                expect(response.statusCode).to.equal(200);
                done();
            });
        });
        it('get employee by id when employee does not exist', function(done){
            request('http://localhost:9899/employees/456', function(error, response, body) {						
                expect(response.statusCode).to.equal(404);
                done();
            });
        });
	});

	describe ('/DELETE employees', function() {
       it('by id when employee exist', function(done){
            request.delete('http://localhost:9899/employees/123', function(error, response, body) {						
                expect(response.statusCode).to.equal(200);
                done();
            });
        });        
        it('get employee by id when employee does not exist', function(done){
            request.delete('http://localhost:9899/employees/456', function(error, response, body) {						
                expect(response.statusCode).to.equal(500);
                done();
            });
        });
	});
});