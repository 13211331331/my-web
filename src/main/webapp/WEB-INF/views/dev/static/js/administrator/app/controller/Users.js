/**
 * 
 */

Ext.define('AM.controller.Users', {
	extend : 'Ext.app.Controller',
	views : [ 'menu.TreeView' ],
	
	
    
	onPanelRendered : function() {
		console.log('The panel was rendered');
	}
});
