
import React from 'react';
import {
    Formik,
    Form as FormikForm,
    Field,
    ErrorMessage,
    useFormikContext,
    useField,
    useFormik
} from 'formik';

export function Form(props) {
    return (
        <Formik 
            {...props}
        >
            <FormikForm className="row" noValidate="">
                {props.children}
            </FormikForm>
        </Formik>)
}

export function TextField(props) {
    const { name, label, placeholder,type, ...rest } = props
    return (
        <>
            {label && <label htmlFor={name}>{label}</label>}
            <Field
                className="form-control form-control-xxl"
                type={type}
                name={name}
                key={name}
                id={name}
                placeholder={placeholder || ""} 
                {...rest}
            />
            <ErrorMessage name={name} render={msg => <div style={{ color: 'red' }} >{msg}</div>} />
        </>
    )
}
/* export function TextArea(props){
    const { name, label, placeholder,type, ...rest } = props
    return(
        <Field name={name}
          id={name}
            placeholder={placeholder || ""} 
            name={name}
           >
        {({field, form, meta}) => {
          return (
            <textarea 
             rows="4" cols="50" 
             value={field.value}
              onChange={field.onChange}
            class="form-control" 
            ></textarea>
          );
        }}
      </Field>

        
    )
} */
export function SelectField(props) {
    const { name, label, options } = props
    return (
        <>
            {label && <label htmlFor={name}>{label}</label>}
            <Field
                as="select"
                id={name}
                key={name}
                name={name}
                className="form-control form-control-sm form-select" 
            >
                <option key="0" value="" >Choose...</option>
                {options.map((optn, index) => <option key={index} value={optn.value} label={optn.label || optn.value} />)}
            </Field>
            <ErrorMessage name={name} render={msg => <div style={{ color: 'red' }} >{msg}</div>} />
        </>
    )
}

export function SubmitButton(props){
    const { title, ...rest } = props;
    const { isSubmitting } = useFormikContext();
    
    return (
        <div className='col-md-12 form-group '>
        <button className="btn btn-sm btn-success" type="submit" {...rest} disabled={isSubmitting}>{title}</button>
        </div>
    )
}