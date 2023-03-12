import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FieldProps, getIn  } from 'formik';
import { Button, Input, Label, Message, Dropdown } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';

const initialValues = {
  repositoryName: '',
  status: '',
  queuedAt: '',
  scanningAt: '',
  finishedAt: '',
  findings: []
};

type CustomErrorMessageProps = {
  name: string;
  basic?: boolean;
};

const CustomErrorMessage: React.FC<CustomErrorMessageProps> = ({ name, basic = false }) => {
  return (
    <ErrorMessage name={name}>
      {(errorMessage) => (
        <Label basic={basic} color="red" pointing="above" style={{ marginTop: '0.5em' }}>
          {errorMessage}
        </Label>
      )}
    </ErrorMessage>
  );
};

const ScanResultForm = () => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  let navigate = useNavigate();

  const onSubmit = async (values) => {   

for(var finding = 0;finding<values.findings.length;finding++){
  values.findings[finding] = JSON.parse(values.findings[finding])
}

    try {
      const response = await fetch('http://localhost:3000/results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (!response.ok) {
        const errorMessage = await response.text(); // extract error message from response
        setErrorMessage(JSON.parse(errorMessage).message);

        throw new Error(`Failed to submit scan result: ${JSON.parse(errorMessage)}`); // include error message in thrown Error object
      }
      setShowSuccessMessage(true);

      navigate("/scan-results");

      // TODO: Show success message to user


    } catch (error) {
      console.error('Error submitting scan result:', error);
      // TODO: Show error message to user
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ values, handleSubmit, handleChange, handleBlur, isSubmitting, errors }) => (
        <Form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
          <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Scan Result Form</h1>
          {showSuccessMessage && (
  <Message success style={{ backgroundColor: '#f4faff', color: '#1a1a1a', border: '1px solid #d9d9d9' }}>
    <Message.Header style={{ color: '#008000' }}>Success!</Message.Header>
    <p>Your scan result has been submitted.</p>
  </Message>
)}

{errorMessage && (
  <Message negative>
    <Message.Header>Error!</Message.Header>
    <p>{errorMessage}</p>
  </Message>
)}

          <Field name="repositoryName">
            {({ field }) => (
              <div style={{ marginBottom: '20px' }}>
                <label htmlFor="repositoryName" style={{ display: 'block', marginBottom: '5px' }}>Repository Name</label>
                <Input type="text" {...field} placeholder="Enter repository name" />
                <CustomErrorMessage name="repositoryName" />
              </div>
            )}
          </Field>
          <Field name="status">
  {({ field }) => (
    <div style={{ marginBottom: '20px' }}>
      <label htmlFor="status" style={{ display: 'block', marginBottom: '5px' }}>Status</label>
      <div>
        <label>
          <input type="radio" id="queued" {...field} value="Queued" checked={field.value === "Queued"} />
          Queued
        </label>
        <br />
        <label>
          <input type="radio" id="inProgress" {...field} value="In Progress" checked={field.value === "In Progress"} />
          In Progress
        </label>
        <br />
        <label>
          <input type="radio" id="success" {...field} value="Success" checked={field.value === "Success"} />
          Success
        </label>
        <br />
        <label>
          <input type="radio" id="failure" {...field} value="Failure" checked={field.value === "Failure"} />
          Failure
        </label>
      </div>
      <CustomErrorMessage name="status" />
    </div>
  )}
</Field>
      
      <Field name="queuedAt">
        {({ field }) => (
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="queuedAt" style={{ display: 'block', marginBottom: '5px' }}>Queued At</label>
            <Input type="datetime-local" {...field} placeholder="Enter queued time" />
            <CustomErrorMessage name="queuedAt" />
          </div>
        )}
      </Field>
      <Field name="scanningAt">
        {({ field }) => (
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="scanningAt" style={{ display: 'block', marginBottom: '5px' }}>Scanning At</label>
            <Input type="datetime-local" {...field} placeholder="Enter scanning time" />
            <CustomErrorMessage name="scanningAt" />
          </div>
        )}
      </Field>
      <Field name="finishedAt">
        {({ field }) => (
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="finishedAt" style={{ display: 'block', marginBottom: '5px' }}>Finished At</label>
            <Input type="datetime-local" {...field} placeholder="Enter finish time" />
            <CustomErrorMessage name="finishedAt" />
          </div>
        )}
      </Field>
      <Field name="findings">
        {({ field, form }) => (
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Findings</label>
            <Button
              type="button"
              color="green"
              size="tiny"
              onClick={() => form.setFieldValue('findings', [...field.value, ''])}
            >
              Add Finding
            </Button>
            {field.value.map((finding, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', marginTop: '5px' }}>
                <Field name={`findings.${index}`}>
                  {({ field }) => (
                    <Input
                      {...field}
                      style={{ marginRight: '5px' }}
                      placeholder={`Enter finding #${index + 1}`}
                    />
                  )}
                </Field>
                <Button
                  type="button"
                  color="red"
                  size="tiny"
                  onClick={() => {
                    const findings = [...field.value];
                    findings.splice(index, 1);
                    form.setFieldValue('findings', findings );
                  }}
                >
                  Remove
                </Button>
                {index === field.value.length - 1 && (
                  <CustomErrorMessage name="findings" basic={true} />
                )}
              </div>
            ))}
          </div>
        )}
      </Field>
      <Button type="submit" color="green" disabled={isSubmitting}>
        Submit
      </Button>
    </Form>
  )}
</Formik>
);
};

export default ScanResultForm;