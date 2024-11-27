import { useContext, useEffect, useState } from 'preact/hooks';
import '../../styles/style.css';
import { AppService } from '../../AppService';
import { DataStoreContext } from '../../DataStoreContext';
import { AppStateContext } from '../../context';
import { Popup } from '../Popup';
import { EMPTY_IMAGE_URL } from '../../data/GameResources';

const CATCHALL_GROUPING_KEY = 'All';

export function GameResSpecEditor(params) {
  const {appState, _} = useContext(AppStateContext);
  const dataStore = useContext(DataStoreContext);
  const [pickerTab, showPicker] = useState(null);
  const [resources, setResources] = useState({});

  const renderingData = params.data;
  const gameResType = params.gameResType;
  const isValidResFn = params.isValidResFn;

  const generateTab = (groupingKey) => {
    if( pickerTab == groupingKey ){
      return <div className='tab selected'>
        <b>{groupingKey}</b>
      </div>;
    }
    return <div className='tab' onClick={() => showPicker(groupingKey)}>
      <b>{groupingKey}</b>
    </div>;
  }

  // Load resources
  useEffect(() => {
    (async () => {
      const allResources = await AppService.FetchAllResourcesByType(gameResType, dataStore, appState.getActiveMod());
      const filteredResources = {};
      filteredResources[CATCHALL_GROUPING_KEY] = [];
      for( const res of allResources ){
        if( !!isValidResFn && !isValidResFn(res) ){
          continue; // skip invalid res
        }
        const groupingKey = (res.properties||{}).groupingKey;
        if( !! groupingKey ){
          if( !Array.isArray(filteredResources[groupingKey]) ){
            filteredResources[groupingKey] = [];
          }
          filteredResources[groupingKey].push(res);
        }
        // Add to the CATCHALL_GROUPING_KEY group
        filteredResources[CATCHALL_GROUPING_KEY].push(res);
      }
      setResources(filteredResources);
    })();
  }, [gameResType])

  // Generate UI
  const selectItem = (itemId) => {
    renderingData.onValueChanged(itemId);
    showPicker(null);
  }

  let picker = null;
  let selectedValue = null;
  for(const resList of Object.values(resources) ){
    for( const res of resList ){
      if( res.id === renderingData.value ){
        selectedValue = res;
        break;
      }
    }
    if( selectedValue != null ) break;
  }
  if( pickerTab !== null ){
    const options = [];
    const tabs = [];
    // Catchall goes first
    tabs.push(generateTab(CATCHALL_GROUPING_KEY));

    for( const groupingKey of Object.keys(resources) ){
      // skip catchall, we already handled it
      if( groupingKey != CATCHALL_GROUPING_KEY ){
        tabs.push(generateTab(groupingKey));
      }
      if( groupingKey != pickerTab ){
        continue; // only render current group
      }
      for( const val of resources[groupingKey] ){
        const itemId = val.id;
        const isSelected = !!selectedValue && selectedValue.id == itemId;
        const description = (val.properties||{}).description||null;
        options.push(
          <div onClick={() => selectItem(itemId)} className={'option'+(!!isSelected?' selected':'')}>
            {val.image!==EMPTY_IMAGE_URL?<img src={val.image}/>:null}
            <div className='name'>{val.name}</div>
            {!!description?<div className='description'>{description}</div>:null}
          </div>
        );
      }
    }

    picker = <Popup title={"Select "+gameResType} onClose={() => showPicker(null)}>
      {tabs.length > 1 ?<div className='tabs'>{tabs}</div>:null}
      <div className='res_options'>{options}</div>
    </Popup>;
  }

	return ([
    <div className='res_editor'>
      <div className={'item' + (!!selectedValue?' selected':'')}>
        {(!! selectedValue )?
          <div className='content'>
              {selectedValue.image!==EMPTY_IMAGE_URL?<img src={selectedValue.image} />:null}
              <div className='name'>{selectedValue.name}</div>
          </div>
        :null
        }
        <div className='actions'>
          {(!pickerTab)?<button onClick={() => showPicker(CATCHALL_GROUPING_KEY)}>Change</button>:null}
          {(!! selectedValue )?<button onClick={()=>selectItem(null)}>Delete</button>:null}
        </div>
      </div>
    </div>
  , picker]);
}
