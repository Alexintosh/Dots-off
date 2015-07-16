angular.module('dotsoff', ['ionic', 'ionic.service.core', 'ionic.service.analytics'])
.config(function($ionicAppProvider){
	$ionicAppProvider.identify({
		app_id: 'bc4d9080',
		api_key: '26f2c1cf96579d758cbaa9c2018f99d97689df12ac4e01f5'
	});
})
.run(function($ionicPlatform, $ionicAnalytics) {
  $ionicPlatform.ready(function() {
	$ionicAnalytics.register({
		dryRun: true
	});
	if(window.cordova && window.cordova.plugins.Keyboard) {
		cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
	}
	if(window.StatusBar) {
		StatusBar.styleDefault();
	}
  });
})
