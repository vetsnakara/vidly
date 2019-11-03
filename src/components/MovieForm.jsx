/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
/* eslint-disable react/state-in-constructor */

// todo: add like to db

import Joi from 'joi-browser';

import React from 'react';
import Form from './Form';

import { getGenres } from '../services/fakeGenreService';
import { getMovie, saveMovie } from '../services/fakeMovieService';

class MovieForm extends Form {
  constructor(props) {
    super(props);

    // extend Form's state
    this.state.data = {
      title: '',
      genreId: '',
      numberInStock: '',
      dailyRentalRate: '',
      genres: [],
    };
  }

  validateSchema = {
    title: Joi.string()
      .required()
      .label('Title'),
    genreId: Joi.string()
      .required()
      .label('Genre'),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label('Number in stock'),
    dailyRentalRate: Joi.number()
      .required()
      .min(0)
      .max(10)
      .label('Rate'),
    genres: Joi.array(),
  };

  async doSubmit() {
    const { id: _id } = this.props.match.params;
    const { title, genreId, numberInStock, dailyRentalRate } = this.state.data;

    const movie = await saveMovie({
      _id,
      title,
      genreId,
      numberInStock,
      dailyRentalRate,
    });

    console.log(movie);

    this.props.history.push('/movies');
  }

  async componentDidMount() {
    const { id } = this.props.match.params;

    const [movie, genres] = await Promise.all([getMovie(id), getGenres()]);

    if (!movie) return this.props.history.replace('/not-found');

    const {
      title,
      genre: { _id: genreId },
      numberInStock,
      dailyRentalRate,
    } = movie;

    this.setState({
      data: {
        title,
        genreId,
        numberInStock,
        dailyRentalRate,
        genres,
      },
      loading: false,
    });
  }

  render() {
    const { data, loading } = this.state;
    const { genreId } = data;

    if (loading) return <p>Loading movie ...</p>;

    return (
      <div>
        <h1 className="mb-3">Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput({
            name: 'title',
            label: 'Title',
            autoFocus: true,
          })}
          {this.renderSelect({
            name: 'genreId',
            label: 'Genre',
            selectedValue: genreId,
            itemsFieldName: 'genres',
          })}
          {this.renderInput({
            name: 'numberInStock',
            label: 'Number in stock',
            type: 'number',
          })}
          {this.renderInput({
            name: 'dailyRentalRate',
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
