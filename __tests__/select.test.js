import React, {Component} from 'react';
import {shallow, mount} from 'enzyme';
import {Select, Option} from '../src';

describe('Select', () => {
    it('create component', () => {
        const component = mount(<Select/>);
        expect(component).toMatchSnapshot();
        expect(component.find('.el-input input[readOnly]').length).toEqual(1);
    });
    it('define disabled', () => {
        const component = mount(<Select disabled/>);
        expect(component).toMatchSnapshot();
        expect(component.find('.el-input input[readOnly]').length).toEqual(1);
    });
    it('define size[small]', () => {
        const component = mount(<Select size="small"/>);
        expect(component).toMatchSnapshot();
        expect(component.find('.el-input input[readOnly]').length).toEqual(1);
    });
    it('define size[large]', () => {
        const component = mount(<Select size="large"/>);
        expect(component).toMatchSnapshot();
        expect(component.find('.el-input input[readOnly]').length).toEqual(1);
    });
    it('define className', () => {
        const component = shallow(<Select className="jest"/>);
        expect(component).toBeDefined();
        expect(component.find('.jest').length).toEqual(1);
    });
    it('define style', () => {
        const component = shallow(<Select style={{width: 100}}/>);
        expect(component).toMatchSnapshot();
    });
    it('define closeAfterSelect', () => {
        const component = shallow(<Select closeAfterSelect={false}/>);
        expect(component).toMatchSnapshot();
    });
    it('define name', () => {
        const component = mount(<Select name="jest"/>);
        expect(component).toBeDefined();
        expect(component.find('input[name="jest"]').length).toEqual(1);
    });
    it('define readOnly', () => {
        const component = mount(<Select readOnly/>);
        expect(component).toBeDefined(); //喵喵？
        expect(component.find('.el-input input[readOnly]').length).toEqual(1);
    });
    it('define searchable', () => {
        const component = mount(<Select searchable/>);
        expect(component).toBeDefined();
        expect(component.find('.el-input input[readOnly]').length).toEqual(1);
    });
    it('define options', () => {
        const component = mount(
            <Select>
                <Option label="1" value={1}/>
                <Option label="2" value={2}/>
                <Option value={3}>3</Option>
                <Option label="4" value={4} disabled/>
            </Select>);
        const data = [{
            value: 1,
            disabled: undefined,
            label: "1"
        }, {
            value: 2,
            disabled: undefined,
            label: "2"
        }, {
            value: 3,
            disabled: undefined,
            label: "3"
        }, {
            value: 4,
            disabled: true,
            label: "4"
        }];
        expect(component.instance().state.data).toEqual(data);
    });
});

describe('Select change', () => {
    describe('change', () => {
        beforeAll(() => {
            jest.useFakeTimers();
        });

        let container;
        beforeEach(() => {
            container = document.createElement('div');
            document.body.appendChild(container);
        });

        afterAll(() => {
            jest.useRealTimers();
        });

        afterEach(() => {
            document.body.removeChild(container);
        });

        it('options rendered', () => {
            const component = mount(<Select/>, {attachTo: container});
            expect(component.instance().container).toBeUndefined();
            component.instance().handleToggle(true);
            expect(component.instance().state.visible).toBe(true);
            expect(component.instance().container).toBeDefined();
            expect(component.instance().el_select_menu).toBeDefined();
            expect(component.instance().el_select_ul).toBeDefined();
        });
        it('dropdownStyle', () => {
            const component = mount(<Select dropdownStyle={{width: 100}}/>, {attachTo: container});
            component.instance().handleToggle(true);
            expect(component.instance().el_select_menu.style.width).toBe("100px");
        });
        it('dropdownClassName', () => {
            const component = mount(<Select dropdownClassName="jest"/>, {attachTo: container});
            component.instance().handleToggle(true);
            expect(component.instance().el_select_menu.classList.contains("jest")).toBe(true);
        });
        it('closeAfterSelect[true]', () => {
            const component = mount(<Select closeAfterSelect><Option
                value={1}>1</Option></Select>, {attachTo: container});
            component.instance().handleToggle(true);
            component.instance().el_select_ul.children[0].click();
            expect(component.instance().state.visible).toBe(false);
        });
        it('closeAfterSelect[false]', () => {
            const component = mount(<Select closeAfterSelect={false}><Option
                value={1}>1</Option></Select>, {attachTo: container});
            component.instance().handleToggle(true);
            component.instance().el_select_ul.children[0].click();
            expect(component.instance().state.visible).toBe(true);
        });
        it('onChange', () => {
            class Demo extends Component {
                constructor() {
                    super();
                    this.state = {value: ""}
                }

                handleChange({value}) {
                    this.setState({value});
                }

                render() {
                    return (
                        <Select ref={c => this._c = c}
                                value={this.state.value}
                                onChange={this.handleChange.bind(this)}
                        >
                            <Option value={1}>1</Option>
                        </Select>
                    )
                }
            }

            const component = mount(<Demo/>, {attachTo: container});
            component.find('input').simulate('click');
            component.instance()._c.el_select_ul.children[0].click();
            expect(component.instance().state.value).toBe(1);
        });

        class Demo extends Component {
            constructor() {
                super();
                this.state = {value: []}
            }

            handleChange({value}) {
                this.setState({value});
            }

            render() {
                return (
                    <Select
                        multiple
                        {...this.props}
                        ref={c => this._c = c}
                        value={this.state.value}
                        onChange={this.handleChange.bind(this)}
                    >
                        <Option value={1}>1</Option>
                        <Option value={2}>2</Option>
                    </Select>
                )
            }
        }

        it('multiple', () => {
            const wrapper = mount(<Demo/>, {attachTo: container});
            wrapper.find('input').simulate('click');
            wrapper.instance()._c.el_select_ul.children[0].click();
            expect(wrapper.instance().state.value).toEqual([1]);
            wrapper.find('input').simulate('click');
            wrapper.instance()._c.el_select_ul.children[1].click();
            expect(wrapper.instance().state.value).toEqual([1, 2]);
            wrapper.find('input').simulate('click');
            wrapper.instance()._c.el_select_ul.children[1].click();
            expect(wrapper.instance().state.value).toEqual([1]);
        });
        it('selectAll', () => {
            const wrapper = mount(<Demo selectAll/>);
            wrapper.find('input').simulate('click');
            wrapper.instance()._c.el_select_ul.children[0].click();
            jest.runAllTimers();
            expect(wrapper.instance().state.value).toEqual([1, 2]);
            wrapper.find('input').simulate('click');
            wrapper.instance()._c.el_select_ul.children[0].click();
            expect(wrapper.instance().state.value).toEqual([]);
        });
        it('onSearch & onMatch', () => {
            const wrapper = mount(<Demo/>, {attachTo: container});
            const handleMatch = jest.fn();
            const handleSearch = jest.fn();
            wrapper.setProps({selectAll: true, searchable: true, onSearch: handleSearch, onMatch: handleMatch});
            wrapper.find('input').simulate('change', {target: {value: "a"}});
            jest.runAllTimers();
            expect(handleSearch).toBeCalled();
            expect(handleMatch).toBeCalled();
            jest.runAllTimers();
            expect(wrapper.instance()._c.el_select_ul.children[0].classList.contains('el-select-no-data')).toEqual(true);
        });
    });
});
