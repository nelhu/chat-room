import React from 'react';
import { connect } from 'dva';
import { namespace } from '../../const';
import layout from '../../HOC/layout';
import Head from '../../component/Head';
import { List,Avatar, Modal, Button, Input, message, Select } from 'antd';
import groupIcon from '../../assets/group-black.png'
import userIcon from '../../assets/user-avatar.png'
import * as Utils from '../../utils';
import { TEXT_MAP } from '../../utils';

const ListItem = ({name, desc, isActive, icon}) => {
  return (
    <div className={`list-item ${isActive ? 'is-active' : ''}`}>
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
    }
  }

  componentDidMount() {
    this.props.dispatch({
      type: `${namespace}/save`
    });
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
    current_groups = Utils.getGroupsByUser(currentUser, this.props.chatroom);
    if (current_groups) {
      current_users =  Utils.getUsersByGroupId(current_groups[current_group_index].id, this.props.chatroom);
    }
    const currentSelectedUser = current_users[current_user_index];

    return (
      <div className="chatroom">
      <Head content="聊天室">
        <Button type="primary" ghost onClick={this.toggleAdd}>切换</Button>
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
                />
              )
            })
          }
        </div>
        <div className="chatroom-content-room">room</div>
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
                  <div>{currentUser[key]}</div>
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
