import React from 'react'
import WelcomeWidget from '../../component/ui/Widget/WelcomeCard'
import { Card } from 'react-bootstrap'

function Dashboard() {
  return (
    <div className="grid grid-cols-12 gap-5 mb-5">
      <div className="2xl:col-span-3 lg:col-span-4 col-span-12">
        <WelcomeWidget />
      </div>
      <div className="2xl:col-span-9 lg:col-span-8 col-span-12">
        <Card className="p-4">
          <div className="grid md:grid-cols-3 col-span-1 gap-4">
            {/* <GroupChart1 /> */}
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard
