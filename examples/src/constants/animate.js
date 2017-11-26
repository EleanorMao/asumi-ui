/**
 * Created by elly on 2017/4/18.
 */
export const basic = `<style>
.example-enter {
    max-height: 1px;
    overflow: hidden;
}

.example-enter.example-enter-active {
    max-height: 30px;
    overflow: hidden;
    transition: all 500ms cubic-bezier(0, 1, 0.5, 1);
}

.example-leave {
    max-height: 30px;
}

.example-leave.example-leave-active {
    max-height: 1px;
    overflow: hidden;
    transition: all 500ms cubic-bezier(0, 1, 0.5, 1);
}

.example-appear {
    background: #7AD57D !important;
}

.example-appear.example-appear-active {
    background: #eee !important;
    transition: background .5s ease-in;
}
</style>
 
import {Button, Animate} from 'asumi';

class Foo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arr: [0, 1]
        }
    }

    handleClick(method) {
        this.setState(old => {
            old.arr[method](old.arr.length);
            return old;
        })
    }
    
    handleAppear(key) {
        console.log('appear:', key)
    }

    handleLeave(key) {
        console.log('leave:', key)
    }

    handleEnter(key) {
        console.log('enter:', key)
    }

    handleEnd(key) {
        console.log('end: ', key)
    }
    
    render(){
        return (
            <div>
                <Button
                    type="success"
                    style={{marginRight: 10}}
                    onClick={this.handleClick.bind(this, 'push')}
                >Push</Button>
                <Button
                    type="primary"
                    style={{marginRight: 10}}
                    onClick={this.handleClick.bind(this, 'pop')}
                >Pop</Button>
                <Animate
                    transitionName="example"
                    // transitionName={{
                    //     appear: 'example-appear',
                    //     appearActive: 'example-appear-active',
                    //     enter: 'example-enter',
                    //     enterActive: 'example-enter-active',
                    //     leave: 'example-leave',
                    //     leaveActive: 'example-leave-active'
                    // }}
                    style={{marginTop: 10}}
                    transitionAppear
                    component="div"
                    onAppear={this.handleAppear.bind(this)}
                    onEnter={this.handleEnter.bind(this)}
                    onLeave={this.handleLeave.bind(this)}
                    onEnd={this.handleEnd.bind(this)}
                >
                    {
                        arr.map((item) => {
                            return (
                                <p key={item}
                                   style={{
                                       background: '#f0f0f0',
                                       lineHeight: '30px',
                                       marginBottom: 10
                                   }}>{item}</p>
                            )
                        })
                    }
                </Animate>
            </div>
        )
    }
}`;

export const api = [{
    property: "component",
    type: "node | string",
    'default': "span",
    description: "define a dom to wrap children"
}, {
    property: "componentProps",
    type: "object",
    'default': "{}",
    description: "define component props"
}, {
    property: "className",
    type: "string",
    'default': "",
    description: "class name of wrapper"
}, {
    property: "style",
    type: "object",
    'default': "",
    description: "style of wrapper"
}, {
    property: "transitionAppear",
    type: "bool",
    'default': "false",
    description: "whether support transition appear animate"
}, {
    property: "transitionEnter",
    type: "bool",
    'default': "true",
    description: "whether support transition enter animate"
}, {
    property: "transitionLeave",
    type: "bool",
    'default': "true",
    description: "whether support transition leave animate"
}, {
    property: "transitionName",
    type: "string | {appear: string, appearActive: string, enter: string, enterActive: string, leave: string, leaveActive: string}",
    'default': "true",
    description: "define animate css. more information please see example"
}, {
    property: "onAppear",
    type: "func",
    'default': "(key)=>{}",
    description: "invoke when appear"
}, {
    property: "onEnter",
    type: "func",
    'default': "(key)=>{}",
    description: "invoke when enter"
}, {
    property: "onLeave",
    type: "func",
    'default': "(key)=>{}",
    description: "invoke when leave"
}, {
    property: "onEnd",
    type: "func",
    'default': "(key)=>{}",
    description: "invoke when end"
}];
