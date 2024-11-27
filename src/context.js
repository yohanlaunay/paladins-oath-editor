import { createContext } from "preact";

export class AppState {
    constructor(ref = null) {
        this.activeMod = !!ref ? ref.activeMod : null; // ModDescriptor
        this.activeModule = !!ref ? ref.activeModule : null; // ModData
        this.editorError = !!ref ? ref.editorError : null; // string
    }

    getActiveMod() { return this.activeMod; }
    getActiveModule() { return this.activeModule; }
    getEditorError() { return this.editorError; }
    getContextProvider() { return { getModDescriptor: () => this.getActiveMod() } }

    withActiveMod(modDescriptor) {
        const state = new AppState(this);
        state.activeMod = modDescriptor;
        return state;
    }

    withActiveModule(modData) {
        const state = new AppState(this);
        state.activeModule = modData;
        return state;
    }

    withEditorError(error = null) {
        const state = new AppState(this);
        state.editorError = error;
        return state;
    }

}

export const AppStateContext = createContext(null);