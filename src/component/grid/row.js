/**
 * Created by elly on 2017/5/26.
 */
import React, {Component} from 'react';
import PropTypes          from 'prop-types';
import classnames         from 'classnames';
import {extend}           from "../util";

export default class Row extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {className, gutter, type, align, justify, children, style} = this.props;
        let _className = classnames(type === 'flex' ? 'el-grid-flex' : 'el-grid-row',
            align != null ? `el-grid-align-${align}` : '',
            justify != null ? `el-grid-justify-${justify}` : '',
            className);
        let noGutter = gutter == null;
        let _style = noGutter ? style : extend({marginLeft: -gutter / 2, marginRight: -gutter / 2}, style);
        return (
            <div className={_className} style={_style}>{!noGutter ?
                React.Children.map(children, (elm) => {
                    if (elm && elm.type && elm.type.displayName === 'GridCol') {
                        return React.cloneElement(elm,
                            {
                                style: {
                                    paddingLeft: gutter / 2,
                                    paddingRight: gutter / 2,
                                    ...elm.props.style
                                }
                            });
                    }
                    return elm;
                }) : children}
            </div>
        );
    }
}

Row.displayName = 'GridRow';

Row.propTypes = {
    gutter: PropTypes.number,
    type: PropTypes.oneOf(['flex', 'grid']),
    align: PropTypes.oneOf(['flex-start', 'flex-end', 'center', 'baseline', 'stretch']),
    justify: PropTypes.oneOf(['flex-start', 'flex-end', 'center', 'space-between', 'space-around'])
};

Row.defaultProps = {
    className: ''
};