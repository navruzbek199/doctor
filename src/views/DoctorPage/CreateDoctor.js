import classnames from 'classnames'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { NavLink, useHistory } from 'react-router-dom'
import { Button, Card, CardBody, CardHeader, CardTitle, Form, FormGroup, Input, Label } from 'reactstrap'
import apiRoot from '../../redux/apiRoot/apiRoot'
import '../views.scss'
const CreateDoctor = () => {
    const { t } = useTranslation()
    const token = localStorage.getItem("access_token")
    const { register, errors, handleSubmit } = useForm()
    const [fio, setFio] = useState("")
    const [name, setName] = useState("")
    const [role, setRole] = useState("")
    const [psw, setPsw] = useState()
    const history = useHistory()
    const onSubmit = (e) => {
        e.preventDefault()
        const data = {
            fullName: fio,
            username: name,
            password: psw,
            userRole: role === "ADMIN(doctor)" ? "ADMIN" : role
        }
        apiRoot.post(`api/v1/user/create`, data,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                console.log(res?.data, "ddd")
                history.push("/doctors")
            }).catch(err => {
                console.log(err, "error")
            })
    }
    console.log(role, "role")
    return (
        <div className='create_doctor'>
            <Card>
                <CardHeader>
                    <CardTitle>Shifokorni yaratish</CardTitle>
                </CardHeader>
                <CardBody>
                    <Form onSubmit={(e) => onSubmit(e)}>
                        <FormGroup>
                            <Label for='full-name'>
                                {t('firstname')} <span className='text-danger'>*</span>
                            </Label>
                            <Input
                                name='full-name'
                                // value={doctor?.firstname}
                                onChange={(e) => setFio(e.target.value)}
                                id='full-name'
                                placeholder='John Doe'
                                innerRef={register({ required: true })}
                                className={classnames({ 'is-invalid': errors['full-name'] })}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for='username'>
                                {t('username')} <span className='text-danger'>*</span>
                            </Label>
                            <Input
                                name='username'
                                id='username'
                                onChange={(e) => setName(e.target.value)}
                                // value={doctor?.username}
                                placeholder='johnDoe99'
                                innerRef={register({ required: true })}
                                className={classnames({ 'is-invalid': errors['username'] })}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleSelect">
                                Role <span className='text-danger'>*</span>
                            </Label>
                            <Input type="select" name="select" id="exampleSelect" onChange={(e) => setRole(e.target.value)}>
                                <option>SUPER_ADMIN</option>
                                <option>ADMIN(doctor)</option>
                                <option>DEVELOPER</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for='psw'>
                                {t('password')} <span className='text-danger'>*</span>
                            </Label>
                            <Input
                                name='psw'
                                id='psw'
                                onChange={(e) => setPsw(e.target.value)}
                                placeholder='*****'
                                innerRef={register({ required: true })}
                                className={classnames({ 'is-invalid': errors['psw'] })}
                            />
                        </FormGroup>
                        <Button color='primary' className="mr-1">Saqlash</Button>
                        <NavLink to="/doctors">
                            <Button color='secondary' outline >Ortga</Button>
                        </NavLink>
                    </Form>
                </CardBody>
            </Card>
        </div>
    )
}

export default CreateDoctor