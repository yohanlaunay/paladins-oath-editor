import { render } from 'preact';

import './styles/style.css';
import { DataStore } from './stores/DataStore';
import { App } from './components/App';
import { ModDescriptor } from './data/ModDescriptor';
import { AppState } from './context';

const dataStoreInstance = new DataStore({version: 1});

// Singleton datastore
dataStoreInstance.init().then(async () => {
	// Reload the last active mod in the database.
	let initState = new AppState();
	try{
		const mod = await ModDescriptor.loadFromStore(dataStoreInstance, '*');		
		if( !!mod ){			
			initState = initState.withActiveMod(mod);
			console.log("Loaded Draft Mod "+mod.getGUID());
		} else{
			console.log("No Draft mod, cleaning the database");
			await dataStoreInstance.clear(); // start fresh
		}
	}catch( e ){
		console.error("Error loading draft mod: "+e.message);
		await dataStoreInstance.clear(); // start fresh
	}

	render(<App dataStore={dataStoreInstance} initialState={initState}/>, document.getElementById('root'));
}).catch((e) => {
	console.error(e);
	render(
		<div>{"Error initializing Datastore: "+e.message}</div>,
		document.getElementById('root')
	);
});

