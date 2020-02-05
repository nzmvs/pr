import React, { Component } from 'react';
import { getCategoryList } from './state/category';
import './Category.scss';

function Card(props){
  return (
    <div className="card">
      <div>{'Betyg: ' + props.rating + ' av 5'}</div>
      <div>{props.name}</div>
      <div>{props.description}</div>
      <div>{props.price}</div>
    </div>
  )
}

export default class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      items: 5,
      category: "",
      products: [],
      searchFor: ""
    };

    this.showMore = this.showMore.bind(this);
    this.showLess = this.showLess.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  showMore() {
    const data = getCategoryList();
    const news = data.products
      .slice(
        this.state.page * this.state.items, 
        this.state.page * this.state.items + this.state.items)
    const update = this.state.products.concat(news);
    
    this.setState({
      page: this.state.page + 1,
      products: update
    })
  }

  showLess() {
    if (this.state.page === 1) {
      this.setState({
        page: 0,
        products : [],
      })
    }
    
    const update = this.state.products
      .slice(0, this.state.page * this.state.items);

    this.setState({
      page: this.state.page - 1,
      products: update
    });
  }

  handleKeyUp(e) {
    if (e.keyCode === 13) {
      this.search();
      this.setState({searchFor: ""});
    } else {
      this.handleInput(e);
    }
  }

  handleInput(e) {
    const current = this.state.searchFor;
    const news = current + String.fromCharCode(e.keyCode).toLowerCase();
    this.setState({searchFor: news});
  }

  search() {
    const data = getCategoryList();
    const prods = data.products;
    const word = this.state.searchFor;
    const result = prods.filter(obj => obj.name.toLowerCase().includes(word));
    
    this.setState({products: result});
  }

  componentDidMount() {
    const loadedData = getCategoryList();
    const products = loadedData.products;
    
    this.setState({
      page: 1,
      category: loadedData.category.name, 
      products: products.slice(0, this.state.items)
    });
  }

  render() {
    const cards = this.state.products
      .map(prod => <Card prop
        key={prod.id} 
        name={prod.name}
        rating={prod.rating.averageRating}
        description={prod.description}
        price={prod.cheapestPrice.amount + " " + prod.cheapestPrice.currency}
        />)
    
    return (
      <div className="hello-world">
        <h1 className="row">
          {this.state.category}
        </h1>

        <div>
          <input type="text" className="search-bar" placeholder="Sök: skriv och tryck 'Enter'" onKeyUp={(e) => this.handleKeyUp(e)}/>
        </div>

        <div className="card-board">
          {cards}
        </div>

        <div>
          <button className="get-more" onClick={this.showLess}>
            {'Visa färre'}
          </button>
          <button className="get-more" onClick={this.showMore}>
            {'Visa fler'}
          </button>
        </div>
      </div>
    );
  }
}
