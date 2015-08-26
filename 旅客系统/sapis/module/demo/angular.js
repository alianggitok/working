;(function($,ng,app){

		
	var module=ng.module('demo',[]);

	module.controller('hello',[
		'$scope',
		function hello($scope){
			$scope.words={
				text:'Hello angular'
			};
		}
	]);


	//required calling
	app.ui.ngInit({
		ngModule:'demo'
	});


})(jQuery,angular,app);
