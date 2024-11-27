import { useRef, useState } from 'preact/hooks';
import '../../styles/style.css';

export function ImageListSpecEditor(params) {
  const [activeIdx, setActiveIdx] = useState(-1);
  const [activeData, setActiveData] = useState(params.data.value||[]);

  const renderingData = params.data;
  const listParams = params.listParams;
  const fileInfo = params.info;
  const fileInput = useRef();

  const onUploadFile = (itemIdx) => {
    setActiveIdx(itemIdx);
    fileInput.current.click();
  }
  const onItemRemoved = (itemIdx) => {
    activeData.splice(itemIdx, 1);
    setActiveIdx(-1);
    setActiveData(activeData);
    renderingData.onValueChanged(activeData);
  };
  const handleFileSelectionCancelled = () => {
    setActiveIdx(-1);
  }
  const handleFileSelected = async () => {
    const file = fileInput.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (e) {
      var image = new Image();
      image.src = e.target.result;
      image.onload = function () {
        if (this.width != fileInfo.width || this.height != fileInfo.height) {
          alert("File dimensions do not match the requirements: "+this.width+"x"+this.height+" != "+fileInfo.width+"x"+fileInfo.height);
          setActiveIdx(-1);
          return false;
        }
        // Strip base64 prefix if any.
        let data = e.target.result;
        const idx = data.indexOf(';base64,');
        if (idx > 0) {
          data = data.substring(idx+';base64,'.length);
        }
        if( activeIdx > 0 && activeIdx >= activeData.length ){
          activeData.push(data);
        }else{
          activeData[activeIdx] = data;
        }
        setActiveIdx(-1);
        setActiveData(activeData);
        renderingData.onValueChanged(activeData);
        return true;
      };
    };
  }

  let items = [];
  if( renderingData.value != null ){
    for( const valIdx in renderingData.value ){
      const valIdxFinal = valIdx;
      const data = renderingData.value[valIdxFinal];
      items.push(
        <div className='item'>
          <div className='actions'>
            {(activeIdx < 0)?<button onClick={()=>onUploadFile(valIdxFinal)}>Change</button>:null}
            <div></div>
            {(!! data )?<button onClick={()=>onItemRemoved(valIdxFinal)}>Delete</button>:null}
          </div>
          {data?<img src={"data:image/"+fileInfo.ext+";base64,"+data}/>:null}
        </div>
      );
    }
  }

	return (
    <div className='image_editor'>
      <div className='items'>
        {items}
        {(listParams.maxCount <= 0 || items.length < listParams.maxCount)?
          <div className='add_action'>
            <button onClick={() => onUploadFile(activeData.length)}>Add</button>
          </div>
          :null
        }
      </div>
      <input
          type="file"
          ref={fileInput}
          style={{ display: 'none' }}
          onChange={handleFileSelected}
          onCancel={handleFileSelectionCancelled}
          accept={"."+fileInfo.ext}
        />
    </div>
  );
}
