import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, CardHeader, CardTitle, Form, FormGroup, Input, Label } from 'reactstrap'
import classnames from 'classnames'
import { useForm } from 'react-hook-form'
import apiRoot from '../../redux/apiRoot/apiRoot'
import '../views.scss'
import { NavLink, useHistory, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
const DoctorEdit = () => {
    const { t } = useTranslation()
    const params = useParams()
    const token = localStorage.getItem("access_token")
    const { register, errors, handleSubmit } = useForm()
    const [doctor, setDoctor] = useState()
    const [fio, setFio] = useState("")
    const [name, setName] = useState("")
    const [role, setRole] = useState("")
    const history = useHistory()
    const GetDoctor = () => {
        apiRoot.get(`api/v1/user/one/${params?.userId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
        }
        ).then(res => {
          setDoctor(res?.data)
          console.log(res?.data)
          setRole(res?.data?.userRole)
          setFio(res?.data?.fullName)
          setName(res?.data?.username)
        }).catch(err => {
          console.log(err, "error")
        })
    }
    const UpdateDoc = (e) => {
        e.preventDefault()
        const data = {
            fullName: fio,
            username: name,
            userRole: role
        }
        apiRoot.put(`api/v1/user/update/${params?.userId}`, data,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
        }).then(res => {
            console.log(res?.data)
            history.push('/doctors')
          }).catch(err => {
            console.log(err, "error")
          })
    }
    useEffect(() => {
        GetDoctor()
    }, [])
    return (
        <div className='doctor_edit'>
            <Card>
                <CardHeader>
                    <CardTitle>Shifokorni tahrirlash</CardTitle>
                </CardHeader>
                <CardBody>
                    <Form onSubmit={(e) => UpdateDoc(e)}>
                        <FormGroup>
                            <Label for='full-name'>
                                {t('firstname')} <span className='text-danger'>*</span>
                            </Label>
                            <Input
                                name='full-name'
                                value={fio}
                                onChange={e => setFio(e.target.value)}
                                id='full-name'
                                placeholder='John Doe'
                                innerRef={register({ required: true })}
                                className={classnames({ 'is-invalid': errors['full-name'] })}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for='username'>
                                {t('username')}
                            </Label>
                            <Input
                                name='username'
                                id='username'
                                disabled
                                value={name}
                                onChange={e => setName(e.target.value)}
                                placeholder='johnDoe99'
                                innerRef={register({ required: true })}
                                className={classnames({ 'is-invalid': errors['username'] })}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for='userrole'>
                                Role
                            </Label>
                            <Input
                                name='userrole'
                                id='userrole'
                                disabled
                                value={role}
                                onChange={e => setRole(e.target.value)}
                                placeholder='role'
                                innerRef={register({ required: true })}
                                className={classnames({ 'is-invalid': errors['userrole'] })}
                            />
                        </FormGroup>
                        <Button color='primary' className="mr-1">{t('update')}</Button>
                        <NavLink to="/doctors">
                            <Button color='secondary' outline >{t('back_to')}</Button>   
                        </NavLink>
                    </Form>
                </CardBody>
            </Card>
        </div>
    )
}

export default DoctorEdit