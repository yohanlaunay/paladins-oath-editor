import { useState } from 'preact/hooks';
import '../../styles/style.css';
import { SpecEditor } from './SpecEditor';
import { Popup } from '../Popup';

export function CustomSpecEditor(params) {
  const [isPopupEditorShown, showPopupEditor] = useState(false);

  const renderingData = params.data;
  const specs = params.specs;
  const hasData = renderingData.value !== undefined && renderingData.value !== null;

  let popup = null;
  let main = null;

  if( ! hasData && !!renderingData.property.optional ){
    const createData = () => {
      renderingData.onValueChanged({})
      showPopupEditor(true);
    };
    main = <button onClick={createData}>New</button>
    if( !! isPopupEditorShown ) showPopupEditor(false);
  }else{
    const clearData = () => {
      renderingData.onValueChanged(null);
      showPopupEditor(false);
    }
    const footerActions = [];
    if( !!renderingData.property.optional ){
      footerActions.push(<button onClick={clearData}>Delete</button>);
    }
    footerActions.push(<button onClick={() => showPopupEditor(true)}>Edit</button>);

    const summary = specs.summary(renderingData.value);

    main = <div className='item'>
      {footerActions}
      {summary?<div className='summary'>{summary}</div>:null}
      <div />
    </div>;
  }

  if( isPopupEditorShown ){
    const title = renderingData.property.label||specs.title;
    const description = renderingData.property.description||specs.description;

    const editorData = {
      specs: specs,
      data: renderingData.value,
      titleOverride: '', // use popup title
      descriptionOverride: '', // use custom title
      error: null,
      disableActions: true,
      saveData: async (data) => {renderingData.onValueChanged(data)},
      validateData: (data) => {renderingData.onValueChanged(data)}
    }

    popup = <Popup title={title} onClose={() => showPopupEditor(false)}>
        <div>{description}</div>
        <SpecEditor data={editorData} key={"custom_spec"}/>
      </Popup>;
  }

  return [
    <div class='custom_editor'>{main}</div>,
    popup
  ];
}
