import pluginMeta from './Plugin.Meta';
import PluginComponent from './PluginComponent.vue';

import {
  PanelPlugin,
  EventSystemAdapter,
  StyleSystemAdapter,
  StorageSystemAdapter,
} from './../../DTCD-SDK/index';

export class Plugin extends PanelPlugin {

  static getRegistrationMeta () {
    return pluginMeta;
  }

  constructor (guid, selector) {
    super();

    const eventSystem = new EventSystemAdapter();
    const styleSystem = new StyleSystemAdapter();
    const storageSystem = new StorageSystemAdapter();

    eventSystem.registerEvent(eventSystem.createEvent(guid, 'ChangeWorkspaceEditMode'));
    eventSystem.registerEvent(eventSystem.createEvent(guid, 'DefaultAddWorkspacePanel'));
    eventSystem.registerEvent(eventSystem.createEvent(guid, 'CompactWorkspacePanel'));
    eventSystem.registerEvent(eventSystem.createEvent(guid, 'ThemeUpdate'));

    const VueJS = this.getDependence('Vue');
    const data = { guid, eventSystem, styleSystem, storageSystem };

    new VueJS.default({
      data: () => data,
      render: h => h(PluginComponent),
    }).$mount(selector);
  }

}
