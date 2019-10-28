import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import InfiniteScroll from 'react-infinite-scroller';

import { appendGames } from '../../../../store/actions/Games';
import GamesGrid from '../Sets/GamesGrid';
import GamesProgress from '../Progresses/GamesProgress';

class GamesInfiniteLoader extends Component {
    static propTypes = {
        games: PropTypes.array.isRequired,
        gamesLoading: PropTypes.bool.isRequired
    };

    constructor(props) {
        super(props);

        this.load = this.load.bind(this);
    }

    load(offset) {
        this.props.appendGames(offset, 10);
    }

    render() {
        return (
            <div>
                {
                    <div>
                        <InfiniteScroll pageStart={0} loadMore={this.load} hasMore={true || false} loader={<GamesProgress />}>
                            <GamesGrid games={this.props.games} />
                        </InfiniteScroll>
                    </div>
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    games: state.games.games,
    gamesLoading: state.games.gamesLoading
});

export default connect(mapStateToProps, { appendGames })(GamesInfiniteLoader);