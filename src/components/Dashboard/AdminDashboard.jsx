import React from 'react'
import Header from '../other/Header'
import CreateTask from '../other/CreateTask'
import AllTask from '../other/AllTask'
import Footer from '../other/Footer'

const AdminDashboard = (props) => {
    return (
        <div className="scrollbar-hide overflow-y-auto w-full h-full bg-black bg-gradient-to-br from-black via-gray-900 to-black p-6">
    <Header changeUser={props.changeUser} data={props.data} />
    <main>
    <CreateTask />
    <AllTask />
    </main>
    <Footer/>
</div>
    )
}

export default AdminDashboard