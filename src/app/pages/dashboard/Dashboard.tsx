import React, { useState } from 'react'
import WelcomeWidget from '../../component/ui/Widget/WelcomeCard'
import GroupChart1 from '../../component/ui/Widget/GroupCharts'
import EarningChart from '../../component/ui/Widget/EarningChart'
import CalendarWithNotes from '../../component/ui/Widget/Calendar'
import DashboardTable from '../../component/ui/Widget/DashboardTable'

function Dashboard() {
  return (
    <div className="container-fluid">
      <div className="row g-3 mb-4">
        <div className="col-12 col-lg-4 col-xxl-3">
          <WelcomeWidget />
        </div>
        <div className="col-12 col-lg-8 col-xxl-9">
          <div className="card p-3 border-0">
            <div className="row g-3">
              <GroupChart1 />
            </div>
          </div>
        </div>
      </div>
      <div className="row g-3 mb-4 d-flex">
        <div className="col-12 col-lg-6 col-xxl-8">
          <EarningChart />
        </div>
        <div className="col-12 col-lg-4 col-xxl-4">
          <CalendarWithNotes />
        </div>
      </div>
      <div className="row g-3 mb-4 d-flex">
        <div className="col-12 col-lg-8 col-xxl-8">
          <DashboardTable />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
