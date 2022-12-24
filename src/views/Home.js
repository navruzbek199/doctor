import { useState, useEffect } from 'react'
import { Card, CardHeader, CardBody, CardTitle, CardText, CardLink } from 'reactstrap'
import apiRoot from '../redux/apiRoot/apiRoot'
import SidebarNewUsers from './Sidebar'
const Home = () => {
  const [patient, setPatient] = useState()
  const [sidebarOpen, setSidebarOpen] = useState(false) 
  const GetPatient = () => {
    apiRoot.get(`api/v1/user/the/patient`).then(res => {
      setPatient(res?.data)
      console.log(res?.data)
    }).catch(err => {
      console.log(err, "error")
    })
  }
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  useEffect(() => {
    GetPatient()
  }, [])
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Foydalanuvchilar</CardTitle>
        </CardHeader>
        <CardBody>
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <SidebarNewUsers open={sidebarOpen} toggleSidebar={toggleSidebar} />
        </CardBody>
      </Card>
    </div>
  )
}

export default Home
