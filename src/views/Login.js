import { useSkin } from '@hooks/useSkin'
import { Link, Redirect, useHistory } from 'react-router-dom'
import { Facebook, Twitter, Mail, GitHub } from 'react-feather'
import InputPasswordToggle from '@components/input-password-toggle'
import { Row, Col, CardTitle, CardText, Form, FormGroup, Label, Input, CustomInput, Button, ButtonGroup } from 'reactstrap'
import '@styles/base/pages/page-auth.scss'
import { useState } from 'react'
import apiRoot from '../redux/apiRoot/apiRoot'
import './views.scss'
// import jwtDecode from 'jwt-decode'
import Brand from '../assets/images/logo/Group 34139.svg'
import Brand1 from '../assets/images/logo/Group 34139 (1).svg'
import Noty from 'noty'
const axios = require('axios')
const Login = () => {
  const history = useHistory()
  const [skin, setSkin] = useSkin()
  const [number, setNumber] = useState('')
  const [passwords, setPasswords] = useState('')
  const [auth, setAuth] = useState()
  const [navigate, setNavigate] = useState(false)
  const Noty = require("noty")

  const illustration = skin === 'dark' ? 'OBJECTS.png' : 'OBJECTS.png',
    source = require(`@src/assets/images/pages/${illustration}`).default
    const onSubmit = async (e) => {
      e.preventDefault()
      const data = {
        username : number,
        password : passwords,
        grant_type : "password"
      }
      console.log(data)
      apiRoot.post(`api/v1/auth/oauth/token?username=${data?.username}&password=${data?.password}&grant_type=${data?.grant_type}`,
      {
        headers: {
          // 'Access-Control-Allow-Origin':'*',
          'Content-Type': 'application/json'
        }
      })
      .then(async  res => {
          setAuth(res?.data)
          console.log(res?.data, "response")
          localStorage.setItem("refresh_token", res?.data?.refresh_token)
          localStorage.setItem("access_token", res?.data?.access_token)
          history.push('/home')
        // if (res?.data?.is_user_validated_by_otp === true) {
        //   localStorage.setItem("token", res?.data?.token)
        //   history.push("/home")
        // }
      }).catch(async error => {
        console.log(error?.response, "error")
        if (error?.response?.data?.status === 401) {
            setTimeout(function () {
              new Noty({
                  text: 'Неправильный логин или пароль',
                  layout: "topCenter",
                  type: "error",
                  timeout: 2000
              }).show()
              alert('Неправильный логин или пароль')
          }, 1000)
        }
      })
    }

    
  return (
    <div className='auth-wrapper auth-v2'>
      <Row className='auth-inner m-0'>
        
        <Col className='d-none d-lg-flex align-items-center p-5' lg='8' sm='12'>
          <div className='w-100 d-lg-flex align-items-center justify-content-center px-5'>
            <img className='img-fluid' src={source} alt='Login V2' />
          </div>
        </Col>
        <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
            <Link className='brand-logo d-flex align-items-center justify-center auth-bg px-2 p-lg-5 text-center' to='/'>
              {skin === 'dark' ? <img src={Brand} className='image_login w-10'/> : <img src={Brand1} className='image_login w-10'/>
              }
            </Link>
          <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
            <CardTitle tag='h2' className='font-weight-bold mb-1'>
              Welcome to e-doctor! 👋
            </CardTitle>
            <CardText className='mb-2'>Please sign-in to your account and start the adventure</CardText>
            <Form className='auth-login-form mt-2' onSubmit={(e) => onSubmit(e)}>
              <FormGroup>
                <Label className='form-label' for='login-email'>
                  Login
                </Label>
                <Input
                type='login' 
                id='login' 
                placeholder='username'
                onChange={(e) => setNumber(e.target.value)}
                required
                autoComplete="off"
                className='input_mask'
                />
              </FormGroup>
              <FormGroup>
                <div className='d-flex justify-content-between'>
                  <Label className='form-label' for='login-password'>
                    Password
                  </Label>
                  {/* <Link to='/'>
                    <small>Forgot Password?</small>
                  </Link> */}
                </div>
                <InputPasswordToggle 
                  className='input-group-merge' 
                  id='login-password'
                  autoComplete="off"
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
            {/* <p className='text-center mt-2'>
              <span className='mr-25'>New on our platform?</span>
              <Link to='/register'>
                <span>Create an account</span>
              </Link>
            </p> */}
            {/* <div className='divider my-2'>
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
            </div> */}
          </Col>
        </Col>
      </Row>
    </div>
  )
}

export default Login
