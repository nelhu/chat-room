import React from 'react';
import { connect } from 'dva';
import layout from '../../HOC/layout';
import Head from '../../component/Head';
import { List,Avatar, Modal, Button, Input, message } from 'antd';
import icon from '../../assets/user-avatar.png'
import { namespace } from '../../const';

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showEdit: false,
      showAdd: false,
      user: {},
      newName: '',
    }
    this.nameRef = React.createRef();
    this.majorRef = React.createRef();
    this.telRef = React.createRef();
  }

  componentDidMount() {

  }

  toggleAdd = () => {
    this.setState({
      showAdd: !this.state.showAdd,
    })
  }

  completeAdd = () => {
    let name, major, tel;
    name = this.nameRef.current.input.value;
    major = this.majorRef.current.input.value;
    tel = this.telRef.current.input.value;
    if (!name) {
      message.error('请输入用户名称!');
      return ;
    }
    this.props.dispatch({
      type: `${namespace}/addUser`,
      user: {
        name,
        major,
        tel,
      }
    });
    this.toggleAdd();
  }

  toggleEdit = (user) => {
    this.storeGroup(user);
    this.setState({
      showEdit: !this.state.showEdit,
    })
  }
  
  handleNameChange = (e) => {
    this.setState({
      newName: e.target.value,
    })
  }

  storeGroup = (user) => {
    if (user) {
      this.setState({
        user,
      });
    }
  }

  completeEdit = () => {
    const newName = this.state.newName;
    if (!newName) {
      message.error('请输入新名称!');
      return ;
    }
    this.props.dispatch({
      type: `${namespace}/editUser`,
      user: {
        ...this.state.user,
        name: newName,
      }
    });
    this.toggleEdit();
  }
  
  toggleDelete = (user) => {
    this.storeGroup(user);
    this.showDeleteModal(user);
  }

  showDeleteModal = (user) => {
    Modal.confirm({
      title: '确认删除以下用户?',
      content: `用户名：${user.name}`,
      okText: '确定',
      okType: 'danger',
      cancelText: '再想想',
      onOk: () => {
        this.props.dispatch({
          type: `${namespace}/deleteUser`,
          user,
        })
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  render() {
    const { showDelete, showEdit, user, showAdd } = this.state;

    return (
      <div className="group">
        <Head content="用户">
          <Button type="primary" ghost onClick={this.toggleAdd}>新增</Button>
        </Head>
        <div className="page-content group-list">
          <List
          dataSource={this.props.chatroom && this.props.chatroom.users}
          renderItem={user => (
            <List.Item actions={
              [
                <a className="edit" href="#1" onClick={() => this.toggleEdit(user)}>编辑</a>,
                <a className="delete" href="#1" onClick={() => this.toggleDelete(user)}>删除</a>,
              ]
            }>
              <List.Item.Meta
                avatar={<Avatar src={icon} />}
                title={user.name}
                description={user.major}
              />
              </List.Item>
            )}
          />
        </div>
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
                placeholder={user.name}
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
                  placeholder="请输入姓名"
                  ref={this.nameRef}
                />
              </div>
              <div className="input-item">
                <Input
                  placeholder="请输入专业"
                  ref={this.majorRef}
                />
              </div>
              <div className="input-item">
                <Input
                  placeholder="请输入电话号码"
                  ref={this.telRef}
                />
              </div>
            </Modal>
          )
        }
      </div>
    )
  }
}
User.propTypes = {
};

const WrappedPage = layout(User);
export default connect(state => state)(WrappedPage);
