import React from 'react'
import { useForm } from 'react-hook-form'
import { Button, Card, CardBody, CardHeader, CardTitle, Form, FormGroup, Input, Label } from 'reactstrap'
import classnames from 'classnames'
import './views.scss'
import { NavLink } from 'react-router-dom'
const PasswordPage = () => {
  const { register, errors } = useForm()
  return (
    <div className='passwordpage'>
      <Card>
        <CardHeader>
          <CardTitle>
            Shifokorlarni parolini o'zgartirish
          </CardTitle>
        </CardHeader>
        <CardBody>
          <Form>
            <FormGroup>
              <Label for='psw'>
                Parol <span className='text-danger'>*</span>
              </Label>
              <Input
                name='psw'
                id='psw'
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
                // placeholder='johnDoe99'
                innerRef={register({ required: true })}
                // className={classNames({ 'is-invalid': errors['pswnew'] })}
              />
            </FormGroup>
            <Button type='submit' className='mr-1' color='primary'>
              Saqlash
            </Button>
            <Button type='reset' color='secondary' outline>
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