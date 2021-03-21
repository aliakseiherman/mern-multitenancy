import { model } from 'mongoose'
import { CarBrandSchema } from '../schema/car-brand.schema'
import { CarBrand } from '../documents/car-brand.document'

const getDatabaseForTenant = (tenantId) => {
  if (!tenantId) {
    throw new Error('tenant_id is missing')
  }

  return model<CarBrand>('CarBrand', CarBrandSchema, `car_brands_t${tenantId}`)
}

export { getDatabaseForTenant }