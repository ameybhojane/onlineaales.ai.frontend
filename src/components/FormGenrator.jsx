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
        initalFormValues = { ...initalFormValues, [fields[i].label]: "" }
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
                                    {field.options.map((option, j) => (
                                        <div key={j}>
                                            <Input
                                                id={option + j}
                                                name={field.label} // Use the field label as the name
                                                type="radio"
                                                value={option}
                                                onChange={(e) => {
                                                    const fieldName = e.target.name;
                                                    const selectedValue = e.target.value;
                                                    setFormValues({ ...formValues, [fieldName]: selectedValue });
                                                }}
                                                checked={formValues[field.label] === option}
                                            />
                                            <Label for={option + j}>{option}</Label>
                                        </div>
                                    ))}

                                </FormGroup>
                            </Col>
                            <Col md={3} className="d-flex align-items-center">
                                <FormGroup>
                                    <Button type="submit" onClick={(e) => {
                                        e.preventDefault()
                                        const newFields = fields.filter((f, idx) => i !== idx);
                                        let newFormValues = Object.assign({}, formValues);;
                                        delete newFormValues[field?.label];
                                        setFormValues(newFormValues)
                                        setFields(newFields)
                                    }}>Remove</Button>
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
                                    <Label for={field?.id}>{field?.label}</Label>
                                    <Select
                                        id={field?.id}
                                        style={{ width: 200 }}
                                        options={formattedOptions}
                                        value={formValues[field.label]}
                                        onChange={(e) => {
                                            setFormValues({ ...formValues, [field?.label]: e })
                                        }}
                                    >{field?.label}</Select>
                                </FormGroup>
                            </Col>
                            <Col md={3} className="d-flex align-items-center">
                                <FormGroup>
                                    <Button type="submit" onClick={(e) => {
                                        e.preventDefault()
                                        const newFields = fields.filter((f, idx) => i !== idx);
                                        let newFormValues = Object.assign({}, formValues);
                                        delete newFormValues[field?.label];
                                        setFormValues(newFormValues)
                                        setFields(newFields)
                                    }}>Remove</Button>
                                </FormGroup>
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
                                        value={formValues[field?.label]}
                                        onChange={(e) => {
                                            if (field?.type === "checkbox")
                                                setFormValues({ ...formValues, [field?.label]: e.target.checked })
                                            else
                                                setFormValues({ ...formValues, [field?.label]: e.target.value })
                                        }}
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={3} className="d-flex align-items-center">
                                <FormGroup>
                                    <Button type="submit" onClick={(e) => {
                                        e.preventDefault()
                                        debugger
                                        const newFields = fields.filter((f, idx) => i !== idx);
                                        let newFormValues = Object.assign({}, formValues);
                                        delete newFormValues[field?.label];
                                        setFormValues(newFormValues)
                                        console.log({ newFields })
                                        setFields(newFields)
                                    }}>Remove</Button>
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