import React, { useEffect, useState } from "react";
import { Buffer } from 'buffer';

function CommentPhoto({photo, mode}) {
  const [photoComponent, setPhoto] = useState(photo);

  const base64String = photoComponent ? Buffer.from(photoComponent.bufferObject.data).toString('base64') : null;

  useEffect(() => {
    setPhoto(photo)
  }, [mode])
  
  return (
    (() => {
      if (mode) {
        return !photoComponent 
          ? <input type="file" name="photo" />
          : <div>
              <button onClick={() => setPhoto(null)}>Delete photo</button>
              <img src={'data:' + photoComponent.contentType + ';base64,' + base64String} />
            </div>
      } else {
        return !photoComponent 
          ? null 
          : <div>
              <img src={'data:' + photoComponent.contentType + ';base64,' + base64String} />
            </div>
      }
    })()
  )
}

export default CommentPhoto;