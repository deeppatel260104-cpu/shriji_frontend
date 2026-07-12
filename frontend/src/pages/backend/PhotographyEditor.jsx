import React from 'react'
import { heroConfig } from './../../components/Backend/config/heroConfig';
import CrudManager from '../../components/Backend/config/CrudManager';

const PhotographyEditor = () => {
  return (
        <div className="w-full h-screen ">

          <CrudManager config={heroConfig}  />
      
      
    </div>
  )
}

export default PhotographyEditor
