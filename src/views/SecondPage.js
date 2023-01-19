import { useEffect, useState } from 'react'
import { Edit, Plus, Send, Trash2, Unlock } from 'react-feather'
import { NavLink } from 'react-router-dom'
import { Card, CardHeader, CardBody, CardTitle, CardText, CardLink, Table, Button} from 'reactstrap'
import apiRoot from '../redux/apiRoot/apiRoot'
import Modals from './Modals/Modals'
import './views.scss'
import { useTranslation } from "react-i18next"
import Paginations from './DoctorPage/Paginations'
const SecondPage = () => {
  const { t } = useTranslation()
  const token = localStorage.getItem("access_token")
  const [doctor, setDoctor] = useState([])
  const [open, setOpen] = useState(false)
  const [id, setId] = useState()
  const [dalete, setDalete] = useState()
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(10)

  const GetDoctor = () => {
    apiRoot.get(`api/v1/user/all?size=20&page=0`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }).then(res => {
        setDoctor(res?.data)
        console.log(res?.data, "doctorla")
      }).catch(err => {
        console.log(err, "error")
      })
  }

  const DaleteAll = () => {
    apiRoot.delete(`api/v1/user/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    ).then(res => {
      console.log(res?.data)
      setOpen(false)
    }).catch(err => {
      console.log(err, "error")
    })
  }
  
  useEffect(() => {
    GetDoctor()
    DaleteAll()
  }, [true])
  // №
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = doctor?.content?.slice(indexOfFirstPost, indexOfLastPost)
  const paginate = (pageNumber) => setCurrentPage(pageNumber)
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>{t('doctor')}</CardTitle>
          <NavLink to={'/doctors/createdoctor'}>
            <Button color='primary'><Plus size={16} className='' /> {t('add')} </Button>
          </NavLink>
        </CardHeader>
        <Table bordered>
          <thead>
            <tr>
              <th>№</th>
              <th>{t('username')}</th>
              <th>{t('firstname')}</th>
              {/* <th>{t('phonenumber')}</th> */}
              <th>User Role</th>
              <th className='th_table'></th>
            </tr>
          </thead>
          <tbody>
            {currentPosts?.map((item, index) => (
              <tr key={index}>
                <th scope="row">{++index}</th>
                <td>{item?.username}</td>
                <td>{item?.fullName}</td>
                {/* <td>-</td> */}
                <td>{item?.userRole === "ADMIN" ? "Shifokor" : null}</td>
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
                  <div className='icons' onClick={() => { setOpen(true); setId(item?.id) } }>
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
              <h4>{t('doctor_dalete')}</h4>
            </div>
            <div className="delete_text">
              <p>
                {t('doctor_about_dal')}
              </p>
            </div>
            <div className="delete_btn">
              <button className='okey' onClick={() => DaleteAll()}>{t('dalete')}</button>
              <button className='del' onClick={() => setOpen(false)}>{t('back_to')}</button>
            </div>
          </div>
        </Modals>
        }
      </Card>
      <Paginations 
        postsPerPage={postsPerPage}
        totalPosts={doctor?.content?.length}
        paginate={paginate}
      />
    </div>
  )
}

export default SecondPage
