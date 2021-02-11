import App from './app';
 import PieceController from './controller/piece_controller';
 import UsersController from './controller/users_controller';
// import SentencesController from './controller/sentences-controller';
// import SourceController from './controller/source_controller';

const PORT : any = process.env.PORT || 4000;
const app = new App(
  [
     new PieceController(),
     new UsersController(),
    // new SentencesController(),
    // new SourceController()
  ],
  PORT,
);
 
app.listen();


