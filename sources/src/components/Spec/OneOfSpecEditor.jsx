import '../../styles/style.css';

export function OneOfSpecEditor(params) {
  const renderingData = params.data;

  const handleChange = (newValue) => {
    if( newValue !== null ){
      const valueRef = Object.values(params.values)[0];
      if( Number.isInteger(valueRef) ){
        newValue = Number(newValue);
      }
    }
    renderingData.onValueChanged(newValue);
  }

  const items = [];
  for( const val of params.values ){
    items.push(
      <option key={val} value={val}>{val}</option>
    );
  }

	return (
    <div className='value_editor'>
      <div className='item'>
        <select
          onChange={(e) => handleChange(e.target.value)}
          className={!!renderingData.error?'error':''}
          value={""+(renderingData.value||renderingData.defaultValue||"")}
        >
          {items}
        </select>
        <button onClick={()=>handleChange(null)}>Reset</button>
      </div>
    </div>
  );
}
