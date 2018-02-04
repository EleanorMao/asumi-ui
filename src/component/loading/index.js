/**
 * Created by elly on 2017/4/11.
 */
import ReactDOM           from 'react-dom';
import React, {Component} from 'react';
import PropTypes          from 'prop-types';
import classnames         from 'classnames';
import ChaseDot           from './chaseDot';
import Stretch            from './stretch';
import Bounce             from './bounce';

export default class Loading extends Component {
    constructor(props) {
        super(props);
    }

    childRender(type) {
        let output;
        switch (type) {
            case 'chase-dots':
                output = <ChaseDot/>;
                break;
            case 'bounce':
                output = <Bounce/>;
                break;
            default:
                output = <Stretch/>;
                break;
        }

        return output;
    }

    render() {
        let {size, title, mask, type, fullScreen, loading, className, children} = this.props;
        let _className = classnames('el-loading-wrapper', className, fullScreen ? 'el-loading-fixed' : null, size ? `el-${size}` : null);
        return (
            <div className={_className} style={loading ? {display: 'block'} : {display: 'none'}}>
                <div className={`el-loading-body ${mask ? 'el-loading-mask' : ''}`}>
                    <div className="el-loading-nest">
                        <div className="el-loading-content">
                            {this.childRender(type)}
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
        );
    }
}

let _el_loading_content = null;

Loading.loading = (props = {}) => {
    props.mask = true;
    props.fullScreen = true;
    if (!_el_loading_content) {
        _el_loading_content = document.createElement('div');
        document.body.appendChild(_el_loading_content);
    }
    const renderToDom = ReactDOM.render || ReactDOM.hydrate;
    renderToDom(<Loading {...props}/>, _el_loading_content);
};

Loading.close = () => {
    if (_el_loading_content) {
        ReactDOM.unmountComponentAtNode(_el_loading_content);
        document.body.removeChild(_el_loading_content);
        _el_loading_content = null;
    }
};

Loading.propTypes = {
    mask: PropTypes.bool,
    title: PropTypes.any,
    loading: PropTypes.bool,
    fullScreen: PropTypes.bool,
    className: PropTypes.string,
    size: PropTypes.oneOf(['small', 'large']),
    type: PropTypes.oneOf(['chase-dots', 'stretch', 'bounce'])
};

Loading.defaultProps = {
    loading: true,
    type: 'stretch'
};