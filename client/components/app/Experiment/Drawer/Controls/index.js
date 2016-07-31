import reduce from 'lodash/reduce';
import cn from 'classnames';
import React, { createClass, PropTypes } from 'react';
import Button from 'components/ui/Button';

import NumberControl from './NumberControl';
import BooleanControl from './BooleanControl';

import enhance from './enhance';
import styles from './styles.scss';

const ControlByType = {
    number: NumberControl,
    boolean: BooleanControl,
};

const Controls = createClass({

    displayName: 'Controls',

    propTypes: {
        controls: PropTypes.array.isRequired,
        values: PropTypes.object.isRequired,
        actions: PropTypes.object.isRequired,
        className: PropTypes.string
    },

    componentWillMount() {
        this.collectHandler();
    },

    componentWillUpdate(nextProps) {
        this.collectHandler(nextProps);
    },

    collectHandler(props = this.props) {
        const { controls, actions } = props;
        const { setValue } = actions;
        this.handlers = reduce(controls, (acc, { key }) => {
            const prevHandler = this.handlers && this.handlers[key];
            acc[key] = prevHandler || (value => setValue(key, value));
            return acc;
        }, {});
    },

    render() {
        const { controls, values, actions, className } = this.props;
        const { resetValues } = actions;

        return (
            <div className={cn(styles.container, className)}>
                {controls.length ?
                    <div className={styles.controls}>
                        {controls.map(control => {
                            const { key, type } = control;
                            const Control = ControlByType[type.toLowerCase()];
                            return (
                                <Control
                                    key={key}
                                    control={control}
                                    value={values[key]}
                                    onChange={this.handlers[key]}
                                    className={styles.control}/>);
                        })}
                        <div className={styles.actions}>
                            <Button
                                onClick={resetValues}
                                icon="times"
                                block>
                                Use defaults
                            </Button>
                        </div>
                    </div> :
                    <div className={styles.nocontrols}>
                        You haven't defined any controls.
                    </div>
                }
            </div>
        );
    }
});

export default enhance(Controls);
