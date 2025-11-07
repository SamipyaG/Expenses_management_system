import React from 'react'
import Layout from '../Component/Layout/Layout'

const HomePage = () => {
  return (
    <Layout>
        <div className="filters">
        <div>range filter</div>
        <div>
          <button className='btn btn-primary'>Add new</button>
        </div>
        </div>



        <div className="content"></div>
    </Layout>
  )
}

export default HomePage