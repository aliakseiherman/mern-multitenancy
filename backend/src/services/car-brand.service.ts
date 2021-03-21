import { CarBrand } from "../database/documents/car-brand.document"
import { getDatabaseForTenant } from '../database/repo/car-brand.repo'
import { getNextId } from '../helpers/db.helper'

class CarBrandService {

  public async getAll(tenantId: Number): Promise<CarBrand[]> {
    const CarBrands = getDatabaseForTenant(tenantId)

    let result = await CarBrands.find({})
    return result
  }

  public async get(input: any): Promise<CarBrand> {
    const CarBrands = getDatabaseForTenant(input.tenantId)

    let result = await CarBrands.findById(input.id)
    return result
  }

  public async create(input: any): Promise<CarBrand> {
    const CarBrands = getDatabaseForTenant(input.tenantId)

    let nextId = await getNextId(CarBrands)

    let result = await new CarBrands({ _id: nextId, name: input.name, about: input.about }).save()
    return result
  }

  public async update(input: any): Promise<CarBrand> {
    const CarBrands = getDatabaseForTenant(input.tenantId)

    let result = await CarBrands.findOneAndUpdate({ _id: input.id }, { about: input.about })

    return result
  }

  public async delete(input: any): Promise<void> {
    const CarBrands = getDatabaseForTenant(input.tenantId)

    await CarBrands.findOneAndDelete({ _id: input.id })
  }
}

export default CarBrandService