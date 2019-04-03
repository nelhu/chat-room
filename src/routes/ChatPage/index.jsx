import React from 'react';
import { connect } from 'dva';
import { namespace } from '../../const';
import layout from '../../HOC/layout';
import Head from '../../component/Head';
import { List,Avatar, Modal, Button, Input, message, Select, Menu, Dropdown, Icon } from 'antd';
import groupIcon from '../../assets/group-black.png'
import userIcon from '../../assets/user-avatar.png'
import * as Utils from '../../utils';
import { TEXT_MAP } from '../../utils';
import moment from 'moment';

const TextArea = Input.TextArea;

const ListItem = ({name, desc, isActive, icon, onClick}) => {
  return (
    <div
      className={`list-item ${isActive ? 'is-active' : ''}`}
      onClick={onClick}
    >
    <div className="list-item-icon">
      <img src={icon} alt=""/>
    </div>
    <div className="list-item-content">
      <span className="list-item-content-name">{name}</span>
      <span className="list-item-content-desc">{desc}</span>
    </div>
  </div>
  )
}

class ChatPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current_user_index: 0,
      msg: null,
    }
    this.areaRef = React.createRef();
  }

  componentDidMount() {
    this.props.dispatch({
      type: `${namespace}/save`
    });
  }

  handleSelectUser = (index) => {
    this.setState({
      current_user_index: index,
    });
  }

  handleSelectGroup = (index) => {
    this.props.dispatch({
      type: `${namespace}/changeGroup`,
      index,
    }); 
  }

  handleUserChange = (user) => {
    this.props.dispatch({
      type: `${namespace}/changeCurrentUser`,
      user,
    }); 
  }

  handleSendMessage = (e, user, group) => {
    if (!e.target.value) {
      message.error('请输入信息!'); 
    }
    this.props.dispatch({
      type: `${namespace}/sendMsg`,
      user,
      group,
      text: e.target.value,
    });
    this.setState({
      msg: null,
    })
  }

  handleMsgChange = (e) => {
    this.setState({
      msg: e.target.value,
    })
  }

  renderUserMenu = (users) => {
    return (
      <Menu>
        {
          users.map((user, index) => (
            <Menu.Item
              key={index}
            >
              <a onClick={() => this.handleUserChange(user)}>{user.name}</a>
            </Menu.Item>
          ))
        }
      </Menu>
    )
  }

  manualSend = (user, group) => {
    if (this.areaRef) {
      const e = {
        target: {
          value: this.areaRef.current.props.value,
        }
      };
      this.areaRef.current.props.onPressEnter(e, user, group);
    }
    
  }

  render() {
    const {
      groups,
      users,
      currentUser,
      session: {
        current_group_index,
      }
    } = this.props.chatroom;
    const { current_user_index } = this.state;

    let current_groups = [];
    let current_users = [];
    let current_group = {};
    current_groups = Utils.getGroupsByUser(currentUser, this.props.chatroom);
    if (current_groups.length > 0) {
      current_group = current_groups[current_group_index || 0];
      current_users =  Utils.getUsersByGroupId(current_group.id, this.props.chatroom);
    }
    const currentSelectedUser = current_users[current_user_index];
    

    return (
      <div className="chatroom">
      <Head content="聊天室">
        <Dropdown overlay={this.renderUserMenu(this.props.chatroom.users)}>
          <a
            className="ant-dropdown-link"
            href="#1"
          >
            {currentUser.name}&nbsp;
            <Icon type="down" />
          </a>
        </Dropdown>
      </Head>
      <div className="page-content chatroom-content">
        <div className="chatroom-content-group">
          {
            current_groups && current_groups.map((group, index) => {
              return (
                <ListItem 
                  key={index}
                  name={group.name}
                  desc={group.desc}
                  icon={groupIcon}
                  isActive={index === current_group_index}
                  onClick={() => this.handleSelectGroup(index)}
                />
              )
            })
          }
        </div>
        <div className="chatroom-content-room">
          <div className="chatroom-content-room-head">
            {current_group.name}
          </div>
          <div className="chatroom-content-room-body">
            {current_group && current_group.message.map((message, index) => {
              // const last = index === current_group.message.length - 1;
              const isMine = (message.user.id === currentUser.id);
              return (
                <p className={`chatroom-content-room-body-message ${ isMine  ? 'is-right' : ''}`} key={index}>
                  <span className="chatroom-content-room-body-message-content">
                    {message.text}
                    {
                      !isMine && (
                        <span className="chatroom-content-room-body-message-content-tag">
                          {message.user.name}&nbsp;{moment(message.timestamp).format('HH:mm')}
                        </span>
                      )
                    }
                  </span>
                </p>
              )
            })}
          </div>
          <div className="chatroom-content-room-footer">
            <TextArea
              ref={this.areaRef} 
              rows={7}
              placeholder="回车键发送"
              className="chatroom-content-room-footer-textarea"
              onPressEnter={(e) => this.handleSendMessage(e, currentUser, current_group)}
              onChange={this.handleMsgChange}
              value={this.state.msg}
            />
            <p className="chatroom-content-room-footer-bar">
              <Button type="primary" className="btn-red" size="small" onClick={() => this.manualSend(currentUser, current_group)}>发送</Button>
            </p>
          </div>
        </div>
        <div className="chatroom-content-user">
          <div className="chatroom-content-user-list">
            {
              current_users && current_users.map((user, index) => {
                return (
                  <ListItem
                    key={index}
                    name={user.name}
                    desc={user.major}
                    icon={userIcon}
                    isActive={index === current_user_index}
                    onClick={() => this.handleSelectUser(index)}
                  />
                )
              })
            }
          </div>
          <div className="chatroom-content-user-detail">
            <List
              dataSource={Object.keys(currentSelectedUser)}
              renderItem={(key, index) => (
                <List.Item key={index}>
                  <List.Item.Meta title={TEXT_MAP(key)} />
                  <div>{currentSelectedUser[key]}</div>
                </List.Item>
              )}
              >
            </List>
          </div>
        </div>
      </div>
      </div>
    )
  }
}

ChatPage.propTypes = {

};

const WrappedPage = layout(ChatPage);
export default connect(state => state)(WrappedPage);
