import React from 'react'
import CrudManager from './../../components/Backend/config/CrudManager';
import { videoConfig } from './../../components/Backend/config/videoConfig';

const Video = () => {
  return (

    <div className="w-full h-screen ">

      <CrudManager config={videoConfig} />
    </div>
  )
}

export default Video