import '../styles/style.css';

export function Popup(params) {
	return (
        <div className='popup_container' onClick={()=>{}}>
            <div className='popup_content'>
                <div className='popup_header'>
                    <div className='popup_title'>{params.title}</div>
                    <button onClick={() => params.onClose()}>Close</button>
                </div>
                <div className='popup_main'>
                    {params.children}
                </div>
            </div>
      </div>
  );
}
