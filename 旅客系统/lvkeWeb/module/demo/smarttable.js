;(function($,ng,app){


	//required calling
	app.ui.ngInit({
		ngModule:'demo'
	});
		
	var module=ng.module('demo',['smart-table']);
	
	module.controller('basicsCtrl', ['$scope', function (scope) {
		scope.rowCollection=[
			{firstName: 'Laurent', lastName: 'Renard', birthDate: '1987-05-21', balance: 102, email: 'whatever@gmail.com'},
			{firstName: 'Blandine', lastName: 'Faivre', birthDate: '1987-04-25', balance: -2323.22, email: 'oufblandou@gmail.com'},
			{firstName: 'Francoise', lastName: 'Frere', birthDate: '1955-08-27', balance: 42343, email: 'raymondef@gmail.com'},
			{firstName: 'Laurent', lastName: 'Renard', birthDate: '1987-05-21', balance: 102, email: 'whatever@gmail.com'},
			{firstName: 'Blandine', lastName: 'Faivre', birthDate: '1987-04-25', balance: -2323.22, email: 'oufblandou@gmail.com'},
			{firstName: 'Francoise', lastName: 'Frere', birthDate: '1955-08-27', balance: 42343, email: 'raymondef@gmail.com'},
			{firstName: 'Laurent', lastName: 'Renard', birthDate: '1987-05-21', balance: 102, email: 'whatever@gmail.com'},
			{firstName: 'Blandine', lastName: 'Faivre', birthDate: '1987-04-25', balance: -2323.22, email: 'oufblandou@gmail.com'},
			{firstName: 'Francoise', lastName: 'Frere', birthDate: '1955-08-27', balance: 42343, email: 'raymondef@gmail.com'}
			
		];
	}]);



})(jQuery,angular,app);
