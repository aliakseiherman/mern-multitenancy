import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import { getOptions } from './helpers/cors.helper';
import TenantsSeed from './seed/tenants.seed';
import UsersSeed from './seed/users.seed';
import CarBrandsSeed from './seed/car-brands.seed';

import { db as dbConfig } from './config.json';

class App {
  public app: express.Application;
  public port: string | number;
  public env: string;

  constructor(routers: any[]) {
    this.app = express();
    this.port = process.env.PORT || 8081;
    this.env = process.env.NODE_ENV || 'development';

    this.registerMiddleware();
    this.registerRouters(routers);
  }

  public async seed() {
    mongoose.connect(dbConfig.connection, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    const db = mongoose.connection;

    db.once('open', async () => {
      await new TenantsSeed().seed();
      await new UsersSeed().seed();
      await new CarBrandsSeed().seed();
    });
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`🚀 App listening on the port ${this.port}`);
    });
  }

  private registerMiddleware() {
    this.app.use(cors(getOptions()));
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());
  }

  private registerRouters(descriptors: any[]) {
    descriptors.forEach(descriptor => {
      this.app.use(descriptor.router);
    })
  }
}

export default App;