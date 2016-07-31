import cn from 'classnames';
import React, { PropTypes } from 'react';
import Button from 'components/ui/Button';

import NumberControl from './NumberControl';
import BooleanControl from './BooleanControl';

import enhance from './enhance';
import styles from './styles.scss';

const ControlByType = {
    number: NumberControl,
    boolean: BooleanControl,
};

const Controls = props => {
    const { controls, values, actions, className } = props;
    const { setValue, resetValues } = actions;

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
                                onChange={value => setValue(key, value)}
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
};

Controls.propTypes = {
    controls: PropTypes.array.isRequired,
    values: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    className: PropTypes.string
};

export default enhance(Controls);
