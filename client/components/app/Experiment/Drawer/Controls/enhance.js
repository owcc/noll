import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from 'actions/experiments';
import getExperiment from 'utils/getExperiment';
import getValues from 'utils/getValues';

const mapStateToProps = createSelector(
    (state, props) => {
        const experiment = getExperiment(state, props);
        return experiment && experiment.config && experiment.config.controls;
    },
    state => state.experiments.values,
    (controls, values) => ({
        controls,
        values: getValues(controls, values)
    })
);

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
});

export default function enhance(Component) {
    return connect(mapStateToProps, mapDispatchToProps)(Component);
}
