import pluginMeta from './Plugin.Meta';
import PluginComponent from './PluginComponent.vue';

import {PanelPlugin, EventSystemAdapter, StorageSystemAdapter, StyleSystemAdapter} from './../../DTCD-SDK/index';

export class Plugin extends PanelPlugin {
	static getRegistrationMeta() {
		return pluginMeta;
	}

	constructor(guid, selector) {
		super();
		let eventSystem = new EventSystemAdapter();
		let styleSystem = new StyleSystemAdapter();
		let storageSystem = new StorageSystemAdapter();

		eventSystem.registerEvent(eventSystem.createEvent(guid, 'ChangeWorkspaceEditMode'));
		eventSystem.registerEvent(eventSystem.createEvent(guid, 'DefaultAddWorkspacePanel'));
		eventSystem.registerEvent(eventSystem.createEvent(guid, 'CompactWorkspacePanel'));
		eventSystem.registerEvent(eventSystem.createEvent(guid, 'ThemeUpdate'));

		const VueJS = this.getDependence('Vue');

		new VueJS.default({
			render: h => h(PluginComponent),
			data() {
				return {
					guid,
					eventSystem,
					storageSystem,
					styleSystem,
				};
			},
		}).$mount(selector);
	}
}
