/**
 * Created by elly on 2017/4/5.
 */
import React, {Component} from 'react';
import {
    Uploader,
    Button,
    Group,
    Table,
    Col
} from '../../../src';
import Panel from './panel';
import {basic, validator, api} from '../constants/uploader'

export default class Main extends Component {
    constructor(props) {
        super(props);
    }

    handleUpload(fileList, failed, name) {
        console.dir(fileList);
        let names = [];
        for (let i = 0; i < fileList.length; i++) {
            names.push(fileList[i].name);
        }
        alert(`input[name="${name}"] uploaded file: ${names.join(', ')} and failed ${failed.length}`);
    }

    validator(file) {
        if (~file.name.indexOf('a')) return true;
    }

    validatorError(file) {
        alert('validatorError! ' + file.name);
    }

    render() {
        return (
            <div className="content">
                <h1>Uploader 上传</h1>
                <Panel
                    title="Basic"
                    code={basic}
                >
                    <Group style={{marginRight: 10}}>
                        <Uploader
                            name="click/drag_to_upload"
                            onUpload={this.handleUpload.bind(this)}>
                            <Button type="success">click/drag to upload</Button>
                        </Uploader>
                        <Uploader
                            multiple
                            name="upload_multiple_files"
                            onUpload={this.handleUpload.bind(this)}>
                            <Button type="primary">upload multiple files</Button>
                        </Uploader>
                        <Uploader
                            accept="image/jpg"
                            name="upload_image/jpg_type_files"
                            onUpload={this.handleUpload.bind(this)}>
                            <Button type="secondary">upload image/jpg type files</Button>
                        </Uploader>
                        <Uploader
                            maxSize={1024 * 30}
                            name="max_size_is_1kb"
                            onUpload={this.handleUpload.bind(this)}>
                            <Button type="danger">max size is 30kb</Button>
                        </Uploader>
                        <Uploader
                            disabled
                            name="disabled_to_upload"
                            onUpload={this.handleUpload.bind(this)}
                        >
                            <Button>disabled to upload</Button>
                        </Uploader>
                    </Group>
                </Panel>
                <Panel
                    title="validator"
                    code={validator}
                >
                    <Uploader
                        name="validator"
                        validator={this.validator.bind(this)}
                        validatorError={this.validatorError.bind(this)}
                        onUpload={this.handleUpload.bind(this)}
                    >
                        <Button type="primary">file name should have an 'a'</Button>
                    </Uploader>
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