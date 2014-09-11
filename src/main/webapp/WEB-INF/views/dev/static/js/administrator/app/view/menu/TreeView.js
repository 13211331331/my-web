Ext.define('AM.view.menu.TreeView', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.treelist',
	frame : true,
	title : '系统菜单',
	width : 150,
	collapsible : true,
	split : true,
	layout : 'accordion',
	id : 'menuPanel',
	initComponent : function() {
		Ext.Ajax.request({
			url : 'administrator/menu',
			success : function(response) {
				var text = response.responseText;
				var objs = eval(text);
				var menuPanel = Ext.getCmp('menuPanel');
				for (var i = 0; i < objs.length; i++) {
					var treePanel = Ext.create('Ext.tree.Panel', {
						//frame : true,
						title : '',
						header:false,
						width : 150,
						bodyStyle:'border:0',
						rootVisible : false,
						root: {
					        text: 'Root',
					        expanded: true,
					        children: objs[i].children
					    },
					    listeners : {
							'itemclick' : function(view, record, item, index, e) {
								var id = record.get('id');
								var text = record.get('text');
								var leaf = record.get('leaf');
								var url = record.get('hrefTarget');
								//console.log(record);
								//alert(url);
								changePage(text, id, leaf,url);
							},
							scope : this
						}
					});
					var panel = Ext.create('Ext.panel.Panel', {
						title : objs[i].text,
						width : 150,
						items:[treePanel]
					});
					menuPanel.add(panel);
				}
				menuPanel.doLayout();
			}
		});
		this.callParent(arguments);
	}
});

function changePage(title, id, leaf,url) {
	if (leaf) {
		var tabPanel = Ext.getCmp('tab');/*中间面板对象*/
		var tab = tabPanel.getComponent(id + "");//在中间面板对象获得grid对象面板  
		if(tab == undefined){
			var panel = Ext.create('Ext.panel.Panel', {
				id : id,//组件的id  
				title : title,
				autoScroll : true,
				layout: 'fit',
				closable : true,//是否实现关闭按钮  
				html: '<iframe scrolling="no"width="100%" height="100%"  frameborder="0" src="' + url + '"></iframe>'
			});
			tabPanel.add(panel).show();
		}else{
			tabPanel.setActiveTab(tab);
		}
	}
}