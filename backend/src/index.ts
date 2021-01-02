import mongoose from 'mongoose';
import App from './app';
import AccountRouter from './routers/account.router';
import CarBrandRouter from './routers/car-brand.router';
import SessionRouter from './routers/session.router';

const app = new App([new AccountRouter(), new SessionRouter(), new CarBrandRouter()]);

app.seed().then(() => {
  app.listen();
});

process.on('SIGINT', function () {
  mongoose.connection.close(function () {
    console.log('Mongoose disconnected on app termination');
    process.exit(0);
  });
});
