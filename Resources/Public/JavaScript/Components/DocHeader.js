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
/**
 * @class TYPO3.Vidi.Module.UserInterface.DocHeader
 *
 * The outermost user interface component.
 *
 * @namespace TYPO3.Vidi.Module.UserInterface
 * @extends Ext.Panel
 */
Ext.define('TYPO3.Vidi.Module.UserInterface.DocHeader', {
	extend: 'Ext.container.Container',
	alias: 'widget.TYPO3.Vidi.Module.UserInterface.DocHeader',

	initComponent: function() {
		var config = {
			id: 'typo3-docheader',
			height: 43,
			layout: {
				type: 'vbox',
				align: 'stretch'
			},
			items: [{
				xtype: 'toolbar',
				style: {
					border: '0px none'
				},
				id: 'typo3-docheader-row1',
				items: this._getItems('top')
			}, {
				xtype: 'toolbar',
				style: {
					border: '0px none'
				},
				id: 'typo3-docheader-row2',
				items: this._getItems('bottom')
			}]
		};
		Ext.apply(this, config);
		this.callParent(arguments);
	},

	/**
	 * @private
	 * @return {Array} an array items, fetched from the registry.
	 */
	_getItems: function(position) {
		var items, config;

		items = [];
		config = TYPO3.TYPO3.Core.Registry.get('vidi/docheader/' + position);
		Ext.each(config, function(item) {
			if (item == '->') {
				items.push('->');
			} else {
				items.push(this._getComponent(item));
			}
		}, this);
		return items;
	},


	/**
	 * @private
	 * @return {Object}
	 */
	_getComponent: function(item) {
		var config = item;

		config.xtype = 'clickableIcon';
		return config;
	}

});

