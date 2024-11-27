import { useState } from 'preact/hooks';
import '../../styles/style.css';

export function GameValueListSpecEditor(params) {
  const [activeData, setActiveData] = useState(params.data.value||[]);
  const renderingData = params.data;
  const listParams = params.listParams;

  const createNewItem = () => {
    activeData.push(null);
    setActiveData(activeData);
    renderingData.onValueChanged(activeData);
  }

  const options = [];
  for( const val of Object.values(params.values) ){
    options.push(
      <option key={val.value} value={val.value}>{val.name}</option>
    );
  }

  let items = [];
  if( renderingData.value != null ){
    for( const valIdx in renderingData.value ){
      const valIdxFinal = valIdx;
      const val = renderingData.value[valIdxFinal];
      const onValueChanged = (newValue) => {
        if( newValue !== null ){
          const valueRef = Object.values(params.values)[0].value;
          if( Number.isInteger(valueRef) ){
            newValue = Number(newValue);
          }
        }
        activeData[valIdxFinal] = newValue;
        setActiveData(activeData);
        renderingData.onValueChanged(activeData);
      };
      const onValueRemoved = () => {
        activeData.splice(valIdxFinal, 1);
        setActiveData(activeData);
        renderingData.onValueChanged(activeData);
      };

      items.push(
        <div className='item'>
          <select
            onChange={(e) => onValueChanged(e.target.value)}
            value={val}
          >
            {options}
          </select>
          <button onClick={onValueRemoved}>Delete</button>
      </div>
      )
    }
  }

	return (<div className='value_editor'>
        {items}
        {(listParams.maxCount <= 0 || items.length < listParams.maxCount)?
          <div className='add_action'>
            <button onClick={createNewItem}>Add</button>
          </div>
          :null
        }
      </div>
  );
}
