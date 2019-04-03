import React from 'react';
import { connect } from 'dva';
import layout from '../../HOC/layout';
import Head from '../../component/Head';
import { List,Avatar, Modal, Button, Input, message, Select } from 'antd';
import icon from '../../assets/group-black.png'
import { namespace } from '../../const';
import * as Utils from '../../utils';

const Option = Select.Option;

class Group extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showEdit: false,
      showAdd: false,
      showUsers: false,
      group: {},
      newName: '',
      joinedUser: [],
    }
    this.nameRef = React.createRef();
    this.descRef = React.createRef();
  }

  componentDidMount() {

  }

  toggleUser = (group) => {
    this.storeGroup(group);
    this.setState({
      showUsers: !this.state.showUsers,
    })
  }
  toggleAdd = () => {
    this.setState({
      showAdd: !this.state.showAdd,
    })
  }

  completeAdd = () => {
    let name, desc;
    name = this.nameRef.current.input.value;
    desc = this.descRef.current.input.value;
    const { joinedUser } = this.state;
    if (!name) {
      message.error('请输入新名称!');
      return ;
    }
    this.props.dispatch({
      type: `${namespace}/bindGroupUser`,
      group: {
        name,
        desc,
        users: joinedUser,
      }
    });
    this.toggleAdd();
  }

  toggleEdit = (group) => {
    this.storeGroup(group);
    this.setState({
      showEdit: !this.state.showEdit,
    })
  }
  
  handleNameChange = (e) => {
    this.setState({
      newName: e.target.value,
    })
  }

  storeGroup = (group) => {
    if (group) {
      this.setState({
        group,
      });
    }
  }

  completeEdit = () => {
    const { newName } = this.state;
    if (!newName) {
      message.error('请输入新名称!');
      return ;
    }
    this.props.dispatch({
      type: `${namespace}/editGroup`,
      group: {
        ...this.state.group,
        name: newName,
      }
    });
    this.toggleEdit();
  }
  
  toggleDelete = (group) => {
    this.storeGroup(group);
    this.showDeleteModal(group);
  }

  showDeleteModal = (group) => {
    Modal.confirm({
      title: '确认删除以下分组?',
      content: `分组名：${group.name}`,
      okText: '确定',
      okType: 'danger',
      cancelText: '再想想',
      onOk: () => {
        this.props.dispatch({
          type: `${namespace}/deleteGroup`,
          group,
        })
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  handleUserChange = (value, options) => {
    if (options) {
      this.setState({
        joinedUser: options.map(item => item.props.value),
      })
    }
  }

  render() {
    const { showDelete, showEdit, group, showAdd, showUsers } = this.state;
    
    return (
      <div className="group">
        <Head content="群组">
          <Button type="primary" ghost onClick={this.toggleAdd}>新增</Button>
        </Head>
        <div className="page-content group-list">
          <List
          dataSource={this.props.chatroom && this.props.chatroom.groups}
          renderItem={group => (
            <List.Item 
              actions={
                [
                  <a className="edit" href="#1" onClick={() => this.toggleEdit(group)}>编辑</a>,
                  <a className="delete" href="#1" onClick={() => this.toggleDelete(group)}>删除</a>,
                ]
              }
            >
              <List.Item.Meta
                avatar={<Avatar src={icon} />}
                title={<span className="underline" onClick={() => this.toggleUser(group)}>{group.name}</span>}
                description={group.desc}
              />
              </List.Item>
            )}
          />
        </div>
        {
          showUsers && (
            <Modal
              title="成员"
              visible={showUsers}
              onCancel={this.toggleUser}
              footer={null}
            >
              {
               Utils.getUsersByGroupId(group.id, this.props.chatroom).map((user, index) => {
                 return <p key={index}>{user.name}</p>
               }) 
              }
            </Modal>
          )
        }
        {
          showEdit && (
            <Modal
              title="编辑"
              visible={showEdit}
              cancelText="取消"
              okText="确定"
              onOk={this.completeEdit}
              onCancel={this.toggleEdit}
            >
              <Input 
                placeholder={group.name}
                onChange={this.handleNameChange}
              />
            </Modal>
          )
        }
        {
          showAdd && (
            <Modal
              title="新增"
              visible={showAdd}
              cancelText="取消"
              okText="确定"
              onOk={this.completeAdd}
              onCancel={this.toggleAdd}
            >
              <div className="input-item">
                <Input
                  placeholder="请输入分组名称"
                  ref={this.nameRef}
                />
              </div>
              <div className="input-item">
                <Input
                  placeholder="请输入分组描述"
                  ref={this.descRef}
                />
              </div>
              <div className="input-item">
                <Select
                  style={{ width: '100%' }}
                  placeholder={'组内成员'}
                  mode="multiple"
                  onChange={this.handleUserChange}
                >
                  {
                    this.props.chatroom && this.props.chatroom.users.map((user, index) => {
                      return <Option key={index} value={user.id}>{user.name}</Option>
                    })
                  }
                </Select>
              </div>
            </Modal>
          )
        }
      </div>
    )
  }
}
Group.propTypes = {
};

const WrappedPage = layout(Group);
export default connect(state => state)(WrappedPage);
