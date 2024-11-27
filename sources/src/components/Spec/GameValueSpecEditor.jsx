import '../../styles/style.css';

export function GameValueSpecEditor(params) {
  const renderingData = params.data;

  const handleChange = (newValue) => {
    if( newValue !== null ){
      const valueRef = Object.values(params.values)[0].value;
      if( Number.isInteger(valueRef) ){
        newValue = Number(newValue);
      }
    }
    renderingData.onValueChanged(newValue);
  }

  const items = [];
  for( const val of Object.values(params.values) ){
    items.push(
      <option key={val.value} value={val.value}>{val.name}</option>
    );
  }

  let selectedValue = "";
  if( renderingData.value !== undefined ) selectedValue = renderingData.value;
  else if (renderingData.defaultValue !== undefined ) selectedValue = renderingData.defaultValue;

	return (
    <div className='value_editor'>
      <div className='item'>
        <select
          onChange={(e) => handleChange(e.target.value)}
          className={!!renderingData.error?'error':''}
          value={selectedValue}
        >
          {items}
        </select>
        <button onClick={()=>handleChange(null)}>Reset</button>
      </div>
    </div>
  );
}
