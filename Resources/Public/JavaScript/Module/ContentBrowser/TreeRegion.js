Ext.ns("TYPO3.Vidi.Module.ContentBrowser");

/*                                                                        *
 * This script is part of the TYPO3 project.                              *
 *                                                                        *
 * It is free software; you can redistribute it and/or modify it under    *
 * the terms of the GNU General Public License as published by the Free   *
 * Software Foundation, either version 3 of the License, or (at your      *
 * option) any later version.                                             *
 *                                                                        *
 * This script is distributed in the hope that it will be useful, but     *
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHAN-    *
 * TABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General      *
 * Public License for more details.                                       *
 *                                                                        *
 * You should have received a copy of the GNU General Public License      *
 * along with the script.                                                 *
 * If not, see http://www.gnu.org/licenses/gpl.html                       *
 *                                                                        *
 * The TYPO3 project - inspiring people to share!                         *
 *                                                                        */

Ext.define('TYPO3.Vidi.Module.ContentBrowser.TreeRegion', {
	alias: 'widget.TYPO3-Vidi-Module-ContentBrowser-TreeRegion',
	extend: 'Ext.container.Container',
	region: 'west',
	width: 200,
	border: false,
	layout:  {
		type: 'accordion',
		align: 'stretch'
	},
	items: [],
	initComponent: function() {

		var config = {
			items: this.getTreeComponents()
		};
		if (config.items.length == 1) {
			config.layout = 'fit';
		}
		Ext.apply(this, config);
		this.callParent();
	},
	addFilterToQuery: function(treeIndex, record) {
		var relationFilter = Ext.create('TYPO3.Vidi.Components.FilterBar.Item.Field',{
			editMode: false,
			virgin: false
		});
		var treeConfig = TYPO3.TYPO3.Core.Registry.get('vidi/treeConfig');
		var currentTable = TYPO3.TYPO3.Core.Registry.get('vidi/currentTable');
		var relationColumn = null;
		if (treeConfig[treeIndex].relationConfiguration[currentTable] != undefined) {
			relationColumn = treeConfig[treeIndex].relationConfiguration[currentTable]['foreignField'];
		} else if (treeConfig[treeIndex].relationConfiguration['*'] != undefined) {
			relationColumn = treeConfig[treeIndex].relationConfiguration['*']['foreignField'];
		}
		if (relationColumn != null) {
			relationFilter.data = {
				'field': Ext.StoreManager.get('TYPO3.Vidi.Stores.AvailableFieldsOfCurrentTable').findRecord('id', relationColumn).data,
				'operator': {id: 'rel', display: 'is'},
				'search': {uid: record.data.id, title: record.data.text}
			};
			relationFilter.updateInputs();
			relationFilter.refresh();
			Ext.ComponentManager.get('TYPO3-VIDI-FilterBar').add(relationFilter);
		}

	},
	getTreeComponents: function() {
		var treeConfig = TYPO3.TYPO3.Core.Registry.get('vidi/treeConfig');
		var items = [];
		Ext.Object.each(treeConfig, function(index, entry) {
			var directFn = (entry.dataProvider != undefined && eval(entry.dataProvider) != undefined) ? entry.dataProvider : 'TYPO3.Vidi.Service.ExtDirect.TreeData.getTreeData';
			var type = Ext.ClassManager.getNameByAlias('widget.' + entry.xtype) != "" ? entry.xtype : 'TYPO3.Vidi.Module.UserInterface.Tree';
			var rootUid = (entry.treeConfig != undefined && entry.treeConfig.rootUid != undefined)? entry.treeConfig.rootUid : 0;
			var labelEdit = (entry.treeConfig != undefined && entry.treeConfig.labelEdit == true) ? true : false;
			items.push({
				xtype: 'panel',
				title: entry.title,
				layout: 'fit',
				items: {
					xtype: type,
					directFn: directFn,
					rootUid: rootUid,
					id: 'vidi-TreeRegion-tree-' + index,
					treeIndex: index,
					labelEdit: labelEdit
				}
			});
		});
		return items;
	}
});