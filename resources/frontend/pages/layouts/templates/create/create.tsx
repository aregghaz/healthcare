import React from 'react'
import s from './create.module.scss'
import FormikHandler, {IItem} from "../formik-handler/formik-handler";
import populateEditFormFields from "../../../../constants/populateEditFormFields";
import Button from "../../../../components/button/button";
import {Formik, FormikHelpers, FormikValues} from 'formik'
import {useNavigate} from '@reach/router'
import populateCreateFormFields from "../../../../constants/populateCreateFormFields";

interface ICreate {
    data: { [key: string]: Object }
    fields: Array<IItem>
    crudKey?: string
    title: string
}


const Create: React.FC<ICreate> = (
    {
        fields,
        crudKey,
        data,
        children
    }) => {
    const navigate = useNavigate()
    const create = async (values: FormikValues, {setSubmitting}: FormikHelpers<FormikValues>) => {
        setSubmitting(true)
        const formData: FormData = new FormData()
        formData.append('value', JSON.stringify(values))
       /// const res: any = await BeneficiaryItemAPI.store(formData, crudKey)
      ///  if (Number(res.status === 200)) navigate('/admin/adminBeneficiaries')
    }

    return (
        <div>

            <Formik
                selectOptions={data}
                initialValues={populateCreateFormFields(fields, data)}
                onSubmit={create}
            >
                {({
                      handleSubmit,
                      handleChange,
                      values,
                      setFieldValue,
                  }) => {
                    return (
                        <>
                            <form className={s.form}>
                                {
                                    fields
                                        .map((field, index) => {
                                                if (data[field.name]) {
                                                    return <div key={index} className={s.item}>
                                                        <FormikHandler
                                                            item={field}
                                                            handleChange={handleChange}
                                                            values={values}
                                                            setFieldValue={setFieldValue}
                                                            selectOptions={data[field.name]}
                                                        />
                                                    </div>
                                                } else {
                                                    return <div key={index} className={s.item}>
                                                        <FormikHandler
                                                            item={field}
                                                            handleChange={handleChange}
                                                            values={values}
                                                            setFieldValue={setFieldValue}
                                                        />
                                                    </div>
                                                }

                                            }
                                        )
                                }
                                <div className={s.buttonDiv}>
                                    <Button
                                        type={'adminUpdate'}
                                        onClick={handleSubmit}
                                        className={'admin'}
                                    >
                                        {children}
                                    </Button>
                                </div>

                            </form>

                        </>

                    )
                }
                }

            </Formik>

        </div>
    )
}


export default Create