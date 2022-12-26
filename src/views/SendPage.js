import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, CardHeader, CardTitle, Form, FormGroup, Input, Label } from 'reactstrap'
import classnames from 'classnames'
import { useForm } from 'react-hook-form'
import { Send } from 'react-feather'
import axios from 'axios'
import { useParams } from 'react-router-dom'
const SendPage = () => {
    const { register, errors } = useForm()
    const [selectedFile, setSelectedFile] = React.useState(null)
    const [img, setImg] = useState()
    const [getImage, setGetImage] = useState()
    const param = useParams()
    console.log(param, "bu param")
    const handleSubmit = async (event) => {
        event.preventDefault()
        const formData = new FormData()
        formData.append("selectedFile", selectedFile)
        try {
          const response = await axios({
            method: "post",
            url: `http://192.168.100.225:8000/api/v1/files/upload?id=${param?.userId}`,
            data: formData,
            headers: { "Content-Type": "multipart/form-data"}
          }).then((res) => {
              setGetImage(res?.data)
              console.log(res?.data, "bu uid")
          })
        } catch (error) {
          console.log(error)
        }
    }
    useEffect(() => {
        const res = axios({
            method: "get",
            url: `http://192.168.100.225:8000/api/v1/attachment/download/${getImage?.uid}`,
            headers: { "Content-Type": "multipart/form-data" }
        }).then(res => {
            //   setImg(res?.data)
              console.log(res?.data, "rasm get")
        }).catch((err) => {
            console.log(err, "error")
        })
    }, [getImage])

    const handleFileSelect = (event) => {
        setSelectedFile(event.target.files[0])
        console.log(event.target.files[0], "buimga")
        if (event.target.files && event.target.files[0]) {
            setImg(URL.createObjectURL(event.target.files[0]))
        }
    }
    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Malumotlarni jo'natish</CardTitle>
                </CardHeader>
                <CardBody>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label for='full-name'>
                                File<span className='text-danger'>*</span>
                            </Label>
                            <Input
                                type="file"
                                name='file'
                                accept="image/*" 
                                id='file'
                                onChange={handleFileSelect}
                                innerRef={register({ required: true })}
                                className={classnames({ 'is-invalid': errors['full-name'] })}
                            />
                            {
                                <img  src={img} alt="img" id="target" />
                            }
                        </FormGroup>
                        <Button color='primary'>Jo'natish <Send size={15}/> </Button>
                    </Form>
                </CardBody>
            </Card>
        </div>
    )
}

export default SendPage