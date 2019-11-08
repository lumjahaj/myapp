import React, { Component } from 'react'
import { getMovies } from '../services/fakeMovieService'
import { getGenres } from '../services/fakeGenreService'
import Pagination from './pagination'
import { paginate } from '../utils/paginate'
import ListGroup from './listGroup'


class Movies extends Component {
    state = {
        movies: getMovies(),
        genres: getGenres(),
        pageSize: 4,
        currentPage: 1
    }

    handleDelete = (movie) => {
        const movies = this.state.movies.filter(m => m._id !== movie._id)
        this.setState({ movies })
    }

    handlePageChange = page => {
        this.setState({ currentPage: page });
    }

    handleGenreSelect = genre => {
        console.log(genre)
    }

    render() {
        const { length: count } = this.state.movies;
        const { pageSize, currentPage, movies: allMovies } = this.state;

        if (count === 0) return <p>There are no movies</p>;

        const movies = paginate(allMovies, currentPage, pageSize)

        return (
            <div className="row">
                <div className="col-3">
                    <ListGroup
                        items={this.state.genres}
                        valueProperty='_id'
                        textProperty='name'
                        onItemSelect={this.handleGenreSelect}
                    />
                </div>
                <div className="col">
                    <p>Showing {count} movies</p>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Genre</th>
                                <th>Stock</th>
                                <th>Rate</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {movies.map(movie => <tr>
                                <td>{movie.title}</td>
                                <td>{movie.genre.name}</td>
                                <td>{movie.numberInStock}</td>
                                <td>{movie.dailyRentalRate}</td>
                                <td><button onClick={() => this.handleDelete(movie)} className="btn btn-danger btn-sm">Delete</button></td>
                            </tr>)}
                        </tbody>
                    </table>
                    <Pagination
                        itemsCount={count}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={this.handlePageChange}
                    />
                </div>
            </div>
        );
    }
}

export default Movies;