import pluginMeta from './Plugin.Meta';
import PluginComponent from './PluginComponent.vue';

import {
  PanelPlugin,
  EventSystemAdapter,
  StyleSystemAdapter,
  StorageSystemAdapter,
  WorkspaceSystemAdapter,
} from './../../DTCD-SDK/index';

export class Plugin extends PanelPlugin {
  static getRegistrationMeta() {
    return pluginMeta;
  }

  constructor(guid, selector) {
    super();

    const eventSystem = new EventSystemAdapter();
    const styleSystem = new StyleSystemAdapter();
    const storageSystem = new StorageSystemAdapter();
    const workspaceSystem = new WorkspaceSystemAdapter();

    eventSystem.registerEvent(eventSystem.createEvent(guid, 'ThemeUpdate'));

    const VueJS = this.getDependence('Vue');
    const data = { guid, eventSystem, styleSystem, storageSystem, workspaceSystem };

    new VueJS.default({
      data: () => data,
      render: h => h(PluginComponent),
    }).$mount(selector);
  }
}
