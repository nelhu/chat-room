import React from 'react';
import ErrorBoundary from '../container/ErrorBoundary';
import Navs from '../component/Navs';

const layout = (Component) => {

 const Layout = (props) => {

   return (
     <div className="layout">
        <div className="menu">
          <Navs/>
        </div>
        <div className="body">
          <ErrorBoundary>
            <Component {...props}/>
          </ErrorBoundary>
        </div>
     </div>
   );
 };

 return Layout;
};

export default layout;