import { useContext, useEffect, useState } from 'preact/hooks';
import '../../styles/style.css';
import { AppService } from '../../AppService';
import { DataStoreContext } from '../../DataStoreContext';
import { AppStateContext } from '../../context';
import { Popup } from '../Popup';
import { EMPTY_IMAGE_URL } from '../../data/GameResources';

const CATCHALL_GROUPING_KEY = 'All';

export function GameResListSpecEditor(params) {
  const {appState, _} = useContext(AppStateContext);
  const dataStore = useContext(DataStoreContext);
  const [pickerInfo, showPicker] = useState(null);
  const [resources, setResources] = useState({});
  const [activeData, setActiveData] = useState(params.data.value||[]);

  const renderingData = params.data;
  const listParams = params.listParams;
  const gameResType = params.gameResType;
  const isValidResFn = params.isValidResFn;

  const generateTab = (groupingKey) => {
    if( pickerInfo.tab == groupingKey ){
      return <div className='tab selected'>
        <b>{groupingKey}</b>
      </div>;
    }
    const selectedPickerInfo = {...pickerInfo};
    selectedPickerInfo.tab = groupingKey;
    return <div className='tab' onClick={() => showPicker(selectedPickerInfo)}>
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
  const selectItem = (itemIdx, itemId) => {
    activeData[itemIdx] = itemId;
    setActiveData(activeData);
    renderingData.onValueChanged(activeData);
    showPicker(null);
  }

  const onItemRemoved = (itemIdx) => {
    activeData.splice(itemIdx, 1);
    setActiveData(activeData);
    renderingData.onValueChanged(activeData);
  };

  const createNewItem = () => {
    activeData.push(null);
    setActiveData(activeData);
    renderingData.onValueChanged(activeData);
    showPicker({
      idx: activeData.length-1,
      tab: CATCHALL_GROUPING_KEY
    });
  }

  let picker = null;
  if( pickerInfo !== null ) {
    const options = [];
    const tabs = [];
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
    // Catchall goes first
    tabs.push(generateTab(CATCHALL_GROUPING_KEY));

    for( const groupingKey of Object.keys(resources) ){
      // skip catchall, we already handled it
      if( groupingKey != CATCHALL_GROUPING_KEY ){
        tabs.push(generateTab(groupingKey));
      }
      if( groupingKey != pickerInfo.tab ){
        continue; // only render current group
      }
      for( const val of resources[groupingKey] ){
        const itemId = val.id;
        const isSelected = !!selectedValue && selectedValue.id == itemId;
        const description = (val.properties||{}).description||null;
        options.push(
          <div onClick={() => selectItem(pickerInfo.idx, itemId)} className={'option'+(!!isSelected?' selected':'')}>
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

  let items = [];
  if( renderingData.value != null ){
    for( const valIdx in renderingData.value ){
      const valIdxFinal = valIdx;
      let data = null;
      for(const resList of Object.values(resources) ){
        for( const res of resList ){
          if( res.id === renderingData.value[valIdxFinal] ){
            data = res;
            break;
          }
        }
        if( data != null ) break;
      }
      const itemPickerInfo = {
        idx: valIdxFinal,
        tab: CATCHALL_GROUPING_KEY
      };
      items.push(
        <div className='item'>
          {data?
            <div className='content'>
                {data.image!==EMPTY_IMAGE_URL?<img width="100%" src={data.image} />:null}
                <div className='name'>{data.name}</div>
            </div>
            :null
          }
          <div className='actions'>
            {(!pickerInfo || pickerInfo.idx < 0)?<button onClick={() => showPicker(itemPickerInfo)}>Change</button>:<div />}
            <div></div>
            {(!! data )?<button onClick={()=>onItemRemoved(valIdxFinal)}>Delete</button>:null}
          </div>

        </div>
      );
    }
  }

  return [<div className='res_editor'>
        {items}
        {(listParams.maxCount <= 0 || items.length < listParams.maxCount)?
          <div className='add_action'>
            <button onClick={createNewItem}>Add</button>
          </div>
          :null
        }
    </div>
  , picker];
}
