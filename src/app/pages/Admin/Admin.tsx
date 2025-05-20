import React from 'react'
import { Card, Tab, Tabs } from 'react-bootstrap'
import Client from './Client/Client'
import UserMaster from './User Master/User'
import IpWhiteList from './IPWhiteList/IpWhiteList'
import Recharge from './Recharge/Recharge'

function Admin() {
    return (
        <>
            <Card className='p-2'>
                <div>
                    <Tabs
                        defaultActiveKey="clintManager"
                        id="uncontrolled-tab-example"
                        className="mb-3"
                    // onSelect={(tab: any) => setactiveTab(tab)}
                    >
                        <Tab eventKey="clintManager" title="Clint Manager">
                            {/* {activeTab === "mail" &&
                                <Suspense><Mail /></Suspense>
                            } */}
                            <Client/>
                        </Tab>
                        <Tab eventKey="userManager" title="User Manager">
                            {/* {activeTab === "bulk" &&
                                <Suspense><Bulk/></Suspense>
                                } */}
                                <UserMaster/>
                        </Tab>
                         <Tab eventKey="iPwhiteList" title="IP white List">
                            {/* {activeTab === "bulk" &&
                                <Suspense><Bulk/></Suspense>
                                } */}
                                <IpWhiteList/>
                        </Tab>
                         <Tab eventKey="recharge" title="Recharge">
                            {/* {activeTab === "bulk" &&
                                <Suspense><Bulk/></Suspense>
                                } */}
                                <Recharge/>
                        </Tab>
                    </Tabs>
                </div>
            </Card>
        </>
    )
}

export default Admin
