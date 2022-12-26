import { useState, useEffect } from 'react'
import { Edit, Edit2, Send, Trash2, Unlock } from 'react-feather'
import { Card, CardHeader, CardBody, CardTitle, CardText, CardLink, Table, Modal, ModalHeader, ModalBody, Button } from 'reactstrap'
import { NavLink, useParams } from 'react-router-dom'
import apiRoot from '../redux/apiRoot/apiRoot'
import './views.scss'
import Modals from './Modals/Modals'
import jwt_decode from "jwt-decode"
// import SidebarNewUsers from './Sidebar'
const Home = () => {
  const token = localStorage.getItem("token")
  const decoded = jwt_decode(token)
  // const param = useParams()
  console.log(decoded, "user token")
  const [patient, setPatient] = useState()
  const [dalete, setDalete] = useState()
  // const [sidebarOpen, setSidebarOpen] = useState(false)
  const [open, setOpen] = useState(false)
  const GetPatient = () => {
    apiRoot.get(`api/v1/user/the/patient`).then(res => {
      setPatient(res?.data)
      console.log(res?.data)
    }).catch(err => {
      console.log(err, "error")
    })
  }
  
  console.log(open, "open")
  const DaleteAll = () => {
    apiRoot.delete(`api/v1/user/delete/${decoded?.id}`,
    {
      headers: {
        // "Authorization": `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
    ).then(res => {
      setDalete(res?.data)
      console.log(res?.data)
    }).catch(err => {
      console.log(err, "error")
    })
  }
  useEffect(() => {
    GetPatient()
    DaleteAll()
  }, [])
  // const toggleSidebar = () => setSidebarOpen(!sidebarOpen)
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Bemorlar</CardTitle>
        </CardHeader>
        <Table bordered>
          <thead>
            <tr>
              <th>№</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Phone Number</th>
              <th>User Role</th>
              <th className='th_table'></th>
            </tr>
          </thead>
          <tbody>
            {patient?.map((item, index) => (
              <tr key={index}>
                <th scope="row">{++index}</th>
                <td>{item?.firstName}</td>
                <td>{item?.lastName}</td>
                <td>{item?.phoneNumber}</td>
                <td>{item?.role}</td>
                <td className='icons_table'>
                  <NavLink to={`/send/${item?.id}`} >
                    <Send size={14} color={'#7367f0'} />
                  </NavLink>
                  <div className='icons' onClick={() => setOpen(true)}>
                    <Trash2 size={14} color='red' />
                  </div>
                </td>
              </tr>
            ))
            }
          </tbody>
        </Table>
      </Card>
      {/* <SidebarNewUsers open={sidebarOpen} toggleSidebar={toggleSidebar} />  */}
      {open && <Modals set={setOpen} height={350} maxWidth={500}>
        <div className="delete_blog">
          <div className="delete_title">
            <h4>Bemorni o'chirish</h4>
          </div>
          <div className="delete_text">
            <p>
              Bemorni haqiqatan o'chirmoqchimisz ?
            </p>
          </div>
          <div className="delete_btn">
            <button className='okey' onClick={() => DaleteAll()}>O'chirish</button>
            <button className='del' onClick={() => setOpen(false)}>Ortga</button>
          </div>
        </div>
      </Modals>
      }
    </div>
  )
}

export default Home
