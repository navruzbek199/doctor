import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Card, CardBody, CardHeader, CardTitle, Form, FormGroup, Input, Label } from 'reactstrap'
import classnames from 'classnames'
import './views.scss'
import { NavLink, useHistory, useParams } from 'react-router-dom'
import apiRoot from '../redux/apiRoot/apiRoot'
const PasswordPage = () => {
  const token = localStorage.getItem('access_token')
  const param = useParams()
  const history = useHistory()
  const { register, errors } = useForm()
  const [psw, setPsw] = useState()
  const [psw2, setPsw2] = useState()
  const [activBtn, setActiveBtn] = useState(false)
  const OnSubmit = (e) => {
    e.preventDefault()
    const data = {
      newPassword:psw,
      confirmPassword:psw2
    }
    apiRoot.put(`/api/v1/user/${param?.userId}`, data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }).then(res => {
      console.log(res?.data, "put")
      if (res?.data?.success === true) {
        setActiveBtn(true)
        history.push('/doctors')
      } else {
        setActiveBtn(false)
    }
    }).catch(err => {
      console.log(err, "error")
    })
  }
  const newPasswordFunc2 = (e) => {
    setPsw2(e.target.value)
    if (psw === e.target.value) {
        setActiveBtn(true)
    } else {
        setActiveBtn(false)
    }
}
  return (
    <div className='passwordpage'>
      <Card>
        <CardHeader>
          <CardTitle>
            Shifokorlarni parolini o'zgartirish
          </CardTitle>
        </CardHeader>
        <CardBody>
          <Form onSubmit={OnSubmit}>
            <FormGroup>
              <Label for='psw'>
                Yangi parol <span className='text-danger'>*</span>
              </Label>
              <Input
                name='psw'
                value={psw}
                id='psw'
                onChange={(e) => setPsw(e.target.value)}
                placeholder='*****'
                innerRef={register({ required: true })}
                className={classnames({ 'is-invalid': errors['psw'] })}
              />
            </FormGroup>
            <FormGroup>
              <Label for='pswnew'>
                Parolni tasdiqlash <span className='text-danger'>*</span>
              </Label>
              <Input
                name='pswnew'
                id='pswnew'
                value={psw2}
                onChange={(e) => newPasswordFunc2(e)}
                innerRef={register({ required: true })}
                className={classnames({ 'is-invalid': errors['pswnew'] })}
              />
            </FormGroup>
            { activBtn ? <Button className='mr-1' color='primary'> Saqlash </Button> : <Button className='mr-1' disabled color='secondary'> Saqlash </Button>

            }
            <Button color='secondary' outline>
              <NavLink to='/doctors'>
                  Ortga
              </NavLink>
            </Button>
          </Form>
        </CardBody>
      </Card>
    </div>
  )
}

export default PasswordPage