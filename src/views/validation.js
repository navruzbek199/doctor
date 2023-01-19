import { Fragment, useState, useContext, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Facebook, Twitter, Mail, GitHub } from 'react-feather'
import { Row, Col, CardTitle, CardText, FormGroup, Label, Button, Form, Input, CustomInput } from 'reactstrap'
import '@styles/base/pages/page-auth.scss'
import './views.scss'
import "react-datepicker/dist/react-datepicker.css"
import { useSkin } from '@hooks/useSkin'
import apiRoot from '../redux/apiRoot/apiRoot'
import { useSelector } from 'react-redux'
const validation = () => {
    const history = useHistory()
    const [skin, setSkin] = useSkin()
    const [time, setTime] = useState(59)
    const { numberData } = useSelector(state => state.numberRouter)
    console.log(numberData, "bu number")
    const [number, setNumber] = useState({})
    useEffect(() => {
        if (time > 0) {
            setTimeout(() => setTime(time - 1), 1000)
        } else {
        }
    }, [time])

    const illustration = skin === 'dark' ? 'register-v2-dark.svg' : 'register-v2.svg',
    source = require(`@src/assets/images/pages/${illustration}`).default


    const onSubmit = () => {
        const data = {
            phone_number: numberData?.number,
            code: +number
        }
        apiRoot(`api/v1/auth/validation`, data).then(res => {
            if (res.status === 200) {
                console.log(res?.data)
                history.push("/home")
            }
        })
    }
    const onSubmits = async (e) => {
        const data = {
            phoneNumber:numberData?.number,
            password:passwords
        }
        console.log(data)
        apiRoot.post(`api/v1/auth/login`, data).then(async  res => {
          if (res?.data?.success === true) {
            setAuth(res?.data)
            setTime(59)
            console.log(res?.data, "response")
          }
        }).catch(error => {
          console.log(error, "error")
        })
      }
    return (
        <div className='auth-wrapper auth-v2'>
            <Row className='auth-inner m-0'>
                <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
                    <svg viewBox='0 0 139 95' version='1.1' height='28'>
                        <defs>
                            <linearGradient x1='100%' y1='10.5120544%' x2='50%' y2='89.4879456%' id='linearGradient-1'>
                                <stop stopColor='#000000' offset='0%'></stop>
                                <stop stopColor='#FFFFFF' offset='100%'></stop>
                            </linearGradient>
                            <linearGradient x1='64.0437835%' y1='46.3276743%' x2='37.373316%' y2='100%' id='linearGradient-2'>
                                <stop stopColor='#EEEEEE' stopOpacity='0' offset='0%'></stop>
                                <stop stopColor='#FFFFFF' offset='100%'></stop>
                            </linearGradient>
                        </defs>
                        <g id='Page-1' stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
                            <g id='Artboard' transform='translate(-400.000000, -178.000000)'>
                                <g id='Group' transform='translate(400.000000, 178.000000)'>
                                    <path
                                        d='M-5.68434189e-14,2.84217094e-14 L39.1816085,2.84217094e-14 L69.3453773,32.2519224 L101.428699,2.84217094e-14 L138.784583,2.84217094e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L6.71554594,44.4188507 C2.46876683,39.9813776 0.345377275,35.1089553 0.345377275,29.8015838 C0.345377275,24.4942122 0.230251516,14.560351 -5.68434189e-14,2.84217094e-14 Z'
                                        id='Path'
                                        className='text-primary'
                                        style={{ fill: 'currentColor' }}
                                    ></path>
                                    <path
                                        d='M69.3453773,32.2519224 L101.428699,1.42108547e-14 L138.784583,1.42108547e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L32.8435758,70.5039241 L69.3453773,32.2519224 Z'
                                        id='Path'
                                        fill='url(#linearGradient-1)'
                                        opacity='0.2'
                                    ></path>
                                    <polygon
                                        id='Path-2'
                                        fill='#000000'
                                        opacity='0.049999997'
                                        points='69.3922914 32.4202615 32.8435758 70.5039241 54.0490008 16.1851325'
                                    ></polygon>
                                    <polygon
                                        id='Path-2'
                                        fill='#000000'
                                        opacity='0.099999994'
                                        points='69.3922914 32.4202615 32.8435758 70.5039241 58.3683556 20.7402338'
                                    ></polygon>
                                    <polygon
                                        id='Path-3'
                                        fill='url(#linearGradient-2)'
                                        opacity='0.099999994'
                                        points='101.428699 0 83.0667527 94.1480575 130.378721 47.0740288'
                                    ></polygon>
                                </g>
                            </g>
                        </g>
                    </svg>
                    <h2 className='brand-text text-primary ml-1'>e-Doctor</h2>
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
                        <CardText className='mb-2'>
                        На ваш номер телефона был отправлен СМС код
                            +{numberData?.number}
                        </CardText>
                        <Form action='/'  onSubmit={(e) => onSubmit(e)}>
                            <FormGroup>
                                <Label className='form-label' for='register-username'>
                                    Kodni kiriting
                                </Label>
                                <Input
                                    autoFocus
                                    type='text'
                                    placeholder='_ _ _ _ _ _'
                                    id='validation'
                                    name='validation'
                                    required
                                    maxLength="6"
                                    autoComplete="off"
                                    onChange={(e) => setNumber(e.target.value)}
                                />
                            </FormGroup>
                            <div className='time_items'>
                                {time === 0 ? <div className='again_click mb-2'><a onClick={() => onSubmits()}>Code repeat send</a></div> : <p>00:{time}</p> }
                            </div>
                            <Button type='submit' block color='primary'>
                                Sign in
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

export default validation