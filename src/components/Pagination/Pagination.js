import React, { Component } from 'react';
import classes from './Pagination.module.css'

class Pagination extends Component {

    state ={
        pageNumberCeiling: 0
    }

    componentDidMount() {
        this.setState({
            pageNumberCeiling: Math.ceil(this.props.totalPosts / this.props.postsPerPage)
        })
        
    }

    increment = () => {
        const number = this.props.currentPageNumber + 1
        if (number <= this.state.pageNumberCeiling) { 
            this.props.currentPageHandler(number)
        }
        this.setState({
            pageNumberCeiling: Math.ceil(this.props.totalPosts / this.props.postsPerPage)
        })
        
    }

    decrement = () => {
        const number = this.props.currentPageNumber - 1
        if (number >= 1) {
            this.props.currentPageHandler(number)
        }
        this.setState({
            pageNumberCeiling: Math.ceil(this.props.totalPosts / this.props.postsPerPage)
        })
    }

    render () {
        
        const currentPageNumber = this.props.currentPageNumber;
        const postsPerPage = this.props.postsPerPage;
        const totalPosts = this.props.totalPosts;
        const pageLimit = Math.ceil(totalPosts / postsPerPage);

        const pageNumbers = [];
        if ( currentPageNumber + 4 < pageLimit) {
            
            for (let i = currentPageNumber; i <= currentPageNumber + 4; i++) {
                pageNumbers.push(i);
            }
        } else if ( pageLimit <= 5) {
            for (let i = 1; i <= pageLimit; i++) {
                pageNumbers.push(i);
            }
        } else {
            for (let i = pageLimit - 4; i <= pageLimit; i++) {
                pageNumbers.push(i);
            }
        }
  
        return (
            <div className={classes.PaginationBox}>
                {
                    currentPageNumber > 1 && pageLimit > 6? 
                    <button
                        style={{backgroundColor: "white", color: "black"}} 
                        key={"backToOne"} 
                        onClick={() => this.props.currentPageHandler(1)}
                    >
                        [1]
                    </button>
                    :
                    ""
                }

                {
                    currentPageNumber !== 1 ?
                    <button onClick={this.decrement}>
                        &laquo; Prev
                    </button>
                    :
                    ""
                }
                  
                {pageNumbers.map(number => (
                    <button
                        style={
                            number === currentPageNumber ? 
                            {
                                backgroundColor: "white",
                                color: "black"
                            } 
                            : 
                            null
                        }
                        key={number}
                        onClick={() => this.props.currentPageHandler(number)}
                    >
                        {number}
                    </button>
                ))}

                {
                    currentPageNumber !== pageLimit ?
                    <button onClick={this.increment}>
                        Next &raquo;
                    </button>
                    :
                    ""
                }

                

                {
                    currentPageNumber <= pageLimit - 5 ?
                    <button
                        style={{backgroundColor: "white", color: "black"}} 
                        key={"toLastPage"} 
                        onClick={() => this.props.currentPageHandler(pageLimit)}
                    >
                        [{pageLimit}]
                    </button>
                    :
                    ""
                }
            </div>
        )

    }
    
}

export default Pagination;