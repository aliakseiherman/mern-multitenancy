import { ADD_CAR_BRAND, DELETE_CAR_BRAND, SET_CAR_BRANDS } from './reducers/car-brands'

export const setCarBrands = carBrands => ({
  type: SET_CAR_BRANDS,
  payload: {
    carBrands
  }
})

export const addCarBrand = carBrand => ({
  type: ADD_CAR_BRAND,
  payload: {
    carBrand
  }
})

export const deleteCarBrand = carBrand => ({
  type: DELETE_CAR_BRAND,
  payload: {
    carBrand
  }
})