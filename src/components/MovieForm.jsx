/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
/* eslint-disable react/state-in-constructor */

import Joi from 'joi-browser';

import React from 'react';
import Form from './Form';

import { getGenres } from '../services/fakeGenreService';
import { getMovie } from '../services/fakeMovieService';

class MovieForm extends Form {
  state = {
    data: {
      title: '',
      genreId: '',
      numberInStock: '',
      rate: '',
      genres: [],
    },
    errors: {},
    loading: true,
  };

  validateSchema = {
    title: Joi.string()
      .required()
      .label('Title'),
    genre: Joi.string()
      .required()
      .label('Genre'),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label('Number in stock'),
    rate: Joi.number()
      .required()
      .min(0)
      .max(10)
      .label('Rate'),
    genres: Joi.array(),
  };

  doSubmit() {
    const { history } = this.props;
    history.push('/movies');
  }

  async componentDidMount() {
    const { id } = this.props.match.params;

    const [movie, genres] = await Promise.all([getMovie(id), getGenres()]);

    if (!movie) return this.props.history.replace('/not-found');

    const {
      title,
      genre: { _id: genre },
      numberInStock,
      dailyRentalRate: rate,
    } = movie;

    this.setState({
      data: {
        title,
        genre,
        numberInStock,
        rate,
        genres,
      },
    });
  }

  render() {
    const { genre } = this.state.data;

    return (
      <div>
        <h1 className="mb-3">Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput({
            name: 'title',
            label: 'Title',
          })}
          {this.renderSelect({
            name: 'genre',
            label: 'Genre',
            selectedValue: genre,
          })}
          {this.renderInput({
            name: 'numberInStock',
            label: 'Number in stock',
            type: 'number',
          })}
          {this.renderInput({
            name: 'rate',
            label: 'Rate',
            type: 'number',
          })}
          {this.renderSubmitButton('Save')}
        </form>
      </div>
    );
  }
}

export default MovieForm;
