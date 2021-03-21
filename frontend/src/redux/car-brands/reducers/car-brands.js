export const SET_CAR_BRANDS = 'SET_CAR_BRANDS'
export const ADD_CAR_BRAND = 'ADD_CAR_BRAND'
export const DELETE_CAR_BRAND = 'DELETE_CAR_BRAND'

const initialState = {
  carBrands: []
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CAR_BRANDS:
      const { carBrands } = action.payload
      return {
        ...state,
        carBrands
      }
    case ADD_CAR_BRAND:
      const { carBrand: carBrand1 } = action.payload
      return {
        ...state,
        carBrands: [...state.carBrands, carBrand1]
      }
    case DELETE_CAR_BRAND:
      const { carBrand: carBrand2 } = action.payload
      console.log(carBrand2)
      return {
        ...state,
        carBrands: state.carBrands.filter(cb => cb.name !== carBrand2.name)
      }
    default:
      return state
  }
}
