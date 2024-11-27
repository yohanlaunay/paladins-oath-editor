import '../../styles/style.css';

export function StringSpecEditor(params) {
  const renderingData = params.data;
  const renderConfig = params.renderConfig;

  const handleChange = (newValue) => {
    newValue = newValue.trim();
    renderingData.onValueChanged(newValue.length == 0 ? null : newValue);
  }

  let inputContent;
  if( !!renderConfig.isText ){
    inputContent = (<textarea
      className={!!renderingData.error?"error":""}
      defaultValue={renderingData.value||""}
      placeholder={renderingData.defaultValue||""}
      onKeyDown={(e) => handleChange(e.target.value)}
      onInput={(e) => handleChange(e.target.value)}
    />);
  }else{
    inputContent = (<input
        type="text"
        className={!!renderingData.error?"error":""}
        defaultValue={renderingData.value||""}
        placeholder={renderingData.defaultValue||""}
        onKeyDown={(e) => handleChange(e.target.value)}
        onInput={(e) => handleChange(e.target.value)}
    />);
  }

	return (
    <div className='string_editor'>
      {inputContent}
    </div>
  );
}
