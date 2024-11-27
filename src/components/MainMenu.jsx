import '../styles/style.css';

import { saveAs } from 'file-saver';
import { AppState, AppStateContext } from '../context';
import { useContext, useRef } from 'preact/hooks';
import { DataStoreContext } from '../DataStoreContext';
import { ModTypeInfo } from '../data/ModTypeInfo';
import { ModData } from '../data/ModData';
import { ZipService } from '../ZipService';

export function MainMenu() {
	const dataStore = useContext(DataStoreContext);
	const {appState, setAppState} = useContext(AppStateContext);
	const fileInput = useRef();

	const resetMod = async () => {
		console.log("Reset mod");
		await dataStore.clear();
		setAppState(new AppState());
	}
	const onImportModButtonClicked = () => {
		if( !!appState.getActiveMod() ){
			const message = "You are currently editing a mod. Changes will be lost. Click 'OK' to import a mod, 'Cancel' to continue editing this mod.";
			if( !window.confirm(message) ){
				return;
			}
		}
		fileInput.current.click();
	};
	const onNewModButtonClicked = () => {
		if( !!appState.getActiveMod() ){
			const message = "You are currently editing a mod. Changes will be lost. Click 'OK' to create a new mod, 'Cancel' to continue editing this mod.";
			if( !window.confirm(message) ){
				return;
			}
		}
		resetMod();
	};
	const onEditModHeaderButtonClicked = () => {
		setAppState(appState.withActiveModule(null));
	}
	const onExportModButtonClicked = async () => {
		const activeMod = appState.getActiveMod();
		if( !activeMod ) throw Error("No mod selected");

		// Will validate the data before generating the zip
		try{
			const zip = await ZipService.GenerateZip(dataStore, activeMod);
			const fileName = activeMod.getGUID()+".zip";
			saveAs(zip, fileName);
		}catch(e) {
			console.error("Error Generating Zip: "+e.message, e);
			window.alert("Error Generating the zip:\n"+e.message);
		}
	};
	const handleFileSelected = async () => {
		resetMod();
		const zipFile = fileInput.current.files[0];
		try{
			const activeMod = await ZipService.LoadZip(dataStore, zipFile);
			setAppState(new AppState().withActiveMod(activeMod));
		}catch( e ){
			console.error("Error Loading Mod: "+e.message, e);
			window.alert("Error Loading the zip:\n"+e.message);
		}
	};
	const createModule = (moduleType) => {
		console.log("Create Module ",moduleType);
		setAppState(appState.withActiveModule(new ModData(moduleType, appState.getContextProvider())));
	}
	const loadModule = async (modId) => {
		console.log("Load Module ", modId);
		try{
			const modData = await ModData.loadFromStore(dataStore, modId, appState.getContextProvider());
			setAppState(appState.withActiveModule(modData))
		}catch( e ){
			console.error(e); // should not happen
		}
	}
	const deleteModule = async(modId) => {
		if( ! window.confirm("Confirm deletion of module: "+modId) ){
			return;
		}
		console.log("Delete Module ", modId);
		await ModData.deleteFromStore(dataStore, modId);
		const activeMod = appState.getActiveMod();
		activeMod.unregisterMod(modId);
		await activeMod.saveToStore(dataStore);
		setAppState(appState.withActiveModule(null));
	}

	const modules = [];
	if( !! appState.getActiveMod() ){
		for( const modTypeInfo of Object.values(ModTypeInfo) ){
			const modTypeId = modTypeInfo.id;
			const modulesForType = [];
			const activeMod = appState.getActiveMod();
			const activeModule = appState.getActiveModule();
			if( activeMod != null ){
				for( const modId of activeMod.getModIds(modTypeId) ){
					if( !!activeModule && activeModule.getGUID() === modId ){
						modulesForType.push(
							<div className='module selected'>
								<button onClick={() => deleteModule(modId)}>X</button>
								<div className='module_id'>{modId}</div>
							</div>
						);
					}else{
						modulesForType.push(
							<div className='module'>
								<button onClick={() => deleteModule(modId)}>X</button>
								<div className='module_id' onClick={()=>loadModule(modId)}>{modId}</div>
							</div>
						);
					}
				}
			}

			modules.push(
				<div className='mod_type'>
					<div className='title'>
						<div className='label'>{modTypeInfo.label}</div>
						<button onClick={() => createModule(modTypeId)}>+</button>
					</div>
					{modulesForType}
				</div>
			);
		}
	}


	return (
		<div id='main_menu' className='main_menu'>
			<div className='main_menu_header'>
				<img width='100%' src='paladins_oath_logo.png' />
				<div class='title'>Mod Editor</div>
				{appState.getActiveMod()?<div className='mod_id'>{appState.getActiveMod().header.guid}</div>:null}
			</div>
			<div className='main_menu_options'>
					<button onClick={onImportModButtonClicked}>Import Mod</button>
					<button onClick={onNewModButtonClicked}>New Mod</button>
					{!!appState.getActiveMod() ? <button onClick={onExportModButtonClicked}>Export Mod</button>:null}
					{!!appState.getActiveMod() ? <button onClick={onEditModHeaderButtonClicked}>Edit Header</button>:null}
			</div>
			<div className='modules'>
				{modules}
			</div>
			<div className='socials'>
				<a href='https://paladinsoath.fandom.com/wiki/Paladin%27s_Oath_Wiki'>Paladin's Oath Wiki</a>
				<a href='https://steamcommunity.com/app/1671590/discussions/'>Steam Forums</a>
				<a href='https://www.getpaint.net/'>Paint Dot Net</a>
			</div>
			<div className='sample_mods'>
				<div className='title'><b>Sample Mods</b></div>
				<div className='links'>
					<a href='samples/mods/com.firebiscuit.agamoto.zip'>Character</a>
					<span>|</span><a href='samples/mods/com.firebiscuit.dragons_peak.zip'>Map Section</a>
					<a href='samples/mods/com.firebiscuit.wolfhide.zip'>Enemy</a>
					<span>|</span><a href='samples/mods/com.firebiscuit.sample_script.zip'>Script</a>
					<span>|</span><a href='samples/mods/com.firebiscuit.lang.en.zip'>Language</a>
				</div>
			</div>
			<input
				type="file"
				id="file"
				ref={fileInput}
				style={{ display: 'none' }}
				onChange={handleFileSelected}
				accept=".zip"
			/>
		</div>
	);
}
