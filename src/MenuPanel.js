import App from './App.vue';
import {PanelPlugin, EventSystemAdapter, StorageSystemAdapter} from './../../DTCD-SDK';

export class Plugin extends PanelPlugin {
	static getRegistrationMeta() {
		return {
			type: 'panel',
			title: 'Панель меню',
			name: 'MenuPanel',
		};
	}

	constructor(guid, selector, styleSystem) {
		super();
		console.log(selector);
		let eventSystem = new EventSystemAdapter();
		let storageSystem = new StorageSystemAdapter();

		eventSystem.registerEvent(eventSystem.createEvent(guid, 'ChangeWorkspaceEditMode'));
		eventSystem.registerEvent(eventSystem.createEvent(guid, 'DefaultAddWorkspacePanel'));
		eventSystem.registerEvent(eventSystem.createEvent(guid, 'CompactWorkspacePanel'));
		eventSystem.registerEvent(eventSystem.createEvent(guid, 'ThemeUpdate'));

		const VueJS = this.getDependence('Vue');

		new VueJS.default({
			render: h => h(App),
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
