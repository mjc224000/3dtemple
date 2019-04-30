import React, {Component} from 'react';
import {
    Table, Input, InputNumber, Popconfirm, Form, Button
} from 'antd';

const FormItem = Form.Item;
const EditableContext = React.createContext();

export class EditableCell extends React.Component {
    getInput = () => {
        if (this.props.inputType === 'number') {
            return <InputNumber/>;
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
            index,
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
                                            required: true,
                                            message: `Please Input ${title}!`,
                                        }],
                                        initialValue: record[dataIndex],
                                    })(this.getInput())}
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

        this.state = {  editingKey: ''};
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
                            onClick={() => this.save(form, record.key)}
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

    save=(form, key)=> {
        form.validateFields((error, row) => {
            console.log(row, key, error, 'form 的row')
            if (error) {
                return;
            }
            const newData = [...this.props.data];
            const index = newData.findIndex(item => key === item.uid);

             if (index > -1) {
                  const item = newData[index];
                 console.log(item,row,'找到的item');
                 newData.splice(index, 1, {
                      ...item,
                      ...row,
                  });
                 this.setState({editingKey: ''});
                 this.props.handleUpdate(newData);
              } else {

              }
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
                        all: '全部都是来自于onCell'
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

