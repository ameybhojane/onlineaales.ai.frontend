import React, { useState } from 'react';
import {
    Input,
    Form,
    Label,
    FormGroup,
    Col,
    Row,
    Container,
} from 'reactstrap';
import FormGenrator from './FormGenrator';

function Home() {
    const [fields, setFields] = useState([]);
    const [fieldValues, setFieldValues] = useState({
        type: "",
        label: "",
        options: ""
    });


    const addField = (e) => {
        e.preventDefault();
        const n = fields.length;
        const newFieldValues = {
            ...fieldValues,
            id: `fieldId${n}`,
            options: fieldValues.options?.split(",")
        }
        setFields([...fields, newFieldValues]);
        setFieldValues({
            type: "",
            label: "",
            options: ""
        });
    }

    return (
        <>
            <Form onSubmit={addField} className="border-bottom-0">
                <Container >
                    <Row>
                        <Col md={3}>
                            <FormGroup>
                                <Label for="exampleSelect">Input Type</Label>
                                <Input
                                    id="exampleSelect"
                                    name="select"
                                    type="select"
                                    value={fieldValues.type}
                                    onChange={(e) => setFieldValues({ ...fieldValues, type: e.target.value })}
                                >
                                    <option value="text">Text</option>
                                    <option value="select">DropDown</option>
                                    <option value="radio">Radio</option>
                                    <option value="textarea">Text Area</option>
                                    <option value={"checkbox"}>Checkbox</option>
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <Label for="exampleSelect">Label</Label>
                                <Input
                                    id="Input Label"
                                    name="Input Type"
                                    type="text"
                                    value={fieldValues.label}
                                    onChange={(e) => setFieldValues({ ...fieldValues, label: e.target.value })}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            {(fieldValues.type === "select" || fieldValues.type === "radio") && (
                                <FormGroup>
                                    <Label for="exampleSelect">Select Options</Label>
                                    <Input
                                        id="SelectOptions"
                                        name="Options"
                                        type="textarea"
                                        value={fieldValues.options}
                                        placeHolder="Please enter the DropDown Option seprated by commas"
                                        onChange={(e) => setFieldValues({ ...fieldValues, options: e.target.value })}
                                    />
                                </FormGroup>
                            )}
                        </Col>
                        <Col md={3} className="d-flex align-items-center">
                            <FormGroup>
                                <Input type="submit" value={"Add Field"} />
                            </FormGroup>
                        </Col>
                    </Row>
                </Container>
            </Form>
            <Form>
                <Container>

                    <FormGenrator
                        fields={fields}
                        setFields={setFields}
                    />
                </Container>
            </Form>
        </>
    );
}



export default Home;
