import React, {
    Component
} from 'react';
import classSet from 'classnames';

export default class PageButton extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            pgBtn,
            label,
            active,
            hidden,
            onClick,
            disabled,
        } = this.props;
        const className = classSet({
            'pg-btn': pgBtn,
            active: active,
            hidden: hidden,
            disabled: disabled,
        });
        return (
            <li className={ className }>
                <a href="#" onClick={(e) => {
                    e.preventDefault();
                    !disabled && onClick()
                }}><span>{label}</span></a>
            </li>
        )
    }
}