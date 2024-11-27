import '../../styles/style.css';

export function IntSpecEditor(params) {
  const renderingData = params.data;

  const handleChange = (newValue) => {
    renderingData.onValueChanged(newValue == null ? newValue : Number(newValue));
  }

  const value = Number.isInteger(renderingData.value) ? renderingData.value : null;

	return (
    <div className='int_editor'>
      <input
        type="number"
        className={!!renderingData.error?"error":""}
        value={value}
        placeholder={Number.isInteger(renderingData.defaultValue) ? renderingData.defaultValue : 0}
        onKeyDown={(e) => handleChange(Number(e.target.value))}
        onInput={(e) => handleChange(Number(e.target.value))}
      />
      <button onClick={()=>handleChange(null)}>Reset</button>
    </div>
  );
}
