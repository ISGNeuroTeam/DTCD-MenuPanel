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

    const eventSystem = new EventSystemAdapter('0.3.0', guid);
    const styleSystem = new StyleSystemAdapter('0.3.1');
    const storageSystem = new StorageSystemAdapter('0.4.0');
    const workspaceSystem = new WorkspaceSystemAdapter('0.3.0');

    eventSystem.registerEvent(eventSystem.createEvent(guid, 'ThemeUpdate'));

    const VueJS = this.getDependence('Vue');
    const data = { guid, eventSystem, styleSystem, storageSystem, workspaceSystem };

    new VueJS.default({
      data: () => data,
      render: h => h(PluginComponent),
    }).$mount(selector);
  }
}
