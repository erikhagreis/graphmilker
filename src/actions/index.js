import * as pageApi from './fbPageApi';
import * as userApi from './fbUserApi';
import { boot, login } from './boot';
import closeGraphmilker from './closeGraphmilker';
import ensureDetails from './ensureDetails';
import formUpdateValue from './formUpdateValue';
import initApp from './fbInitApp';
import selectPost from './selectPost';
import showDetails from './showDetails';
import switchView from './switchView';
import urlFormSubmit from './urlFormSubmit';

export default {
  userApi,
  pageApi,
  boot,
  closeGraphmilker,
  ensureDetails,
  formUpdateValue,
  initApp,
  login,
  selectPost,
  showDetails,
  switchView,
  urlFormSubmit
};
