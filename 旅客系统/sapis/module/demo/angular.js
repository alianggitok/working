;(function($,ng){

		
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
	app.ui.ngInit();


})(jQuery,angular);
