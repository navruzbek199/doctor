import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, CardHeader, CardTitle, Form, FormGroup, Input, Label } from 'reactstrap'
import classnames from 'classnames'
import { useForm } from 'react-hook-form'
import apiRoot from '../../redux/apiRoot/apiRoot'
import '../views.scss'
import { useParams } from 'react-router-dom'
const DoctorEdit = () => {
    const param = useParams()
    const { register, errors, handleSubmit } = useForm()
    const [doctor, setDoctor] = useState()
    const GetDoctor = () => {
        apiRoot.get(`api/v1/user/${param?.userId}`).then(res => {
          setDoctor(res?.data)
          console.log(res?.data)
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
                    <Form>
                        <FormGroup>
                            <Label for='full-name'>
                                Full Name <span className='text-danger'>*</span>
                            </Label>
                            <Input
                                name='full-name'
                                value={doctor?.firstname}
                                id='full-name'
                                
                                placeholder='John Doe'
                                innerRef={register({ required: true })}
                                className={classnames({ 'is-invalid': errors['full-name'] })}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for='username'>
                                Username
                            </Label>
                            <Input
                                name='username'
                                id='username'
                                disabled
                                value={doctor?.username}
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
                                value={doctor?.userRole}
                                placeholder='role'
                                innerRef={register({ required: true })}
                                className={classnames({ 'is-invalid': errors['userrole'] })}
                            />
                        </FormGroup>
                        <Button color='primary' className="mr-1">Tahrirlash</Button>
                        <Button color='secondary' outline >Ortga</Button>
                    </Form>
                </CardBody>
            </Card>
        </div>
    )
}

export default DoctorEdit