import React from 'react'
import { Card, Col, Nav, Row, Tab, Tabs } from 'react-bootstrap';
import ChangePass from './Change Password/ChangePass';
import Profile from './Profile/Profile';

function Setting() {
  return (
    <Card className='p-2'>
      <div>
        <Tabs
          defaultActiveKey="profile"
          id="uncontrolled-tab-example"
          className="mb-3"
        // onSelect={(tab: any) => setactiveTab(tab)}
        >
          <Tab eventKey="profile" title="Profile">
            {/* {activeTab === "mail" &&
                                <Suspense><Mail /></Suspense>
                            } */}
            <Profile />
          </Tab>
          <Tab eventKey="ChangePass" title="Change Password">
            {/* {activeTab === "mail" &&
                                <Suspense><Mail /></Suspense>
                            } */}
            <ChangePass />
          </Tab>
        </Tabs>
      </div>
    </Card>
  );
}

export default Setting
