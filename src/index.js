import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Controller from 'components/Controller';
import registerServiceWorker from './registerServiceWorker';
import store from 'store/configureStore';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';

import './index.css';
import './animations.css';

const Office = window.Office;
initializeIcons();

Office.initialize = () => {
  ReactDOM.render(
    <Provider store={store}>
      <Controller />
    </Provider>,
    document.getElementById('root'),
  );
};

registerServiceWorker();
