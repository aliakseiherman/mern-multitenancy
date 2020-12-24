import { Tenant } from "../database/documents/tenant.document";
import * as urlHelper from '../helpers/url.helper';
import { Tenants } from '../database/repo/tenant.repo'

class TenantService {

  public async getTenantBySubdomain(url: String): Promise<Tenant> {
    let subdomain = urlHelper.getSubdomain(url);

    if (!subdomain) {
      return null
    }

    return await this.getTenantByName(subdomain);
  }

  public async getTenantByName(name: String): Promise<Tenant> {
    let tenant = await Tenants.findOne({ name: name });
    return tenant;
  }
}

export default TenantService;