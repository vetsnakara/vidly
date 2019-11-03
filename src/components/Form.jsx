/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
/* eslint-disable react/state-in-constructor */
import Joi from 'joi-browser';

import React, { Component } from 'react';
import Input from './Input';
import Select from './Select';

class Form extends Component {
  static collectErrorMessages(error) {
    return error.details.reduce((all, current) => {
      const { path, message } = current;
      const [name] = path;

      return { ...all, [name]: message };
    }, {});
  }

  state = {
    errors: {},
    loading: true,
  };

  handleSubmit = e => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    // todo: делать setState не только для errors, но и для данных (приведенных к нужным типам)
    if (errors) return;

    this.doSubmit();
  };

  handleChange = ({ target: input }) => {
    const { name, value } = input;

    this.setState(state => {
      const { data } = state;
      const errors = { ...state.errors };

      const errorMessage = this.validateInput(input);
      if (errorMessage) errors[name] = errorMessage;
      else delete errors[name];

      return {
        data: {
          ...data,
          [name]: value,
        },
        errors,
      };
    });
  };

  // eslint-disable-next-line class-methods-use-this
  validate() {
    const { data } = this.state;

    const validationOptions = {
      abortEarly: false,
    };

    const results = Joi.validate(data, this.validateSchema, validationOptions);

    let { error } = results;

    if (!error) return null;

    error = this.constructor.collectErrorMessages(error);

    console.log(error);

    return error;
    // todo: возвращать не только ошибки, но и сконвертированные к нужным типам данные
  }

  validateInput({ name, value }) {
    const input = { [name]: value };

    const schema = { [name]: this.validateSchema[name] };

    const { error } = Joi.validate(input, schema);
    const message = error ? error.details[0].message : null;

    return message;
  }

  renderSubmitButton(label) {
    const { loading } = this.state;

    return (
      <button
        disabled={loading || this.validate()}
        type="submit"
        className="btn btn-primary"
      >
        {label}
      </button>
    );
  }

  renderInput(options) {
    const { name, label, type = 'text', ...rest } = options;

    const { data, errors } = this.state;

    return (
      <Input
        type={type}
        name={name}
        label={label}
        onChange={this.handleChange}
        value={data[name]}
        error={errors[name]}
        {...rest}
      />
    );
  }

  renderSelect(options) {
    const { name, label, itemsFieldName = `${name}s`, selectedValue } = options;
    const { data, errors } = this.state;

    return (
      <Select
        name={name}
        label={label}
        items={data[itemsFieldName]}
        selectedValue={selectedValue}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }
}

export default Form;
