/**
 * 
 */

Ext.onReady(function() {
	Ext.QuickTips.init();
	Ext.Loader.setConfig({
		enabled : true
	});
	Ext.application({
		name : 'AM',
		controllers : [ 'Users' ],
        appFolder: 'static/js/administrator/app',
		autoCreateViewport : true,
		launch : function() {
		}
	});
});
