import React, { useEffect, useState } from "react";
import { Buffer } from 'buffer';

function PhotoComponent({post, mode}) {
  const [postPhoto, setPhoto] = useState(post.content.photo);

  useEffect(() => {
    setPhoto(post.content.photo)
  }, [post._id, mode])

  const base64String = postPhoto ? Buffer.from(postPhoto.bufferObject.data).toString('base64') : null;
  
  return (
    <>
      {(() => {
        if (mode) {
          return !postPhoto 
            ? <input name="photo" type="file" />
            :  <div>
                {mode ? <button type="buttom" onClick={() => setPhoto(null)}>Delete photo</button> : null}
                <img src={'data:' + postPhoto.contentType + ";base64," + base64String}/>
              </div>
        } else {
          return !postPhoto 
            ? null 
            : <div>
                <img src={'data:' + postPhoto.contentType + ";base64," + base64String}/>
              </div>
        }
      })()}
    </>
  )
}

export default PhotoComponent;