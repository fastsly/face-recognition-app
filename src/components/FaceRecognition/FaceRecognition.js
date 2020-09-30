import React from 'react'
 
const FaceRecognition = ({imgUrl})=>
{
    return (
        <div className='center'>
            <img alt= 'This is where images for face recognition go.' src={imgUrl}/>
        </div>
    )
}
export default FaceRecognition