import every from 'lodash/every';
import NumberControl from './NumberControl';
import BooleanControl from './BooleanControl';
import SelectControl from './SelectControl';
import TextControl from './TextControl';
import ColorControl from './ColorControl';

import { isNumber, isBoolean, isArray } from 'utils/validate';

export default {
    number: {
        Component: NumberControl,
        rules: [
            isNumber('value'),
            isNumber('min'),
            isNumber('max'),
            isNumber('step')
        ]
    },
    boolean: {
        Component: BooleanControl,
        rules: [
            isBoolean('value')
        ]
    },
    select: {
        Component: SelectControl,
        rules: [
            isArray('options'),
            ['options',
                options => every(options, ({ value, label }) =>
                    value !== undefined && label !== undefined
                ),
                'Every item in `options` must have a `value` and `label` property'
            ]
        ]
    },
    text: {
        Component: TextControl,
        rules: []
    },
    color: {
        Component: ColorControl,
        rules: []
    }
};
