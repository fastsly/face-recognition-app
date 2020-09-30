import React from 'react'
import './ImgLinkForm.css'
 
const ImgLinkForm = ({onInputChange,onSubmit})=>
{
    return (
        <div className='ma4 mt0'>
            <p className='f3'>
                {"This will detect faces in your pictures. Give it a try." }
            </p>
            <div className='center'>
                <div className='pa4 br3 shadow-5 form center'>
                    <input className='f4 pa2 w-70 center' type='text' onChange={onInputChange}/>
                    <button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple' onClick={onSubmit}>Detect</button>
                </div>
            </div>
        </div>
    )
}
export default ImgLinkForm