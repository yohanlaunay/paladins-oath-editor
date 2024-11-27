import '../../styles/style.css';

export function BoolSpecEditor(params) {
  const renderingData = params.data;

  const handleChange = (newValue) => {
    renderingData.onValueChanged(newValue === null ? null : !!newValue);
  }

  const currentlyChecked = renderingData.value === null ? !!renderingData.defaultValue : !!renderingData.value;

	return (
    <div className='bool_editor'>
      <input
        type="checkbox"
        className={!!renderingData.error?"error":""}
        checked={currentlyChecked}
        onChange={(e) => handleChange(!currentlyChecked)}
      />
    </div>
  );
}
