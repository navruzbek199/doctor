import { useSkin } from '@hooks/useSkin'
import { Link, Redirect, useHistory } from 'react-router-dom'
import { Facebook, Twitter, Mail, GitHub } from 'react-feather'
import InputPasswordToggle from '@components/input-password-toggle'
import { Row, Col, CardTitle, CardText, Form, FormGroup, Label, Input, CustomInput, Button, ButtonGroup } from 'reactstrap'
import '@styles/base/pages/page-auth.scss'
import InputMask from 'react-input-mask'
import { useState } from 'react'
import apiRoot from '../redux/apiRoot/apiRoot'
import './views.scss'
import { useDispatch } from 'react-redux'
import { actionNumberRouter } from '../redux/actions/number'
import jwtDecode from 'jwt-decode'
import Brand from '../assets/images/logo/Group 34139.svg'
const axios = require('axios')
const Login = () => {
  const history = useHistory()
  const [skin, setSkin] = useSkin()
  const [number, setNumber] = useState('')
  const [passwords, setPasswords] = useState('')
  const [auth, setAuth] = useState()
  const dispatch = useDispatch()
  function phoneNumber(str) {
    return str.split('').filter(item => {
        if (!isNaN(+item) && item !== ' ') {
            return item
        }
    }).join('')
  }
  const illustration = skin === 'dark' ? 'login-v2-dark.svg' : 'login-v2.svg',
    source = require(`@src/assets/images/pages/${illustration}`).default
    const onSubmit = async (e) => {
      e.preventDefault()
      const data = {
          phoneNumber: '+'.concat(phoneNumber(number)),
          password:passwords
      }
      console.log(data)
      apiRoot.post(`api/v1/auth/login`, data).then(async  res => {
        if (res?.data?.success === true) {
          setAuth(res?.data)
          console.log(res?.data, "response")
          localStorage.setItem("token", response?.data?.token)
        }
        if (res?.data?.data === null) {
          const pswObj = {
              number: '+'.concat(phoneNumber(number)),
              psw: passwords
          }
          dispatch(actionNumberRouter(pswObj))
          history.push('/validation')
        }
        if (res?.data?.is_user_validated_by_otp === true) {
          localStorage.setItem("token", res?.data?.token)
          history.push("/home")
        }
      }).catch(error => {
        console.log(error, "error")
      })
    }
    
    
  return (
    <div className='auth-wrapper auth-v2'>
      <Row className='auth-inner m-0'>
        <Link className='brand-logo' to='/'>
            <img src={Brand} className='image_login w-10'/>
        </Link>
        <Col className='d-none d-lg-flex align-items-center p-5' lg='8' sm='12'>
          <div className='w-100 d-lg-flex align-items-center justify-content-center px-5'>
            <img className='img-fluid' src={source} alt='Login V2' />
          </div>
        </Col>
        <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
          <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
            <CardTitle tag='h2' className='font-weight-bold mb-1'>
              Welcome to Vuexy! 👋
            </CardTitle>
            <CardText className='mb-2'>Please sign-in to your account and start the adventure</CardText>
            <Form className='auth-login-form mt-2' onSubmit={(e) => onSubmit(e)}>
              <FormGroup>
                <Label className='form-label' for='login-email'>
                  Login
                </Label>
                
                <InputMask
                type='login' 
                id='login-email' 
                placeholder='998990786192'
                onChange={(e) => +setNumber(e.target.value)}
                required
                autoComplete="off"
                mask="+\9\9\8\(99) 999-99-99"
                maskChar=" "
                autoFocus
                className='input_mask'
                />
              </FormGroup>
              <FormGroup>
                <div className='d-flex justify-content-between'>
                  <Label className='form-label' for='login-password'>
                    Password
                  </Label>
                  <Link to='/'>
                    <small>Forgot Password?</small>
                  </Link>
                </div>
                <InputPasswordToggle 
                  className='input-group-merge' 
                  id='login-password'
                  onChange={(e) => setPasswords(e.target.value)}
                  required
                />
              </FormGroup>
              <FormGroup>
                <CustomInput type='checkbox' className='custom-control-Primary' id='remember-me' label='Remember Me' />
              </FormGroup>
              <Button color='primary' block>
                Sign in
              </Button>
            </Form>
            <p className='text-center mt-2'>
              <span className='mr-25'>New on our platform?</span>
              <Link to='/register'>
                <span>Create an account</span>
              </Link>
            </p>
            <div className='divider my-2'>
              <div className='divider-text'>or</div>
            </div>
            <div className='auth-footer-btn d-flex justify-content-center'>
              <Button.Ripple color='facebook'>
                <Facebook size={14} />
              </Button.Ripple>
              <Button.Ripple color='twitter'>
                <Twitter size={14} />
              </Button.Ripple>
              <Button.Ripple color='google'>
                <Mail size={14} />
              </Button.Ripple>
              <Button.Ripple className='mr-0' color='github'>
                <GitHub size={14} />
              </Button.Ripple>
            </div>
          </Col>
        </Col>
      </Row>
    </div>
  )
}

export default Login
