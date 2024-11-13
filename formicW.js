import React, { useState, useEffect } from 'react';

import { Form, TextField, SelectField, SubmitButton } from './FormElements';
import * as Yup from 'yup';

/* import formSchema from './login.json'; */
import './formic.css';
import LoginYup  from './login-yup';


function FormicW(fSchema,FormSchema) {
    const [formData, setFormData] = useState({});
    const [validationSchema, setValidationSchema] = useState({});
    const [formSchema, setFormSchema] = useState(fSchema.formSchema);

    useEffect(() => {  
        console.log(LoginYup)
      //  console.log(yupData)
        initForm(formSchema);
    }, []);

    const initForm = (formSchema) => {
        let _formData = {};
        let _validationSchema = {};

        for(var key of Object.keys(formSchema)){
            _formData[key] = "";

            if(formSchema[key].type === "text"){
                _validationSchema[key] = Yup.string();
            }else if(formSchema[key].type === "email"){
                _validationSchema[key] = Yup.string().email()
            }else if(formSchema[key].type === "select"){
                _validationSchema[key] = Yup.string().oneOf(formSchema[key].options.map(o => o.value));
            }else if(formSchema[key].type === "password"){
                _validationSchema[key] =  Yup.string()
  .required('No password provided.') 
  .min(8, 'Password is too short - should be 8 chars minimum.')
  .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
            }

            if(formSchema[key].required){
                _validationSchema[key] = _validationSchema[key].required('Required');
            }
        }

        setFormData(_formData);
        setValidationSchema(Yup.object().shape({ ..._validationSchema }));
    }

    const getFormElement = (elementName, elementSchema) => {
        const props = {
            name: elementName,
            label: elementSchema.label,
            options: elementSchema.options,
            type:elementSchema.type
        };

        if (elementSchema.type === "text" || elementSchema.type === "email"|| elementSchema.type === "number" ||elementSchema.type === "password") {
            return (
          
                <div className="form-group mb-3 col-md-6">
            <TextField {...props} />
            </div>
            )
        }
       /*  if (elementSchema.type === "textarea" ) {
            return (
          
            <div className="form-group col-md-6">
            <TextArea {...props} />
            </div>
            )
        } */

        if (elementSchema.type === "select") {
            return (
             
                <div className="form-group mb-3 col-md-6">
            <SelectField  {...props} />
            </div>
            )
        }

    }

    const onSubmit = (values, { setSubmitting, resetForm, setStatus }) => {
        console.log(values);
        setSubmitting(false);
        resetForm()
    }
  //  const FormSchema = Yup.object().shape(LoginYup);
    console.log(FormSchema)
  //console.log(yupData)
let isValid ;
    return (
        <div className="container-fluid">
            <Form
                enableReinitialize

        validationSchema={FormSchema}
      
                initialValues={formData}

                onSubmit={onSubmit}
                isValid={isValid}
            >

                {Object.keys(formSchema).map( (key, ind) => (
                    <>
                        {getFormElement(key, formSchema[key])}
                    </>
                ))}
             <SubmitButton
             disabled={!isValid}
              title="Submit"
            />
            </Form>
        </div>
       
    );
}

export default FormicW;