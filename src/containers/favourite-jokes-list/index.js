import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";

import { getFavouriteJokes, removeFavourite } from "../../actions";
import { withRouter } from "react-router-dom";
import { MAX_JOKES } from "../../constants";

const POLLING_INTERVAL = 1000 * 5;

class FavouriteJokesListContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            timer: undefined,
            errors: []
        };

        this.onRemoveFromFavourites = this.onRemoveFromFavourites.bind(this);
        this.startPolling = this.startPolling.bind(this);
        this.togglePolling = this.togglePolling.bind(this);
        this.onShowRandom = this.onShowRandom.bind(this);
    }

    onRemoveFromFavourites(id) {
        this.props.dispatch(removeFavourite(id));
    }

    onShowRandom() {
        this.props.history.push('/');
    }

    startPolling() {
        this.stopPolling();

        this.setState({
            timer: setInterval(() => {
                if (this.props.isFetching) {
                    return;
                }
                if (this.props.items.length >= MAX_JOKES) {
                    this.stopPolling();
                    return;
                }
                this.props.dispatch(getFavouriteJokes())
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
                        }, 1000);
                    });
            }, POLLING_INTERVAL)
        })
    }

    stopPolling() {
        if (this.state.timer) {
            clearInterval(this.state.timer);
        }
        this.setState({
            timer: undefined
        });
    }

    togglePolling() {
        if (this.state.timer) {
            this.stopPolling();
            return;
        }
        this.startPolling();
    }

    componentWillUnmount() {
        clearInterval(this.state.timer);
    }

    render() {

        const {
            items
        } = this.props;

        const {
            timer,
            errors
        } = this.state;

        return (
            <div className="jokes-list col-12">
                {errors.length > 0 && <div className="row justify-content-center">
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
                    <button className="button" onClick={this.onShowRandom}>
                        Let's see some random jokes
                    </button>
                    {
                        items.length < 10 && <button className="button" onClick={this.togglePolling}>
                            {
                                !timer ? 'Give me more jokes!' : 'Stop getting me jokes'
                            }
                        </button>
                    }
                </div>
                <ul className="list">
                    {
                        items.length > 0 && items.map(({id, joke}) => {
                            return <li className="list__item" key={id}>
                                <div dangerouslySetInnerHTML={{
                                    '__html': joke
                                }}>
                                </div>
                                <div className="list-item__actions">
                                    <button className="button button--icon-only" title="Remove from favourites"
                                            onClick={() => {
                                                this.onRemoveFromFavourites(id);
                                            }}>
                                        <i className="fas fa-trash-alt"></i>
                                    </button>
                                </div>
                            </li>
                        })
                    }
                </ul>
            </div>
        );
    }
}


FavouriteJokesListContainer.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        joke: PropTypes.string
    }))
};

FavouriteJokesListContainer.defaultProps = {
    items: []
};

function mapStateToProps(state) {
    return {
        items: state.jokes.favouriteJokes
    };
}

export default withRouter(connect(mapStateToProps)(FavouriteJokesListContainer));
