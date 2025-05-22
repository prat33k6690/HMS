import React from 'react'
import WelcomeWidget from '../../component/ui/Widget/WelcomeCard'
import { Card } from 'react-bootstrap'
import GroupChart1 from '../../component/ui/Widget/GroupCharts'

function Dashboard() {
  return (
<div className="container-fluid">
  <div className="row g-3 mb-4">
    <div className="col-12 col-lg-4 col-xxl-3">
      <WelcomeWidget />
    </div>
    <div className="col-12 col-lg-8 col-xxl-9">
      <div className="card p-3">
        <div className="row g-3">
          <GroupChart1 />
        </div>
      </div>
    </div>
  </div>
</div>

  )
}

export default Dashboard
