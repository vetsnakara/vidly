/* eslint-disable react/jsx-fragments */
/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
/* eslint-disable react/state-in-constructor */

// todo: add like to db

import Joi from 'joi-browser';

import React from 'react';
import { toast } from 'react-toastify';

import Form from './Form';

import { getGenres } from '../services/genreService';
import { getMovie, saveMovie } from '../services/movieService';

import { mapModelToView } from '../utils/mapModelToView';

class MovieForm extends Form {
  constructor(props) {
    super(props);

    // extend Form's state
    this.state.data = {
      _id: '',
      title: '',
      genreId: '',
      numberInStock: '',
      dailyRentalRate: '',
      genres: [],
      // liked: false,
    };
  }

  validateSchema = {
    _id: Joi.string().allow(''),
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
    liked: Joi.boolean(),
    genres: Joi.array(),
  };

  async doSubmit() {
    const { genres, ...movie } = this.state.data;

    try {
      await saveMovie(movie);

      const toastMessage = movie._id
        ? 'Movie successfully updated!'
        : 'Movie successfully added!';

      toast.success(toastMessage);

      this.props.history.push('/movies');
    } catch (ex) {
      if (ex.response) {
        toast.info(ex.response.data);
      }
    }
  }

  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovie();
  }

  async populateGenres() {
    const genres = await getGenres();

    this.setState(({ data }) => ({
      data: { ...data, genres },
    }));
  }

  async populateMovie() {
    const { id } = this.props.match.params;

    if (id === 'new')
      return this.setState({
        loading: false,
      });

    try {
      const movie = await getMovie(id);

      this.setState(({ data: { genres } }) => ({
        data: {
          ...mapModelToView(movie),
          genres,
        },
        loading: false,
      }));
    } catch (err) {
      if (err.response && err.response.status === 404) {
        this.props.history.replace('/not-found');
      }
    }
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
