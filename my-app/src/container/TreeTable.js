import React, {Component} from 'react';
import {
    Table, Input, InputNumber, Popconfirm, Form, Button, Select
} from 'antd';

const Option = Select.Option;
const FormItem = Form.Item;
const EditableContext = React.createContext();

export class EditableCell extends React.Component {
    filterOption = (input, option) => {

        return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }

    getInput = (dataIndex, fathers) => {

        if (this.props.inputType === 'number') {
            return <InputNumber/>;
        }
        if (this.props.dataIndex === 'fatherName') {
            return (<Select style={{width: 200}} filterOption={this.filterOption} showSearch>
                {[this.props.data.map(function (item) {
                    if (item !== '新增未保存' && item !== 'root') {
                        return (<Option value={item}>
                            {item}
                        </Option>)
                    }

                })]}
            </Select>)
        }
        return <Input/>;
    };

    render() {
        const {
            editing,
            dataIndex,
            title,
            inputType,
            record,
            index, data,
            ...restProps
        } = this.props;


        return (
            <EditableContext.Consumer>
                {(form) => {
                    const {getFieldDecorator} = form;
                    return (
                        <td {...restProps}>
                            {editing ? (
                                <FormItem style={{margin: 0}}>
                                    {getFieldDecorator(dataIndex, {
                                        rules: [{
                                            required: dataIndex!=='fatherName',
                                            message: `Please Input ${title}!`,
                                        }],
                                        initialValue: record[dataIndex],
                                    })(this.getInput(dataIndex, data))}
                                </FormItem>
                            ) : restProps.children}
                        </td>
                    );
                }}
            </EditableContext.Consumer>
        );
    }
}

class EditableTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {editingKey: ''};
        this.columns = [
            {
                title: 'id',
                dataIndex: 'uid',
                width: '25%',
                editable: false,
            },
            {
                title: '名称',
                dataIndex: 'name',
                width: '15%',
                editable: true,
            },
            {
                title: '父级',
                dataIndex: 'fatherName',
                width: '40%',
                editable: true,
            },
            {
                title: 'operation',
                dataIndex: 'operation',
                render: (text, record) => {
                    const {editingKey} = this.state;
                    const editable = this.isEditing(record);
                    return (editable ? (
                        <span>
                  <EditableContext.Consumer>
                    {form => (
                        <a
                            href="javascript:;"
                            onClick={() => this.save(form, record.key, record)}
                            style={{marginRight: 8}}
                        >
                            保存
                        </a>
                    )}
                  </EditableContext.Consumer>
                  <Popconfirm
                      title="是否确定取消?"
                      onConfirm={() => this.cancel(record.key)}
                  >
                    <a>取消</a>
                  </Popconfirm>
                </span>
                    ) : <a onClick={() => this.edit(record.uid)}>编辑</a>);
                },
            },
        ];
    }

    isEditing = record => record.uid === this.state.editingKey;

    cancel = () => {
        this.setState({editingKey: ''});
    };

    save = async (form, key, record) => {
        form.validateFields((error, row) => {

            if (error) {
                return;
            }

      let p = this.props.handleUpdate({...record, ...row});
            p.then(res => {
                this.setState({editingKey: ''})
            })

        });
    }

    edit = (key) => {
        this.setState({editingKey: key});
    }

    render() {
        const components = {
            body: {
                cell: EditableCell,
            },
        };
        let fathers = Array.from(new Set(this.props.data.map(function (item) {
            return item.name
        })));
        const columns = this.columns.map((col) => {
            if (!col.editable) {
                return col;
            }

            return {
                ...col,
                onCell: record => {

                    return ({
                        record,
                        inputType: col.dataIndex === 'age' ? 'number' : 'text',
                        dataIndex: col.dataIndex,
                        title: col.title,
                        editing: this.isEditing(record),
                        all: '全部都是来自于onCell',
                        data: fathers
                    })
                },
            };
        });

        return (
            <EditableContext.Provider value={this.props.form}>
                <>
                    <Button style={{marginBottom: '10px'}} type={'primary'} onClick={this.props.addRow}>添加一行</Button>
                    <Table
                        components={components}
                        bordered
                        dataSource={this.props.data}
                        columns={columns}
                        rowClassName="editable-row"
                        pagination={{
                            onChange: this.cancel,
                        }}
                    />
                </>
            </EditableContext.Provider>
        );
    }
}

export default Form.create()(EditableTable);

