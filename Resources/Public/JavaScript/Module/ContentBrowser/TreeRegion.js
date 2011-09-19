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
	alias: 'widget.TYPO3.Vidi.Module.ContentBrowser.TreeRegion',
	extend: 'Ext.container.Container',
	region: 'west',
	width: 200,
	layout:  {
		type: 'accordion',
		align: 'stretch'
	},
	items: [],
	initComponent: function() {

		var config = {
			items: this.getTreeComponents()
		};
		Ext.apply(this, config);
		this.callParent();
	},
	getTreeComponents: function() {
		
		var treeConfig = TYPO3.TYPO3.Core.Registry.get('vidi/treeConfig');
		console.log(treeConfig);
		var items = [];
		Ext.Object.each(treeConfig, function(index, entry) {
			var directFn = (entry.directFn != undefined && eval(entry.directFn) != undefined) ? entry.directFn : 'TYPO3.Vidi.Service.ExtDirect.TreeData.getTreeData';
			var type = Ext.ClassManager.getNameByAlias('widget.' + entry.xtype) != "" ? entry.xtype : 'TYPO3.Vidi.Module.UserInterface.Tree';
			var rootUid = (entry.tcaTreeConfig != undefined && entry.tcaTreeConfig.rootUid != undefined)? entry.tcaTreeConfig.rootUid : 0;
			items.push({
				xtype: 'panel',
				collapsible: true,
				title: entry.title || 'dummy',
				layout: 'fit',
				items: {
					xtype: type,
					directFn: directFn,
					rootUid: rootUid,
					id: 'vidi-TreeRegion-tree-' + index,
					treeIndex: index
				}
			});
		});
		return items;
	}
});