import React from 'react'
import Select from 'react-select'
import makeAnimated from 'react-select/animated';

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]
  const animatedComponents = makeAnimated();

const AddTag = ({nextStep, ...props}) => {
  return (
    <div className="wizard-main-content">
        <div className='add-tag-contact'>
            <div className="main-form">
                <div className="field-group">
                    <label> Select Tag </label>
                    <Select 
                        defaultValue={[options[2], options[3]]}
                        isMulti
                        name="colors"
                        components={animatedComponents}
                        options={options}
                        className="basic-multi-select"
                        classNamePrefix="select"
                    />
                </div>
                <div className="field-group flexFull text-center mt-5 mb-0">
                    <button
                        type="button"
                        className="btn btn-cancel me-3"
                        onClick={props.onClose}
                    >
                        {" "}
                        Dismiss{" "}
                    </button>
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={nextStep}
                    >
                        {" "}
                        Proceed{" "}
                    </button>
                    </div>
            </div>
        </div>
    </div>
  )
}

export default AddTag