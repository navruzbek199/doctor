import { Fragment, useState, useContext, useEffect } from 'react'
import { isObjEmpty } from '@utils'
import classnames from 'classnames'
import { useSkin } from '@hooks/useSkin'
import useJwt from '@src/auth/jwt/useJwt'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { handleLogin } from '@store/actions/auth'
import { Link, useHistory } from 'react-router-dom'
import { AbilityContext } from '@src/utility/context/Can'
import InputPasswordToggle from '@components/input-password-toggle'
import { Facebook, Twitter, Mail, GitHub } from 'react-feather'
import { Row, Col, CardTitle, CardText, FormGroup, Label, Button, Form, Input, CustomInput } from 'reactstrap'
import '@styles/base/pages/page-auth.scss'
import ReactInputMask from 'react-input-mask'
import './views.scss'
import ReactDatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import apiRoot from '../redux/apiRoot/apiRoot'
import moment from 'moment'
import Brand from '../assets/images/logo/Group 34139.svg'
const Register = () => {
  const ability = useContext(AbilityContext)
  const [startDate, setStartDate] = useState(new Date())
  const [skin, setSkin] = useSkin()

  const history = useHistory()

  const dispatch = useDispatch()

  const { register, errors, handleSubmit, trigger } = useForm()

  const [email, setEmail] = useState('')
  const [valErrors, setValErrors] = useState({})
  const [registr, setRegistr] = useState()
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [passwords, setPasswords] = useState('')
  const [terms, setTerms] = useState(false)
  const [phonenumber, setPhonenumber] = useState('')
  const [clinicName, setClinicName] = useState('')
  const [gander, setGander] = useState('')
  const [clinics, setClinics] = useState([])
  const illustration = skin === 'dark' ? 'register-v2-dark.svg' : 'register-v2.svg',
    source = require(`@src/assets/images/pages/${illustration}`).default

  const Terms = () => {
    return (
      <Fragment>
        I agree to
        <a className='ml-25' href='/' onClick={e => e.preventDefault()}>
          privacy policy & terms
        </a>
      </Fragment>
    )
  }
  function phoneNumber(str) {
    return str.split('').filter(item => {
        if (!isNaN(+item) && item !== ' ') {
            return item
        }
    }).join('')
  }
  // useEffect(() => {
  //   const getClinic = () => {
  //     apiRoot.get(`api/v1/user/doctors`).then(res => {
  //       setClinics(res?.data)
  //       console.log(res?.data, "get clinic")
  //     }).catch(error => {
  //       console.log(error)
  //     })
  //   }
  //   console.log(getClinic())
  // })

  const onSubmit = async (e) => {
    e.preventDefault()
    const data = {
      firstName: firstname,
      lastName: lastname,
      phone_number: '+'.concat(phoneNumber(phonenumber)),
      birthDate: moment(startDate).format().slice(0, 10),
      gender: gander,
      mail: email,
      password: passwords
    }
    console.log(data)
    apiRoot.post(`api/v1/user/signUp`, data).then(async res => {
      setRegistr(res?.data)
      console.log(res?.data, "res")
      history.push("/login")
    }).catch(error => {
      console.log(error, "err")
    })
  }

  // const onSubmit = () => {
  //   if (isObjEmpty(errors)) {
  //     useJwt
  //       .register({ username, email, password })
  //       .then(res => {
  //         if (res.data.error) {
  //           const arr = {}
  //           for (const property in res.data.error) {
  //             if (res.data.error[property] !== null) arr[property] = res.data.error[property]
  //           }
  //           setValErrors(arr)
  //           if (res.data.error.email !== null) console.error(res.data.error.email)
  //           if (res.data.error.username !== null) console.error(res.data.error.username)
  //         } else {
  //           setValErrors({})
  //           const data = { ...res.data.user, accessToken: res.data.accessToken }
  //           ability.update(res.data.user.ability)
  //           dispatch(handleLogin(data))
  //           history.push('/')
  //         }
  //       })
  //       .catch(err => console.log(err))
  //   }
  // }

  const handleFirstnameChange = e => {
    const errs = valErrors
    if (errs.firstname) delete errs.firstname
    setFirstname(e.target.value)
    setValErrors(errs)
  }
  const handleLastnameChange = e => {
    const errs = valErrors
    if (errs.lastname) delete errs.lastname
    setLastname(e.target.value)
    setValErrors(errs)
  }
  const handlePhoneNumberChange = e => {
    const errs = valErrors
    if (errs.phonenumber) delete errs.phonenumber
    setPhonenumber(e.target.value)
    setValErrors(errs)
  }
  const handleClinicNameChange = e => {
    const errs = valErrors
    if (errs.clinicName) delete errs.clinicName
    setClinicName(e.target.value)
    setValErrors(errs)
  }

  const handleEmailChange = e => {
    const errs = valErrors
    if (errs.email) delete errs.email
    setEmail(e.target.value)
    setValErrors(errs)
  }

  return (
    <div className='auth-wrapper auth-v2'>
      <Row className='auth-inner m-0'>
        <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
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
              Adventure starts here 🚀
            </CardTitle>
            <CardText className='mb-2'>Make your app management easy and fun!</CardText>

            <Form action='/' className='auth-register-form mt-2' onSubmit={(e) => onSubmit(e)}>
              <FormGroup>
                <Label className='form-label' for='register-username'>
                  FirstName <span className='text-danger'>*</span>
                </Label>
                <Input
                  autoFocus
                  type='text'
                  value={firstname}
                  placeholder='firstname'
                  id='register-username'
                  name='register-username'
                  onChange={handleFirstnameChange}
                  className={classnames({ 'is-invalid': errors['register-username'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                />
                {Object.keys(valErrors).length && valErrors.firstname ? (
                  <small className='text-danger'>{valErrors.firstname}</small>
                ) : null}
              </FormGroup>
              <FormGroup>
                <Label className='form-label' for='register-lastname'>
                  LastName <span className='text-danger'>*</span>
                </Label>
                <Input
                  autoFocus
                  type='text'
                  value={lastname}
                  placeholder='lastname'
                  id='register-lastname'
                  name='register-lastname'
                  onChange={handleLastnameChange}
                  className={classnames({ 'is-invalid': errors['register-lastname'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                />
                {Object.keys(valErrors).length && valErrors.lastname ? (
                  <small className='text-danger'>{valErrors.lastname}</small>
                ) : null}
              </FormGroup>
              <FormGroup>
                <Label className='form-label' for='register-phonenumber'>
                  Phone Number <span className='text-danger'>*</span>
                </Label>
                <ReactInputMask
                  type='login'
                  id='login-email'
                  placeholder='998(99)0786192'
                  required
                  autoComplete="off"
                  mask="+\9\9\8\(99) 999-99-99"
                  maskChar=" "
                  autoFocus
                  className='input_mask'
                  value={phonenumber}
                  onChange={handlePhoneNumberChange}
                  // className={classnames({ 'is-invalid': errors['register-phonenumber'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                />
                {Object.keys(valErrors).length && valErrors.phonenumber ? (
                  <small className='text-danger'>{valErrors.phonenumber}</small>
                ) : null}
              </FormGroup>
              <FormGroup>
                <Label className="form-label">
                  Date Birthday <span className='text-danger'>*</span>
                </Label>
                <div className="quarter_datepicker">
                  <ReactDatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    withPortal
                    showMonthDropdown
                    showYearDropdown
                    dateFormat="yyyy-MM-dd"
                    className='date_picker_input'
                    placeholderText='--/--/----'
                    required
                  // locale="uz"
                  />
                </div>
              </FormGroup>
              <FormGroup>
                <Label className='form-label' for='register-email'>
                  Email <span className='text-danger'>*</span>
                </Label>
                <Input
                  type='email'
                  value={email}
                  id='register-email'
                  name='register-email'
                  onChange={handleEmailChange}
                  placeholder='john@example.com'
                  className={classnames({ 'is-invalid': errors['register-email'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                />
                {Object.keys(valErrors).length && valErrors.email ? (
                  <small className='text-danger'>{valErrors.email}</small>
                ) : null}

              </FormGroup>
              <FormGroup>
                <Label>
                  Gander <span className='text-danger'>*</span>
                </Label>
                <div className='d-flex gander_option'>
                  <input type="radio" name="gender" id="erkak" value="erkak"
                    onChange={(e) => setGander(e.target.value)}
                    checked={gander === "erkak"}
                  />
                  <label htmlFor='erkak'>Erkak</label>
                  <input type="radio" name="gender" id="ayol" value="ayol"
                    onChange={(e) => setGander(e.target.value)}
                    checked={gander === "ayol"}
                  />
                  <label htmlFor="ayol">Ayol</label>
                  {/* <CustomInput
                    type='switch'
                    id='erkak'
                    value="erkak"
                    checked={gander === "erkak"}
                    onChange={e => setGander(e.target.checked)}
                    name='erkak'
                    label='Man'

                  />
                  <CustomInput
                    type='switch'
                    id='ayol'
                    value="ayol"
                    checked={gander === "ayol"}
                    onChange={e => setGander(e.target.checked)}
                    name='ayol'
                    label='Woman'
                    className='ml-5'
                  /> */}
                </div>
              </FormGroup>
              <FormGroup>
                <Label className='form-label' for='register-password'>
                  Password <span className='text-danger'>*</span>
                </Label>
                <InputPasswordToggle
                  value={passwords}
                  id='register-password'
                  name='register-password'
                  className='input-group-merge'
                  onChange={e => setPasswords(e.target.value)}
                  // className={classnames({ 'is-invalid': errors['register-password'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                />
              </FormGroup>
              <FormGroup>
                <CustomInput
                  type='checkbox'
                  id='terms'
                  name='terms'
                  value='terms'
                  label={<Terms />}
                  className='custom-control-Primary'
                  innerRef={register({ required: true })}
                  onChange={e => setTerms(e.target.checked)}
                  invalid={errors.terms && true}
                />
              </FormGroup>
              <Button type='submit' block color='primary'>
                Sign up
              </Button>
            </Form>
            <p className='text-center mt-2'>
              <span className='mr-25'>Already have an account?</span>
              <Link to='/login'>
                <span>Sign in instead</span>
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

export default Register