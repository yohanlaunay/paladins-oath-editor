import '../styles/style.css';
import { DataStoreContext } from '../DataStoreContext';
import { SpecEditor } from './Spec/SpecEditor';
import { MainMenu } from './MainMenu';
import { AppState, AppStateContext } from '../context';
import { useMemo, useState } from 'preact/hooks';
import { ModHeaderSpec } from '../data/classes/ModHeaderSpec';
import { ModDescriptor } from '../data/ModDescriptor';
import { ModData } from '../data/ModData';

export function App(params) {
	const dataStore = params.dataStore;
	const initialState = params.initialState;

	const [appState, setAppState] = useState(initialState||new AppState());
	const appStateCtx = useMemo(() => {return { appState, setAppState }}, [appState]);

	let mainContainer = null;

	if( !appState.getActiveMod() ){
		const specs = ModHeaderSpec;
		const doValidateData = (data) => {
			if( !specs.validator ){
				return true;
			}
			try {
				specs.validator(data);
				if( appState.getEditorError() !== null ){
					setAppState(appState.withEditorError());
				}
				return true;
			}catch(e){
				if( appState.getEditorError() != e.message ){
					setAppState(appState.withEditorError(e.message));
				}
				return false;
			}
		}
		const editorData = {
			specs: specs,
			error: appState.getEditorError(),
			saveData: async (data) => {
				if( !doValidateData(data) ){
					return;
				}
				await dataStore.clear();
				const modDesc = new ModDescriptor(data);
				await modDesc.saveToStore(dataStore);
				setAppState(new AppState().withActiveMod(modDesc));
			},
			validateData: (data) => {doValidateData(data)}
		}
		mainContainer = <SpecEditor data={editorData} key={"new_mod"}/>;
	}else if( !!appState.getActiveModule() ){
		const activeMod = appState.getActiveMod();
		const activeModule = appState.getActiveModule();
		const doValidateData = (data) => {
			try {
				activeModule.validateAll(data);
				if( appState.getEditorError() !== null ){
					setAppState(appState.withEditorError());
				}
				return true;
			}catch(e){
				if( appState.getEditorError() != e.message ){
					setAppState(appState.withEditorError(e.message));
				}
				return false;
			}
		}
		const saveModule = async () => {
			const modType = activeMod.findModType(activeModule.getGUID());
			if( !modType ){
				console.log("Register new module "+activeModule.getModType()+">"+activeModule.getGUID());
				activeMod.registerMod(activeModule.getModType(), activeModule.getGUID());
				await activeMod.saveToStore(dataStore);
			}else if( modType !== activeModule.getModType() ){
				window.alert("Cannot override module "+modType+" with the same ID");
				return;
			}
			await activeModule.saveToStore(dataStore);
			setAppState(appState.withEditorError(null)); // updated appState.
		}

		const editorData = {
			specs: activeModule.getModSpecs(),
			data: activeModule.getDataWithFileData(),
			error: appState.getEditorError(),
			saveData: async (data) => {
				if( ! data.guid ){
					window.alert("Cannot save without GUID");
					return;
				}
				doValidateData(data);
				if( appState.getEditorError() !== null ){
					window.alert("Cannot save module with error: "+appState.getEditorError());
					return;
				}
				try{
					if( activeModule.getGUID() === null || data.guid !== activeModule.getGUID() ){
						// delete the saved module first stored under the old GUID.
						if( activeModule.getGUID() !== null ){
							console.log("Module ID changed from "+activeModule.getGUID()+" to "+data.guid);
							await ModData.deleteFromStore(dataStore, activeModule.getGUID());
							activeMod.unregisterMod(activeModule.getGUID());
						}
						activeMod.registerMod(activeModule.getModType(), data.guid); // try to register. will fail on ID collision.
						await activeMod.saveToStore(dataStore);
					}
					activeModule.setProperties(data);
					setAppState(appState.withEditorError());
				}catch( e ){
					setAppState(appState.withEditorError(e.message));
				}
				await saveModule();
			},
			validateData: (data) => {doValidateData(data)}
		}
		mainContainer = <SpecEditor data={editorData} key={activeModule.getModType()+":"+activeModule.getGUID()}/>;
	}else{
		const activeMod = appState.getActiveMod();
		const specs = ModHeaderSpec;
		const doValidateData = (data) => {
			if( !specs.validator ){
				return true;
			}
			try {
				specs.validator(data);
				if( appState.getEditorError() !== null ){
					setAppState(appState.withEditorError());
				}
				return true;
			}catch(e){
				if( appState.getEditorError() != e.message ){
					setAppState(appState.withEditorError(e.message));
				}
				return false;
			}
		}
		const editorData = {
			specs: specs,
			error: appState.getEditorError(),
			data: activeMod.header,
			titleOverride: 'Editing Mod',
			saveData: async (data) => {
				if( !doValidateData(data) ){
					return;
				}
				const activeMod = appState.getActiveMod();
				activeMod.setHeader(data);
				await activeMod.saveToStore(dataStore);
				setAppState(new AppState().withActiveMod(activeMod));
			},
			validateData: (data) => {doValidateData(data)}
		}
		mainContainer = <SpecEditor data={editorData} key={"edit_mod"}/>;
	}

	return (
		<DataStoreContext.Provider value={dataStore}>
			<AppStateContext.Provider value={appStateCtx}>
			<div className='main_grid_container'>
				<MainMenu/>
				<div className='main_content'>{mainContainer}</div>
			</div>
			</AppStateContext.Provider>
		</DataStoreContext.Provider>
	);
}
