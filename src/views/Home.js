import { useState, useEffect } from 'react'
import { Edit, Edit2, Send, Trash2, Unlock } from 'react-feather'
import { Card, CardHeader, CardBody, CardTitle, CardText, CardLink, Table, Modal, ModalHeader, ModalBody, Button } from 'reactstrap'
import { NavLink, useParams } from 'react-router-dom'
import apiRoot from '../redux/apiRoot/apiRoot'
import './views.scss'
import Modals from './Modals/Modals'
import jwt_decode from "jwt-decode"
import IconFile from '../assets/images/icons/Group 16.png'
import { useTranslation } from "react-i18next"
import axios from 'axios'
const Home = () => {
  const { t } = useTranslation()
  const token = localStorage.getItem("access_token")
  const [selectedFile, setSelectedFile] = useState(null)
  const [id, setId] = useState()
  const [patient, setPatient] = useState()
  const [dalete, setDalete] = useState()
  const [open, setOpen] = useState(false)
  const [clientId, setClientId] = useState(false)
  const [user, setUser] = useState()
  const [info, setInfo] = useState()
  const GetPatient = () => {
    apiRoot.get(`api/v1/user/all/client?size=20&page=0`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }).then(res => {
        setPatient(res?.data)
        console.log(res?.data, "ttt")
      }).catch(err => {
        console.log(err, "error")
      })

  }
  const GetInformationUser = () => {
    apiRoot.get(`api/v1/files/user/4`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }).then(res => {
        setInfo(res?.data)
        console.log(res?.data, "file")
      }).catch(err => {
        console.log(err, "error")
      })
  }
  console.log(user, "open")
  const DaleteAll = () => {
    apiRoot.delete(`api/v1/user/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
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
    GetInformationUser()
  }, [open])

  
  // const toggleSidebar = () => setSidebarOpen(!sidebarOpen)
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>{t('patient')}</CardTitle>
        </CardHeader>
        <Table bordered>
          <thead>
            <tr>
              <th>№</th>
              <th>{t('firstname')}</th>
              <th>{t('lastname')}</th>
              <th>{t('phonenumber')}</th>
              <th>User Role</th>
              <th className='th_table'></th>
            </tr>
          </thead>
          <tbody>
            {patient?.content?.map((item, index) => (
              <tr key={index} onClick={() => { setClientId(true); setUser(item?.id) }} className="table_list">
                <th scope="row">{++index}</th>
                <td>{item?.firstName}</td>
                <td>{item?.lastName}</td>
                <td>{item?.phoneNumber}</td>
                <td>{item?.userRole === "CLIENT" ? "Bemor" : null}</td>
                <td className='icons_table'>
                  <NavLink to={`/send/${item?.id}`} >
                    <Send size={14} color={'#7367f0'} />
                  </NavLink>
                  <div className='icons'>
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
      {/* onClick={() => { setOpen(true); setId(item?.id) }} */}
      {open && <Modals set={setOpen} height={350} maxWidth={500}>
        <div className="delete_blog">
          <div className="delete_title">
            <h4>{t('patient_dalate')}</h4>
          </div>
          <div className="delete_text">
            <p>
              {t('patient_about_dal')}
            </p>
          </div>
          <div className="delete_btn">
            <button className='okey' onClick={() => DaleteAll()}>{t('dalete')}</button>
            <button className='del' onClick={() => setOpen(false)}>{t('back_to')}</button>
          </div>
        </div>
      </Modals>
      }
      {clientId && <Modals set={setClientId} height={339} maxWidth={633}>
        <div className="user_blog">
          <div className="user_title">
            <h4>Бемор информацияси</h4>
          </div>
          {info?.map((item, index) => (
            <div className="userId_text" key={index}>
              <div className='information'>
                <p>ФИО</p>
                <span>{item?.user?.firstName} {item?.user?.lastName}</span>
              </div>
              <div className='information'>
                <p>Телефон ракам</p>
                <span>+{item?.user?.phoneNumber}</span>
              </div>
              <div className='information'>
                <p>Файл</p>
                <a className='file d-flex' href={`http://192.168.100.225:8082/api/v1/files/upload?id=${item?.user?.id}`}>
                  <div className='file_image'>
                      <img src={IconFile} alt=""/>
                  </div>
                  <div className='file_text d-block'>
                      <h6>
                        {item?.fileName}
                      </h6>
                      <p>
                          {item?.createdDate?.slice(0, -16)}
                      </p>
                  </div>
                </a>
              </div>
            </div>
          ))[0]

          }
        </div>
      </Modals>
      }
    </div>
  )
}

export default Home
