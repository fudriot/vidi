
Ext.define('TYPO3.Vidi.View.Filter.ListPanel', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.TYPO3-Vidi-View-Filter-ListPanel',
	title: 'Stored-Filters',
	layout: 'fit',
	width: 250,
	items: [
		{xtype: 'TYPO3-Vidi-View-Filter-List'}
	],
	bbar: [
		{
			xtype: 'button',
			scale: 'small',
			text: 'create',
			iconCls: 't3-icon t3-icon-actions t3-icon-actions-edit t3-icon-edit-add',
			handler: function() {
				var newFilter = TYPO3.Vidi.Model.Filter.create();
				newFilter.set('criteria', Ext.ComponentManager.get('TYPO3-VIDI-FilterBar').serialize());
				newFilter.set('public', true);
				newFilter.set('tableName', TYPO3.TYPO3.Core.Registry.get('vidi/currentTable'));
				newFilter.set('public', 'true');
				var view = Ext.widget('filterEdit');
        		view.down('form').loadRecord(newFilter);
			}
		},
			'->',
		{
			xtype: 'button',
			scale: 'small',
			disabled:true,
			action: 'edit',
			iconCls: 't3-icon t3-icon-actions t3-icon-actions-document t3-icon-document-open',
			text: 'edit',
			handler: function() {
				var list = this.up('TYPO3-Vidi-View-Filter-ListPanel').items.getAt(0);
				var selected = list.getSelectionModel().getSelection()[0];
				var view = Ext.widget('filterEdit');
        		view.down('form').loadRecord(selected);
			}
		},
		{
			xtype: 'button',
			disabled:true,
			scale: 'small',
			action: 'delete',
			iconCls: 't3-icon t3-icon-actions t3-icon-actions-edit t3-icon-edit-delete',
			text: 'delete',
			handler: function() {
				var list = this.up('TYPO3-Vidi-View-Filter-ListPanel').items.getAt(0);
				var selected = list.getSelectionModel().getSelection();
				Ext.each(selected, function(item) {
					list.store.remove(item);
					item.destroy();
				});
				list.refresh();
			}
		}
	]
});