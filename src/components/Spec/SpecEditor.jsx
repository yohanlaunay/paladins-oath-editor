import { useEffect, useState } from 'preact/hooks';
import '../../styles/style.css';

export function SpecEditor(params) {
  const [activeData, setActiveData] = useState(params.data.data||{});
  const [errors, setErrors] = useState(null);

  const onSaveClicked = () => {params.data.saveData(activeData)}
  const onSaveDraftClicked = () => {params.data.saveData(activeData, /*skipValidation*/true)}

  // auto-validate on first data load.
  useEffect(() => {
    if( ! params.data ) return;
    if( !! errors ) return;

    const updatedErrors = {};
    params.data.specs.properties.forEach(p => {
      const data = activeData[p.id];
      if( (data === null || data === undefined) && !p.optional ){
        updatedErrors[p.id] = 'Value is required';
      }else{
        updatedErrors[p.id] = null;
      }
    });

    setErrors(updatedErrors);
    params.data.validateData(activeData);
  }, [errors]);

  const activeSpecs = params.data.specs;
  const propContainers = [];

  activeSpecs.properties.forEach(p => {
    const prop = p;
    const renderingData = {
      id: prop.id,
      property: prop,
      value: (activeData[prop.id] !== undefined ? activeData[prop.id] : null),
      defaultValue: prop.default !== undefined ? prop.default : null,
      error: (!!errors ? errors[prop.id] : null)|| null,
      validate: (newValue) => {
        try{
          prop.specs.validator(newValue);
          if( !!prop.validator ) prop.validator(newValue);
          return null;
        }catch( e ){
          return e.message;
        }
      },
      onValueChanged: (newValue) => {
        // store value temporarily
        let updatedData = {...activeData};
        updatedData[prop.id] = newValue;
        setActiveData(updatedData);
        if( newValue === null ){
          let updatedErrors = !!errors ? {...errors} : {};
          if( prop.optional === true || prop.default !== undefined ){
            updatedErrors[prop.id] = null;
          }else{
            updatedErrors[prop.id] = 'Required value';
          }
          setErrors(updatedErrors);
          params.data.validateData(updatedData);
          return;
        }

        // Validate
        try{
          prop.specs.validator(newValue);
          if( !!prop.validator ) prop.validator(newValue);
          // clear error
          let updatedErrors = !!errors ? {...errors} : {};
          updatedErrors[prop.id] = null;
          setErrors(updatedErrors);
        }catch( e ){
          // set error
          let updatedErrors = !!errors ? {...errors} : {};
          updatedErrors[prop.id] = e.message;
          setErrors(updatedErrors);
        }
        params.data.validateData(updatedData);
      }
    };

    const renderConfig = prop.renderConfig || {};
    const renderConditions = Array.isArray(renderConfig.renderConditions) ? renderConfig.renderConditions: [];
    let canRender = true;
    for( const renderCondition of renderConditions ){
      const cond = renderCondition[0];
      switch( cond ){
        case 'disableIf': {
          const shouldDisableFn = renderCondition[1];
          if( shouldDisableFn((activeData)) ){
            canRender = false;
            break;
          }
        }
        break;
      }
      if( ! canRender ){
        break;
      }
    }

    if( ! canRender ){
      return;
    }

    const extras = [];
    if( !! prop.illustration ){
      extras.push(<img src={prop.illustration} />);
    }
    if( !! prop.links && prop.links.length > 0 ){
      for( const link of prop.links ){
        extras.push(<a href={link.url}>{link.label}</a>)
      }
    }

    propContainers.push([
      <div className='prop_title'>
        <div className='title'>{"\u22B8 " + prop.label + (!!prop.optional||prop.default!==undefined?"":" (*)")}</div>
        {extras.length > 0 ? <div className='prop_extras'>{extras}</div>:null}
      </div>,
      <div className='prop_container'>
        {(!!prop.description)?<div className='prop_description'>{prop.description||""}</div>:null}
        {(!!renderingData.error)?<div className='error'>{renderingData.error}</div>:null}
        <div className='prop_value_container'>{prop.specs.render(renderingData)}</div>
      </div>
    ]);
  });

  let canSave = !params.data.error;
  if( errors != null ){
    for( const err of Object.values(errors) ){
      if( err !== null ){
        canSave = false;
        break;
      }
    }
  }

  const title = params.data.titleOverride !== undefined ? params.data.titleOverride : activeSpecs.title;
  const description = params.data.descriptionOverride !== undefined ? params.data.descriptionOverride : activeSpecs.description;

	return (
      <div className='spec_editor'>
        <div className='header'>
          <div className='title'>{title}</div>
          {(!!description)?<div className='description'>{description}</div>:null}
        </div>
        <div className='prop_containers'>
          {propContainers}
        </div>
        <div className='prop_footer'>
          {(params.data.disableActions !== true)?
            <div className='actions'>
              <button onClick={onSaveClicked} disabled={!canSave}>Save</button>
            </div>
            :null
          }
          {(!!params.data.error)?<div className='error'>{params.data.error}</div>:null}
        </div>
      </div>
	);
}
