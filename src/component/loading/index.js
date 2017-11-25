/**
 * Created by elly on 2017/4/11.
 */
import ReactDOM from 'react-dom';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default class Stretch extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {size, title, mask, fullScreen, loading, className, children} = this.props;
        let _className = classnames('el-loading-wrapper', className, fullScreen ? 'el-loading-fixed' : null, size ? `el-${size}` : null);
        return (
            <div className={_className} style={loading ? {display: 'block'} : {display: 'none'}}>
                <div className={`el-loading-body ${mask ? 'el-loading-mask' : ''}`}>
                    <div className="el-loading-nest">
                        <div className="el-loading-content">
                            <div className="el-stretch">
                                <i className="el-stretch-rect"/>
                                <i className="el-stretch-rect"/>
                                <i className="el-stretch-rect"/>
                                <i className="el-stretch-rect"/>
                                <i className="el-stretch-rect"/>
                                <i className="el-stretch-rect"/>
                            </div>
                            {!!title &&
                            <div className="el-loading-title">{title}</div>}
                        </div>
                    </div>
                </div>
                {!!children &&
                <div className="el-loading-children">
                    {children}
                </div>}
            </div>
        )
    }
}

let _el_loading_content = null;

Stretch.loading = (props = {}) => {
    props.mask = true;
    props.fullScreen = true;
    if (!_el_loading_content) {
        _el_loading_content = document.createElement('div');
        document.body.appendChild(_el_loading_content);
    }
    ReactDOM.render(<Stretch {...props}/>, _el_loading_content);
};

Stretch.close = () => {
    if (_el_loading_content) {
        ReactDOM.unmountComponentAtNode(_el_loading_content);
        document.body.removeChild(_el_loading_content);
        _el_loading_content = null;
    }
};

Stretch.propTypes = {
    mask: PropTypes.bool,
    title: PropTypes.any,
    loading: PropTypes.bool,
    fullScreen: PropTypes.bool,
    className: PropTypes.string,
    size: PropTypes.oneOf(['small', 'large']),
};

Stretch.defaultProps = {
    loading: true
};