export const TEXT_MAP = (key) => {
  const map = {
    id: '学号',
    name: '姓名',
    age: '年龄',
    nickname: '昵称',
    major: '专业',
    class: '班级',
    tel: '电话',
    groups: '群组号'
  };
  return map[key] || '';
};

export const getUsersByGroupId = (groupId, current) => {
  let userIds = [];
  let members = [];
  if (groupId) {
    const currentGroup = current.groups.find(item => item.id === groupId) || {};
    userIds = currentGroup.users;
    
  }
  if (userIds) {
    members = userIds.map(id => {
      const user = current.users.find(item => item.id === id);
      return user;
    });
  }
  return members.filter(member => !!member);
};


export const getGroupsByUser = (user, current) => {
  let group_id_map = {};
  const groupIds = user.groups;
  groupIds.forEach(id => {
    group_id_map[id] = true;
  });
  return current.groups.filter(group => group_id_map[group.id]);
}