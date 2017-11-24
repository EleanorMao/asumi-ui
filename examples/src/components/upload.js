/**
 * Created by elly on 2017/4/5.
 */
import React, {Component} from 'react';
import {
    Upload,
    Button,
    Group,
    Table,
    Col
} from '../../../src';
import Panel from './panel';
import {basic, validator, api} from '../constants/upload'

export default class Main extends Component {
    constructor(props) {
        super(props);
    }

    handleUpload({files, succeed, value, failed, name}) {
        console.dir(files);
        console.dir(value);
        let names = [];
        for (let i = 0; i < files.length; i++) {
            names.push(files[i].name);
        }
        alert(`input[name="${name}"] uploaded file: ${names.join(', ')} and failed ${failed.length}`);
    }

    validator(file) {
        if (~file.name.indexOf('a')) return true;
    }

    validatorError(file) {
        alert('validatorError! ' + file.name);
    }

    typeValidatorError(file) {
        alert('type error!' + file.name);
    }

    sizeValidatorError(file) {
        alert('size error!' + file.name);
    }

    render() {
        return (
            <div className="content">
                <h1>Upload 上传</h1>
                <Panel
                    title="Basic"
                    code={basic}
                >
                    <Group style={{marginRight: 10}}>
                        <Upload
                            name="click/drag_to_upload"
                            onUpload={this.handleUpload.bind(this)}>
                            <Button type="success">click/drag to upload</Button>
                        </Upload>
                        <Upload
                            multiple
                            name="upload_multiple_files"
                            onUpload={this.handleUpload.bind(this)}>
                            <Button type="primary">upload multiple files</Button>
                        </Upload>
                        <Upload
                            accept="image/png"
                            name="upload_image/jpg_type_files"
                            onUpload={this.handleUpload.bind(this)}
                            typeValidatorError={this.typeValidatorError.bind(this)}
                        >
                            <Button type="secondary">upload image/png type files</Button>
                        </Upload>
                        <Upload
                            maxSize={1024 * 30}
                            name="max_size_is_1kb"
                            onUpload={this.handleUpload.bind(this)}
                            sizeValidatorError={this.sizeValidatorError.bind(this)}
                        >
                            <Button type="danger">max size is 30kb</Button>
                        </Upload>
                        <Upload
                            disabled
                            name="disabled_to_upload"
                            onUpload={this.handleUpload.bind(this)}
                        >
                            <Button>disabled to upload</Button>
                        </Upload>
                    </Group>
                </Panel>
                <Panel
                    title="validator"
                    code={validator}
                >
                    <Upload
                        name="validator"
                        validator={this.validator.bind(this)}
                        onUpload={this.handleUpload.bind(this)}
                        validatorError={this.validatorError.bind(this)}
                    >
                        <Button type="primary">file name should have an 'a'</Button>
                    </Upload>
                </Panel>
                <h1>API</h1>
                <Table isKey="property" data={api} lineWrap="break">
                    <Col dataField="property">Property</Col>
                    <Col dataField="description">Description</Col>
                    <Col dataField="type">Type</Col>
                    <Col dataField="default">Default</Col>
                </Table>
            </div>
        )
    }
}