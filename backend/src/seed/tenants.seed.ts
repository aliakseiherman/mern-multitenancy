import { Tenants } from '../database/repo/tenant.repo'

class TenantsSeed {
  public seed = async (): Promise<void> => {
    ['subdomain1', 'subdomain2'].forEach(async (name, i) => {
      await Tenants.exists({ name: name }, async (err, res) => {
        if (!res) {
          await new Tenants({ _id: i + 1, name: name }).save()
        }
      })
    })
  }
}

export default TenantsSeed