import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addToCart } from './actions/cartActions'


class Home extends Component {


    constructor(props){
        super(props)
        this.state={
            items:this.props.stateItems.items,
            inCart:this.props.stateItems.addedItems.map(o2 => o2.id),
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.stateItems !== prevProps.stateItems) {
            let data= this.props.stateItems
            console.log('update call----------------------',data.addedItems);
            let result =  data.addedItems.map(o2 => o2.id);
            this.setState({inCart:result})
            console.log('result----------------------',result)
   
        }
       }

    handleClick = (id) => {
       // alert(id)
        this.props.addToCart(id);
    }

    render() {
         console.log('this.state.items=========',this.props.stateItems)
        let itemList = this.state.items.map(item => {
            return (
                <table className= {this.state.inCart.includes(item.id)?"inCart":"card"} key={item.id}>

                    <tr>
                        <td>  <span className="card-image">
                            <img src={item.img} alt={item.title} />

                        </span></td>

                        <td>   <span className="card-title">{item.title}</span>
                            <span to="/" className="btn-floating halfway-fab waves-effect waves-light red"
                                onClick={() => { this.handleClick(item.id) }}><i className="material-icons">add</i>
                            </span></td>


                        <td><span className="card-content">
                            <p>{item.desc}</p>
                            <p><b>Price: {item.price}Rs/-</b></p>
                        </span></td>

                    </tr>

                </table >

            )
        })

        return (
            <div className="container">
                <h3 className="center">Available Products for buy</h3>
                <div className="box">
                    {itemList}
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        stateItems: state
    }
}
const mapDispatchToProps = (dispatch) => {

    return {
        addToCart: (id) => { dispatch(addToCart(id)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)