import React, { useState } from 'react'
import WelcomeWidget from '../../component/ui/Widget/WelcomeCard'
import GroupChart1 from '../../component/ui/Widget/GroupCharts'
import EarningChart from '../../component/ui/Widget/EarningChart'

function Dashboard() {
  return (
    <div className="container-fluid">
      <div className="row g-3 mb-4">
        <div className="col-12 col-lg-4 col-xxl-3">
          <WelcomeWidget />
        </div>
        <div className="col-12 col-lg-8 col-xxl-9">
          <div className="card p-3 border-none">
            <div className="row g-3">
              <GroupChart1 />
            </div>
          </div>
        </div>
      </div>
      <div className="row g-3 mb-4">
        <div title="Statistic">
          <div className="col-12 col-lg-12 col-xxl-8">
            <EarningChart />
          </div>
        </div>
        <div className="col-12 col-lg-12 col-xxl-8">


        </div>
      </div>

    </div>
  )
}

export default Dashboard
