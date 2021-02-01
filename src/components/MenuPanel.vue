<template>
  <div class="menu-panel-container">
    <div class="menu-panel-button-container">
      <div class="btn" @click="changeEditMode" :class="{ pressed: editMode }">
        <i class="fas fa-edit"></i> Режим {{ editMode ? 'просмотра' : 'редактирования' }}
      </div>
      <div class="btn" v-if="editMode" @click="defaultAddNewPanel">
        <i class="fas fa-plus"></i> Добавить панель
      </div>
      <div class="btn" v-if="editMode" @click="compactWorkspacePanels">Выровнять</div>
    </div>
    <div v-if="editMode" class="menu-panel-theme-container">
      <p>Выбрать тему:</p>
      <div class="themes-container">
        <div
          class="theme-btn"
          :class="{ selected: theme.name === selectedTheme }"
          v-for="theme in themes"
          :key="theme.name"
          :style="{ background: theme.preview }"
          @click="changeTheme(theme.name)"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MenuPanel',
  data: () => ({
    selectedTheme: 'light',
    editMode: false,
    themes: [],
  }),
  mounted() {
    this.$root.eventSystem.createActionByCallback(
      'updateTheme',
      this.$root.guid,
      this.updateTheme.bind(this)
    );
    this.$root.eventSystem.subscribeByNames('ThemeUpdate', 'updateTheme');

    this.$root.styleSystem.getThemes().then(result => {
      this.themes = result;
      this.$root.styleSystem.setTheme(this.selectedTheme);
    });
  },
  methods: {
    changeTheme(name) {
      this.selectedTheme = name;
      this.$root.styleSystem.setTheme(this.selectedTheme);
      this.$root.eventSystem.createAndPublish(this.$root.guid, 'ThemeUpdate');
    },
    compactWorkspacePanels() {
      this.$root.eventSystem.createAndPublish(this.$root.guid, 'CompactWorkspacePanel');
    },
    defaultAddNewPanel() {
      this.$root.eventSystem.createAndPublish(this.$root.guid, 'DefaultAddWorkspacePanel');
    },
    changeEditMode() {
      this.editMode = !this.editMode;
      this.$root.eventSystem.createAndPublish(this.$root.guid, 'ChangeWorkspaceEditMode');
    },
    updateTheme() {
      const themeObj = this.$root.styleSystem.getCurrentTheme();
      this.$root.styleSystem.setVariablesToElement(this.$el, themeObj);
    },
  },
};
</script>

<style scoped>
.menu-panel-container {
  background-color: var(--secondary-bg-color-panel);
  overflow-y: auto;
  height: 100%;
  font-size: 62.5%;
  font-family: 'Gill Sans', sans-serif;
  color: var(--text-color-dark);
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
}

.menu-panel-button-container {
  display: flex;
  flex-wrap: wrap;
}
.menu-panel-theme-container {
  padding: 5px;
}
.btn {
  background-color: var(--button-bg-color);
  margin: 6px;
  font-size: 1rem;
  color: var(--button-text-color);
  padding: 10px 20px;
  text-align: center;
  border-radius: 3px;
  border: 2px solid transparent;
}

.btn:hover {
  border-color: var(--button-hover-border);
  color: var(--button-hover-text-color);
  background-color: var(--button-hover-bg-color);
}
.btn:active {
  transform: scale(0.98);
}
p {
  margin: 0;
  font-size: 1.1rem;
}

.themes-container {
  display: flex;
  flex-wrap: wrap;
}

.theme-btn {
  height: 2rem;
  width: 2rem;
  border-radius: 50%;
  margin: 3px;
  border: 3px solid transparent;
  transition: 0.3s;
}
.selected {
  border-color: black;
}
.pressed {
  color: var(--button-bg-color);
  background-color: white;
  border-color: #2e99c4;
}
.pressed:hover {
}
</style>
