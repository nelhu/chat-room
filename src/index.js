import dva from 'dva';
import {createLogger} from 'redux-logger';
import createLoading from 'dva-loading';
import createHistory from 'history/createBrowserHistory';
import './index.css';

export const browserHistory = createHistory();

// 1. Initialize
const app = dva({
  history: browserHistory,
  onAction: createLogger(),
});

// 2. Plugins
app.use(createLoading());

// 3. Model
app.model(require('./models').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
