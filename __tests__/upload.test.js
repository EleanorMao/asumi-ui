import React from 'react';
import {shallow, mount} from 'enzyme';
import {Upload} from '../src';

describe('Upload', () => {
    beforeAll(() => {
        jest.useFakeTimers();
    });

    afterAll(() => {
        jest.useRealTimers();
    });
    it('create component', () => {
        const component = shallow(<Upload/>);
        expect(component).toBeDefined();
        expect(component.find('.el-uploader-wrapper input[type="file"]').length).toEqual(1);
    });
    it('define className', () => {
        const component = shallow(<Upload className="jest"/>);
        expect(component).toBeDefined();
        expect(component.find('.el-uploader-wrapper.jest').length).toEqual(1);
    });
    it('define name', () => {
        const component = shallow(<Upload name="name"/>);
        expect(component).toBeDefined();
        expect(component.find(".el-uploader-wrapper input[name='name']").length).toEqual(1);
    });
    it('define accept & typeValidatorError', () => {
        const handleValidatorError = jest.fn();
        const validatorError = jest.fn();
        const component = mount(<Upload accept="image/*" validatorError={validatorError}
                                        typeValidatorError={handleValidatorError}/>);
        expect(component).toBeDefined();
        expect(component.find('.el-uploader-wrapper input[accept="image/*"]').length).toEqual(1);
        component.find('input').simulate('change', {
            target: {
                files: [{filename: 'foo.png', type: "image/png"},],
            }
        });
        component.find('input').simulate('change', {
            target: {
                files: [{filename: 'foo.html', type: "text/html"},],
            }
        });
        jest.runAllTimers();
        expect(handleValidatorError).toBeCalled();
        expect(validatorError).toBeCalled();
    });
    it('define maxSize & sizeValidatorError', () => {
        const handleValidatorError = jest.fn();
        const validatorError = jest.fn();
        const component = mount(<Upload maxSize={1024} validatorError={validatorError}
                                        sizeValidatorError={handleValidatorError}/>);
        expect(component).toBeDefined();
        expect(component.find('.el-uploader-wrapper input').length).toEqual(1);
        component.find('input').simulate('change', {
            target: {
                files: [{filename: 'foo.png', size: 100},],
            }
        });
        component.find('input').simulate('change', {
            target: {
                files: [{filename: 'foo.html', size: 2000},],
            }
        });
        jest.runAllTimers();
        expect(handleValidatorError).toBeCalled();
        expect(validatorError).toBeCalled();
    });
    it('define disabled', () => {
        const component = shallow(<Upload disabled/>);
        expect(component).toBeDefined();
        expect(component.find('.el-uploader-wrapper input[disabled]').length).toEqual(1);
    });
    it('define multiple', () => {
        const component = shallow(<Upload multiple/>);
        expect(component).toBeDefined();
        expect(component.find('.el-uploader-wrapper input[multiple]').length).toEqual(1);
    });
    it('define children', () => {
        const component = shallow(<Upload><b/></Upload>);
        expect(component).toBeDefined();
        expect(component.find('.el-uploader-wrapper b').length).toEqual(1);
    });
    it('define onUpload', () => {
        const handleUpload = jest.fn();
        const component = mount(<Upload onUpload={handleUpload}/>);
        expect(component).toBeDefined();
        expect(component.find('.el-uploader-wrapper input').length).toEqual(1);
        component.find('input').simulate('change', {
            target: {
                files: [{filename: 'foo.png', size: 100},],
            }
        });
        jest.runAllTimers();
        expect(handleUpload).toBeCalled();
    });
    it('define validator & validatorError', () => {
        const validator = () => {
            return false
        };
        const validatorError = jest.fn();
        const component = mount(<Upload validator={validator} validatorError={validatorError}/>);
        expect(component).toBeDefined();
        expect(component.find('.el-uploader-wrapper input').length).toEqual(1);
        component.find('input').simulate('change', {
            target: {
                files: [{filename: 'foo.png'},],
            },
            preventDefault: jest.fn()
        });
        jest.runAllTimers();
        expect(validatorError).toBeCalled();
    });
});