import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from './components/app/App';
import Choose from './components/app/Choose';
import Experiment from './components/app/Experiment';
import createStore from './store';
import { setExperiments } from './actions';
import './style.scss';

export default function createClient() {
    const store = createStore();
    const rootEl = document.getElementById('root');
    render((
        <Provider store={store}>
            <Router history={browserHistory}>
                <Route path="/" component={App}>
                    <IndexRoute component={Choose}/>
                    <Route path="(:id)" component={Experiment} onEnter={({ params }) => console.log('Enter', params)}/>
                </Route>
            </Router>
        </Provider>
    ), rootEl);
    return experiments => store.dispatch(setExperiments(experiments));
}
