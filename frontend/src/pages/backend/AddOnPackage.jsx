import React from 'react'
import CrudManager from '../../components/Backend/config/CrudManager';
import { addOnPackageConfig } from '../../components/Backend/config/addOnPackageConfig';

const AddOnPackage = () => {
  return (
    <div className="w-full h-screen ">

      <CrudManager config={addOnPackageConfig} />


    </div>
  )
}

export default AddOnPackage
