export const namespace = 'chatroom';

export const users = [
  {
    id: 1,
    name: '张五',
    age: '23',
    nickname: '小五',
    major: '计算机科学与技术',
    class: '5班',
    tel: '11012340000',
    groups: [1, 2],
  },
  {
    id: 2,
    name: '李三',
    age: '22',
    nickname: '小李',
    major: '软件工程',
    class: '6班',
    tel: '12012340000',
    groups: [1, 2],
  },
];


export const groups = [
  {
    id: 1,
    name: '篮球俱乐部',
    desc: '篮球爱好者的组织， 每周定期有篮球比赛，周一到周五不定时会有比赛，快来啊加入我们吧！',
    users: [1, 2],
    message: [],
  },
  {
    id: 2,
    name: '羽毛球爱好者',
    desc: '羽毛球爱好者的福音， 我们会定期组织各项其他活动，成员来自很多学院，每周定期有比赛，周一到周五不定时会有比赛，快来啊加入我们吧， 等你加入！',
    users: [2],
    message: [],
  },
];