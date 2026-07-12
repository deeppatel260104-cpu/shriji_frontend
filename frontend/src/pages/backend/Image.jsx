import React from 'react'
import { imageConfig } from './../../components/Backend/config/imageConfig';
import CrudManager from '../../components/Backend/config/CrudManager';

function Image() {
  return (
      <div className="w-full h-screen ">
        <CrudManager config={imageConfig}  />

        </div>
   
  )
}

export default Image