import { users,groups, namespace } from '../const';

export default {
  namespace,
  state: {
    currentUser: users[0],
    groups,
    users,
    session: {
      current_group_index: 0,
    }
  },
  reducers: {
    addGroup(state, action) {
      const { group } = action;
      return {
        ...state,
        groups: state.groups.concat({
          id: (state.groups[state.groups.length - 1].id || 0) + 1,
          ...group,
          message: [],
        })
      };
    },
    editGroup(state, action) {
      const { group } = action;
      return {
        ...state,
        groups: state.groups.map(item => {
          if (item.id === group.id) {
            return group;
          }
          return item;
        }),
      };
    },
    deleteGroup(state, action) {
      const { group } = action;
      return {
        ...state,
        groups: state.groups.filter(item => item.id !== group.id),
      };
    },
    addUser(state, action) {
      const { user } = action;
      return {
        ...state,
        users: state.users.concat({
          id: (state.users[state.users.length - 1].id || 0) + 1,
          ...user,
          groups: [],
        })
      };
    },
    editUser(state, action) {
      const { user } = action;
      return {
        ...state,
        users: state.users.map(item => {
          if (item.id === user.id) {
            return user;
          }
          return item;
        }),
      };
    },
    deleteUser(state, action) {
      const { user } = action;
      return {
        ...state,
        users: state.users.filter(item => item.id !== user.id),
      };
    },
    bindUserWithGroup(state, action) {
      const { users: newUsers, group } = action;
      let new_user_map = {};
      newUsers.forEach(item => {
        new_user_map[item] = true;
      });
      return {
        ...state,
        users: state.users.map(user => {
          if (new_user_map[user.id]) {
            user.groups.push(group.id);
            return user;
          }
          return user;
        })
      };
    },
    sendMsg(state, action) {
      const { user, group, text } = action;
      const lastMessage = group.message[group.message.length - 1];
      const id = (lastMessage && lastMessage.id + 1) || 0;
      let message = {
        id,
        text,
        user,
        timestamp: Date.now(),
      };
      return {
        ...state,
        groups: state.groups.map(_group => {
          if (_group.id === group.id) {
            _group.message.push(message);
            return _group
          }
          return _group;
        })
      }
    },
    changeGroup(state, action) {
     const { index } = action; 
     return {
       ...state,
       session: {
        current_group_index: index,
       }
     }
    },
    changeCurrentUser(state, action) {
     const { user } = action; 
     return {
       ...state,
       currentUser: user,
     }
    },
    
  },
  effects: {
    *bindGroupUser(action, { call, put, select }) {
      yield put({
        type: 'addGroup',
        group: action.group,
      });
      const groups = yield select(state => state.chatroom.groups);
      yield put({
        type: 'bindUserWithGroup',
        users: action.group.users,
        group: groups[groups.length - 1],
      })
    },
  },
};
