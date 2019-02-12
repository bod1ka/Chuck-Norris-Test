import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { addFavourite, getRandomJokes, removeFavourite } from "../../actions";
import { jokesSelector } from "../../selectors";


class JokesListContainer extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            errors: []
        };

        this.onFetchJokes = this.onFetchJokes.bind(this);
        this.onRemoveFromFavourites = this.onRemoveFromFavourites.bind(this);
        this.onAddToFavouriteList = this.onAddToFavouriteList.bind(this);
        this.onShowFavourites = this.onShowFavourites.bind(this);
    }

    componentDidMount() {
        if (this.props.isFetching || this.props.items.length) {
            return;
        }
        this.props.dispatch(getRandomJokes());
    }

    onShowFavourites() {
        this.props.history.push('/favourite');
    }

    onFetchJokes() {
        if (this.props.isFetching) {
            return;
        }
        this.props.dispatch(getRandomJokes())
            .then(() => {
                this.clearErrors();
            })
            .catch((error) => {
                console.error(error);
                this.setState({
                    errors: [`Can't fetch jokes`]
                });

                setTimeout(() => {
                    this.setState(() => {
                        return {
                            errors: []
                        }
                    });
                }, 5000);
            });
    }

    onAddToFavouriteList({id, joke}) {
        this.props.dispatch(addFavourite({id, joke}));
    }

    onRemoveFromFavourites(joke) {
        this.props.dispatch(removeFavourite(joke.id));
    }

    clearErrors() {
        if (this.state.errors.length) {
            this.setState({
                errors: []
            });
        }
    }

    render() {

        const {
            errors
        } = this.state;

        const {
            items,
            isFetching
        } = this.props;

        return (
            <div className="jokes-list col-12">
                {errors.length > 0 && <div className="row mb-2 justify-content-center">
                    <div className="col-6">
                        <div className="error-box">
                            {
                                errors.map((message, index) => {
                                    return <h4 key={index}>{message}</h4>
                                })
                            }
                        </div>
                    </div>
                </div>
                }
                <div className="row justify-content-center">
                    <button className="button" onClick={this.onShowFavourites}>
                        Show me my favourites!
                    </button>
                    <button className="button" onClick={this.onFetchJokes} disabled={isFetching}>
                        {!isFetching ? 'Please Chuck give me more!' :
                            <div>
                                Loading <i className="fas fa-spinner fa-spin"></i>
                            </div>
                        }
                    </button>
                </div>
                <ul className="list">
                    {
                        items.length > 0 && items.map((item) => {
                            return <li className="list__item" key={item.id}>
                                <div dangerouslySetInnerHTML={{
                                    '__html': item.joke
                                }}></div>
                                <div className="list-item__actions">
                                    {
                                        item.canBeFavoured &&
                                        <button className="button button--icon-only" title="Add to favourite list"
                                                onClick={() => {
                                                    this.onAddToFavouriteList(item);
                                                }}>
                                            <i className="fas fa-star"></i>
                                        </button>
                                    }
                                    {
                                        item.isFavourite &&
                                        <button className="button button--icon-only" title="Remove from favourites"
                                                onClick={() => {
                                                    this.onRemoveFromFavourites(item);
                                                }}>
                                            <i className="fas fa-trash-alt"></i>
                                        </button>
                                    }
                                </div>
                            </li>
                        })
                    }
                </ul>
            </div>
        );
    }
}

JokesListContainer.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        joke: PropTypes.string,
        isFavourite: PropTypes.bool,
        canBeFavoured: PropTypes.bool
    }))
};

JokesListContainer.defaultProps = {
    items: [],
    isFetching: false
};


function mapStateToProps(state) {
    return {
        items: jokesSelector(state),
        isFetching: state.jokes.isFetching
    };
}

export default withRouter(connect(mapStateToProps)(JokesListContainer));
