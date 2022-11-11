import React, { useEffect, useState } from "react";
import { Buffer } from 'buffer';

function PhotoComponent({photoBlock, mode}) {
  const [photo, setPhoto] = useState(photoBlock);

  const base64String = photo ? Buffer.from(photo.bufferObject.data).toString('base64') : null;

  useEffect(() => {
    setPhoto(photoBlock)
  }, [mode])
  
  return (
    (() => {
      if (mode) {
        return !photo 
          ? <input type="file" name="photo" />
          : <div>
              <button onClick={() => setPhoto(null)}>Delete photo</button>
              <img src={'data:' + photo.contentType + ';base64,' + base64String} />
            </div>
      } else {
        return !photo 
          ? null 
          : <div>
              <img src={'data:' + photo.contentType + ';base64,' + base64String} />
            </div>
      }
    })()
  )
}

export default PhotoComponent;