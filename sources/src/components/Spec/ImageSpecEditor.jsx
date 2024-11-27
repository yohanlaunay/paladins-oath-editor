import { useRef } from 'preact/hooks';
import '../../styles/style.css';

export function ImageSpecEditor(params) {
  const renderingData = params.data;
  const fileInfo = params.info;
  const fileInput = useRef();

  const onUploadFile = () => { fileInput.current.click() }
  const onDeleteFile = () => { renderingData.onValueChanged(null) }
  const handleFileSelectionCancelled = () => {}
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
          return false;
        }
        // Strip base64 prefix if any.
        let data = e.target.result;
        const idx = data.indexOf(';base64,');
        if (idx > 0) {
          data = data.substring(idx+';base64,'.length);
        }
        renderingData.onValueChanged(data);
        return true;
      };
    };
  }

	return (
    <div className='image_editor'>
        <input
          type="file"
          ref={fileInput}
          style={{ display: 'none' }}
          onChange={handleFileSelected}
          onCancel={handleFileSelectionCancelled}
          accept={"."+fileInfo.ext}
        />
        {(!!renderingData.value)?<img src={"data:image/"+fileInfo.ext+";base64,"+renderingData.value} />:null}
        <div className='actions'>
          {(!!renderingData.value)?<button onClick={onDeleteFile}>Delete</button>:null}
          <button onClick={onUploadFile}>Change</button>
        </div>
    </div>
  );
}
