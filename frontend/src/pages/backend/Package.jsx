import React from 'react'
import CrudManager from '../../components/Backend/config/CrudManager';
import { packageConfig } from '../../components/Backend/config/packageConfig';

const Package = () => {
  return (
    <div className="w-full h-screen ">

      <CrudManager config={packageConfig} />


    </div>
  )
}

export default Package
