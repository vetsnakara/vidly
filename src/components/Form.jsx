/* eslint-disable react/state-in-constructor */
import Joi from 'joi-browser';

import { Component } from 'react';

class Form extends Component {
  static collectErrors(results) {
    console.log('collect');

    return results.details.reduce((all, current) => {
      const { path, message } = current;
      const [name] = path;

      return { ...all, [name]: message };
    }, {});
  }

  state = {
    data: {},
    errors: {},
  };

  handleSubmit = e => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
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

    const options = {
      abortEarly: false,
    };

    const { error: results } = Joi.validate(data, this.validateSchema, options);

    if (!results) return null;

    const errors = this.constructor.collectErrors(results);

    return errors;
  }

  validateInput({ name, value }) {
    const input = { [name]: value };

    const schema = { [name]: this.validateSchema[name] };

    const { error } = Joi.validate(input, schema);
    const message = error ? error.details[0].message : null;

    return message;
  }
}

export default Form;
