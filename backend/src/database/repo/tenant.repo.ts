import { model } from 'mongoose'
import { TenantSchema } from '../schema/tenant.schema'
import { Tenant } from '../documents/tenant.document'

const Tenants = model<Tenant>('Tenant', TenantSchema)

export { Tenants }