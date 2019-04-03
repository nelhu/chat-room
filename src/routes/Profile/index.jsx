import React from 'react';
import { connect } from 'dva';
import layout from '../../HOC/layout';
import Head from '../../component/Head';
import { List } from 'antd';
import 'antd/dist/antd.css';
import { namespace } from '../../const';
import { TEXT_MAP } from '../../utils';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
  }

  render() {
    const { currentUser } = this.props;
    const info = Object.keys(currentUser);

    return (
      <div className="profile">
        <Head content="个人资料"></Head>
        <div className="page-content">
          <List
            dataSource={info}
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
    )
  }
}
Profile.propTypes = {
};

const WrappedPage = layout(Profile);
export default connect(state => {
  return {
    currentUser: state[namespace].currentUser,
  }
})(WrappedPage);
