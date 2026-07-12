import React from 'react'
import { categoryConfig } from './../../components/Backend/config/categoryConfig';
import CrudManager from '../../components/Backend/config/CrudManager';

const Category = () => {
  return (
    <div className="w-full h-screen ">

      <CrudManager config={categoryConfig} />


    </div>
  )
}

export default Category