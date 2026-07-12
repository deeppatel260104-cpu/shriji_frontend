import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from "redux-thunk"
import { authReducer, passwordReducer } from './reducers/userReducer';
import { heroActionReducer, heroReducer } from './reducers/heroReducer';
import { categoriesReducer, categoryActionReducer, categoryDetailReducer } from './reducers/categoryReducer';
import { allImagesReducer, imageActionReducer, imagesReducer } from './reducers/imageReducers';
import { allVideosReducer, videoActionReducer, videosByCategoryReducer } from './reducers/videoReducer';
import { contactFormReducer } from './reducers/contactReducers';
import { addOnPackageActionReducer, addOnPackageDetailReducer, addOnPackagesReducer } from './reducers/addOnPackageReducer';
import { packageFaqActionReducer, packageFaqDetailReducer, packageFaqsReducer } from './reducers/packageFaqReducer';
import { packageActionReducer, packageDetailReducer, packagesReducer } from './reducers/packageReducer';

const reducer = combineReducers({

  auth: authReducer,
  password: passwordReducer,
  heroActionReducer: heroActionReducer,
  heroReducer: heroReducer,
  categoriesReducer:categoriesReducer, 
  categoryDetailReducer:categoryDetailReducer,
  categoryActionReducer:categoryActionReducer,
  imagesReducer:imagesReducer,
  imageActionReducer:imageActionReducer,
  allImagesReducer: allImagesReducer,
  allVideosReducer:allVideosReducer,
  videosByCategoryReducer: videosByCategoryReducer,
  videoActionReducer: videoActionReducer,
   contactForm: contactFormReducer,
  addOnPackagesReducer:addOnPackagesReducer,
  addOnPackageDetailReducer:addOnPackageDetailReducer,
  addOnPackageActionReducer:addOnPackageActionReducer,
  packageFaqsReducer:packageFaqsReducer,
  packageFaqDetailReducer:packageFaqDetailReducer,
  packageFaqActionReducer:packageFaqActionReducer,
  packagesReducer:packagesReducer,
  packageDetailReducer:packageDetailReducer,
  packageActionReducer:packageActionReducer,

})

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
