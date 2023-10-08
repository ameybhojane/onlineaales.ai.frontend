import { Select } from 'antd';
import React, { useState } from 'react';
import {
    Input,
    Label,
    FormGroup,
    Col,
    Row,
    Button
} from 'reactstrap';

import { Modal } from 'antd';

function FormGenrator(props) {
    const fields = props.fields
    const setFields = props.setFields;
    let initalFormValues = {}
    for (let i = 0; i < fields.length; i++) {
        initalFormValues = { ...initalFormValues, [fields[i].id]: "" }
    }
    const [formValues, setFormValues] = useState(initalFormValues)
    const [isOpen, setIsOpen] = useState(false)
    return (
        <>
            {fields.map((field, i) => {
                switch (field.type) {
                    case "radio":
                        return (<Row key={i}>
                            <Col md={6}>
                                <FormGroup>
                                    <p>{field.label}</p>
                                    {field.options.map((option, i) => (<><Input
                                        id={option + i}
                                        name={field.id}
                                        type={"radio"}
                                        onChange={(e) => {

                                            setFormValues({ ...formValues, [field?.id]: option })
                                        }}
                                    />
                                        <Label for={option + i}>{option}</Label></>))}
                                </FormGroup>
                            </Col>
                            <Col md={3} className="d-flex align-items-center">
                                <FormGroup>
                                    {/* <Button type="submit" onClick={(e) => {
                                        e.preventDefault()
                                        const newFields = [...fields.splice(0, i), ...fields.splice(i, field.length)];

                                        setFields(newFields)
                                    }}>Remove</Button> */}
                                </FormGroup>
                            </Col>
                        </Row>)
                    case "select":
                        const formattedOptions = field.options.map(option => ({
                            value: option,
                            label: option
                        }))
                        return (<Row key={field?.id}>
                            <Col md={6}>
                                <FormGroup>
                                    {/* <Label for={field?.id}>{field?.label}</Label> */}
                                    {/* <select
                                        id={field?.id}
                                        name={field?.label}
                                        type={field?.type}
                                    >{field?.label}
                                        {field.options.map((option, i) => (<><option
                                            value={option}
                                        >{option}</option>
                                        </>))}
                                    </select> */}
                                    <Select
                                        style={{ width: 200 }}
                                        options={formattedOptions}
                                        value={formValues[field.id]}
                                        onChange={(e) => {
                                            setFormValues({ ...formValues, [field?.id]: e })
                                        }}
                                    ></Select>
                                </FormGroup>
                            </Col>
                            <Col md={3} className="d-flex align-items-center">
                                {/* <FormGroup>
                                    <Button type="submit" onClick={(e) => {
                                        e.preventDefault()
                                        const newFields = fields.filter((f, idx) => i !== idx);
                                        setFields(newFields)
                                    }}>Remove</Button>
                                </FormGroup> */}
                            </Col>
                        </Row>)
                    default:
                        return (<Row key={i}>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for={field?.id}>{field?.label}</Label>
                                    <Input
                                        id={field?.id}
                                        name={field?.label}
                                        type={field?.type}
                                        value={formValues[field?.id]}
                                        onChange={(e) => {
                                            if (field?.type === "checkbox")
                                                setFormValues({ ...formValues, [field?.id]: e.target.checked })
                                            else
                                                setFormValues({ ...formValues, [field?.id]: e.target.value })
                                        }}
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={3} className="d-flex align-items-center">
                                <FormGroup>
                                    {/* <Button type="submit" onClick={(e) => {
                                        e.preventDefault()
                                        const newFields = fields.filter((f, idx) => i !== idx);
                                        console.log({ newFields })
                                        setFields(newFields)
                                    }}>Remove</Button> */}
                                </FormGroup>
                            </Col>

                        </Row>)
                }

            })}
            {fields.length !== 0 && <Col >
                <Button color='danger' onClick={() => {
                    setIsOpen(true)
                }}>Submit</Button>
            </Col>}
            <Modal title="Form Values" open={isOpen}
                cancelText={"Close"}
                okText={"Reset"}
                onCancel={() => {
                    setIsOpen(false)
                }}
                onOk={() => {
                    setFields([]);
                    setFormValues({});
                    setIsOpen(false)
                }}
            >
                <p>{JSON.stringify(formValues)}</p></Modal>
        </>
    );
}

export default FormGenrator