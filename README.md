# MERN multitenancy

![image](https://i.imgur.com/W60BtXQ.png)


### features

- multi-layered architecture: app > router > controller > service
- back-end uses TypeScript
- tenant resolved by subdomain
- MongoDB, collection per tenant (e.g. postfix `_t1` for tenant 1, `subdomain1`)
- JWT authentication
- CORS, whitelist of domains
- hashing password with salt & pepper
- `usedId` and `tenantId` is bound to `Request` object


* front-end is based on React, uses JavaScript
  * basic login / sign up functionality
  * demo functionality
  * redirects to login page after session expires
  * Redux store keeps user data
    * holds user and tenant data after login
    * redirects to homepage when `user` is provided
    * redirects to login when `user` is not found

### guide

add to hosts:

```
127.0.0.1       mtexpress
127.0.0.1       subdomain1.mtexpress
127.0.0.1       subdomain2.mtexpress
```

run back-end and front-end apps using `npm start` or `yarn start`


front-end

```
http://subdomain1.mtexpress:4000
http://subdomain2.mtexpress:4000
```

records that you create are only available for current tenant (subdomain)
