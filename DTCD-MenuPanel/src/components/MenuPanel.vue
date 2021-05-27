<template>
  <div class="container">
    <div class="button-container">
      <div id="addNewPanelBtn" class="btn" title="Добавить панель" @click="addNewWorkspacePanel">
        <div class="icon">
          <i class="fas fa-plus" />
        </div>
      </div>
      <div
        id="changeModeBtn"
        class="btn edit-mode-btn"
        :class="{ active: isEditModeEnabled }"
        :title="editModeButtonTitle"
        @click="changeEditMode"
      >
        <div v-if="isEditModeEnabled" key="view-mode" class="icon">
          <i class="far fa-eye" />
        </div>
        <div v-else key="edit-mode" class="icon">
          <i class="fas fa-pencil-alt" />
        </div>
      </div>
      <transition name="fade" mode="out-in">
        <div
          v-if="isEditModeEnabled"
          id="compactWorkspaceBtn"
          class="btn"
          title="Выровнять сетку"
          @click="compactWorkspacePanels"
        >
          <div class="icon">
            <i class="fas fa-outdent" />
          </div>
        </div>
      </transition>
    </div>
    <div class="button-container">
      <div
        id="workspaceSelection"
        class="btn"
        title="Вернуться к выбору рабочего стола"
        @click="backToWorkspaces"
      >
        <div class="icon">
          <i class="fas fa-arrow-circle-left"></i>
        </div>
      </div>
    </div>
    <!-- <div v-if="isEditModeEnabled" class="menu-panel-theme-container">
      <p>Выбрать тему:</p>
      <div class="themes-container">
        <div
          class="theme-btn"
          :class="{ selected: theme.name === selectedTheme }"
          v-for="theme in themeList"
          :key="theme.name"
          :style="{ background: theme.preview }"
          @click="changeTheme(theme.name)"
        ></div>
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'MenuPanel',
  data: self => ({
    guid: self.$root.guid,
    eventSystem: self.$root.eventSystem,
    styleSystem: self.$root.styleSystem,
    themeList: [],
    isEditModeEnabled: false,
  }),
  computed: {
    editModeButtonTitle() {
      const mode = this.isEditModeEnabled ? 'просмотра' : 'редактирования';
      return `Включить режим ${mode}`;
    },
  },
  async mounted() {
    // this.eventSystem.createActionByCallback('updateTheme', this.guid, this.updateTheme.bind(this));
    // this.eventSystem.subscribeByNames('ThemeUpdate', 'updateTheme');
    // const themes = this.styleSystem.getThemes();
    // this.themeList.push(...themes);
  },
  methods: {
    addNewWorkspacePanel() {
      this.eventSystem.createAndPublish(this.guid, 'DefaultAddWorkspacePanel');
    },

    compactWorkspacePanels() {
      this.eventSystem.createAndPublish(this.guid, 'CompactWorkspacePanel');
    },

    changeEditMode() {
      this.isEditModeEnabled = !this.isEditModeEnabled;
      this.eventSystem.createAndPublish(this.guid, 'ChangeWorkspaceEditMode');
    },
    backToWorkspaces() {
      this.eventSystem.createAndPublish(this.guid, 'BackToWorkspaceSelection');
    },
    // changeTheme(name) {
    //   this.selectedTheme = name;
    //   this.styleSystem.setTheme(this.selectedTheme);
    //   this.eventSystem.createAndPublish(this.guid, 'ThemeUpdate');
    // },
    // updateTheme() {
    //   const theme = this.styleSystem.getCurrentTheme();
    //   this.styleSystem.setVariablesToElement(this.$el, theme);
    // },
  },
};
</script>

<style lang="scss" scoped>
@import './../styles/base';

$c-blue: #2196f3;
$c-green: #4caf50;

.container {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  height: 100%;
  background-color: transparent;
  padding: 15px;

  .button-container {
    display: flex;
  }

  .btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border: thin solid rgba(0, 0, 0, 0.25);
    border-radius: 3px;
    cursor: pointer;
    margin-left: 20px;
    transition: $transition-time;

    &:first-child {
      margin-left: 0;
    }

    &:hover {
      color: $c-blue;
      border-color: $c-blue;

      & .icon {
        color: $c-blue;
      }
    }

    &.edit-mode-btn {
      &.active {
        color: $c-green;
        border-color: $c-green;

        & .icon {
          color: $c-green;
        }
      }

      &:hover {
        border-color: $c-green;

        .icon {
          color: $c-green;
        }
      }
    }

    .icon {
      color: #757575;
      font-size: 16px;
      transition: $transition-time;
    }
  }
  .menu-panel-theme-container {
    padding: 5px;
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
}
</style>
