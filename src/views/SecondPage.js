import { useEffect, useState } from 'react'
import { Edit, Plus, Send, Trash2, Unlock } from 'react-feather'
import { NavLink } from 'react-router-dom'
import { Card, CardHeader, CardBody, CardTitle, CardText, CardLink, Table, Button } from 'reactstrap'
import apiRoot from '../redux/apiRoot/apiRoot'
import Modals from './Modals/Modals'
import './views.scss'
import jwt_decode from "jwt-decode"
const SecondPage = () => {
  const token = localStorage.getItem("token")
  const decoded = jwt_decode(token)
  const [doctor, setDoctor] = useState()
  const [open, setOpen] = useState(false)
  const [dalete, setDalete] = useState()
  const GetDoctor = () => {
    apiRoot.get(`api/v1/user/onlyDoctors`).then(res => {
      setDoctor(res?.data)
      console.log(res?.data)
    }).catch(err => {
      console.log(err, "error")
    })
  }
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
    GetDoctor()
    DaleteAll()
  }, [])
  console.log(doctor, "doctor")
  return (
    <Card>
      <CardHeader>
        <CardTitle>Shifokorlar</CardTitle>
        <Button color='primary'><Plus size={16} className='' /> Qo'shish</Button>
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
          {doctor?.map((item, index) => (
            <tr key={index}>
              <th scope="row">{++index}</th>
              <td>{item?.firstName}</td>
              <td>{item?.lastName}</td>
              <td>{item?.phoneNumber}</td>
              <td>{item?.role}</td>
              <td className='icons_table'>
                <NavLink to={`/doctoredit/${item?.id}`} >
                  <Edit size={14} />
                </NavLink>
                <NavLink to={`/passwordpage/${item?.id}`} >
                  <Unlock size={14} />
                </NavLink>
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
    </Card>
  )
}

export default SecondPage
