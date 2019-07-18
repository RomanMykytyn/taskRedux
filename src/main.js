import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { connect } from 'react-redux';
import { itemsFetchData } from './actions/items';

const store = configureStore();

class ItemList  extends React.Component {

  componentDidMount() {
    console.log(this.props.fetchData);
    this.props.fetchData('http://5826ed963900d612000138bd.mockapi.io/items');
    console.log('hggjh');
  }


  render () {
    if (this.props.hasErrored) {
        return <p>Sorry! There was an error loading the items</p>;
    }

    if (this.props.isLoading) {
        return <p>Loading…</p>;
    }
    if (this.props.items) {
    return (
        <ul>
            {this.props.items.map((item) => (
                <li key={item.id}>
                    {item.label}
                </li>
            ))}
        </ul>
    );}
    return (null)
  }
}

const mapStateToProps = (state) => {
    return {
        items: state.items,
        hasErrored: state.itemsHasErrored,
        isLoading: state.itemsIsLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(itemsFetchData(url))
    };
};

var Item2 = connect(mapStateToProps, mapDispatchToProps)(ItemList);

ReactDOM.render(<Provider store={store}>
                  <Item2 />
                </Provider>,
                document.getElementById("root"));
