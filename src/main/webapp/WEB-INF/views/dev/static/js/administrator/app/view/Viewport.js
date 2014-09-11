Ext.define('AM.view.Viewport', {
	extend : 'Ext.container.Viewport',
	requires : [ 'AM.view.menu.TreeView' ],
	layout : 'border',
	items : [ {
		region : 'center',
		id:'tab',
		xtype : 'tabpanel',
		activeTab : 0,
		items : {
			title : '欢迎页',
			closable : true,
			html : '<p>text</p>'
		}
	}, {
		region : 'west',
		xtype : 'treelist'
	} ]
});
