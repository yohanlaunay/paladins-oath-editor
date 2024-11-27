import { useState } from 'preact/hooks';
import '../../styles/style.css';
import { Popup } from '../Popup';
import { SpecEditor } from './SpecEditor';

export function CustomSpecListSpecEditor(params) {
  const [popupEditorIdx, showPopupEditor] = useState(-1);
  const [activeData, setActiveData] = useState(params.data.value||[]);

  const renderingData = params.data;
  const listParams = params.listParams;
  const specs = params.specs;

  let popup = null;
  let items = [];

  const createItem = () => {
    activeData.push({});
    setActiveData(activeData);
    showPopupEditor(activeData.length-1);
    renderingData.onValueChanged(activeData);
  }

  if( renderingData.value != null ){

    const deleteItem = (itemIdx) => {
      activeData.splice(itemIdx, 1);
      setActiveData(activeData);
      showPopupEditor(-1);
      renderingData.onValueChanged(activeData);
    }

    for( const valIdx in renderingData.value ){
      const valIdxFinal = Number(valIdx);
      const val = renderingData.value[valIdxFinal];
      const summary = specs.summary(val);

      items.push(
        <div className={'item value_'+valIdxFinal}>
          <button onClick={()=>deleteItem(valIdxFinal)}>Delete</button>
          <button  onClick={()=>showPopupEditor(valIdxFinal)}>Edit</button>
          <div class='summary'>{summary?summary:"#"+valIdxFinal}</div>
          <div />
        </div>
      );
    }
  }

  if( popupEditorIdx >= 0 ){
    const title = renderingData.property.label||specs.title;
    const description = renderingData.property.description||specs.description;

    const editorData = {
      specs: specs,
      data: activeData[popupEditorIdx],
      titleOverride: '', // use popup title
      descriptionOverride: '', // use custom title
      error: null,
      disableActions: true,
      saveData: async (data) => {
        activeData[popupEditorIdx] = data;
        renderingData.onValueChanged(activeData);
      },
      validateData: (data) => {
        activeData[popupEditorIdx] = data;
        renderingData.onValueChanged(activeData);
      }
    }

    popup = <Popup title={title} onClose={() => showPopupEditor(-1)}>
        <div><h3>{description}</h3></div>
        <SpecEditor data={editorData} key={"custom_spec"}/>
      </Popup>;
  }

  return [
    <div className='custom_editor'>
      <div>
        <div className='items'>
          {items}
        </div>
        {(listParams.maxCount <= 0 || items.length < listParams.maxCount)?
          <button className='add_action' onClick={createItem}>Add</button>
          :null
        }
      </div>
    </div>
  ,popup];
}