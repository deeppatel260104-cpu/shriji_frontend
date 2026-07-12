import React from 'react'
import CrudManager from '../../components/Backend/config/CrudManager';
import { packageFaqConfig } from '../../components/Backend/config/packageFaqConfig';

const PackageFaq = () => {
  return (
    <div className="w-full h-screen ">

      <CrudManager config={packageFaqConfig} />


    </div>
  )
}

export default PackageFaq
