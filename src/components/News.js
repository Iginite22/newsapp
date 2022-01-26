import React, {useEffect, useState} from 'react'

import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

// document.title = `${this.capitalizeFirstLetter(
//   props.category
// )}-NewsBuddy`;
const News=(props)=> {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;
    updateNews(); 
}, [])
const fetchMoreData = async () => {   
  const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
  setPage(page+1) 
  let data = await fetch(url);
  let parsedData = await data.json()
  setArticles(articles.concat(parsedData.articles))
  setTotalResults(parsedData.totalResults)
};
  const updateNews = async ()=> {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`; 
    setLoading(true)
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json()
    props.setProgress(70);
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    props.setProgress(100);
}
  const updateNext = async () => {
    // if (
    //   !(
    //     this.state.page + 1 >
    //     Math.ceil(this.state.totalResults / props.pageSize)
    //   )
    // ) {
    //   let url = `https://newsapi.org/v2/top-headlines?country=${
    //     props.country
    //   }&category=${
    //     props.category
    //   }&apiKey=82a2103797bd4bdebd2e0dedc5430b93&page=${
    //     this.state.page + 1
    //   }&pageSize=${props.pageSize}`;
    //   let data = await fetch(url);
    //   this.setState({ loading: true });
    //   let parsedData = await data.json();
    //   this.setState({
    //     articles: parsedData.articles,
    //     page: this.state.page + 1,
    //     loading: false,
    //   });
    // }
    setPage(page+1);
    updateNews();
  };
  const updatePrev = async () => {
    // console.log("cdn");
    // let url = `https://newsapi.org/v2/top-headlines?country=${
    //   props.country
    // }&category=${
    //   props.category
    // }&apiKey=82a2103797bd4bdebd2e0dedc5430b93&page=${
    //   this.state.page - 1
    // }&pageSize=${props.pageSize}`;
    // let data = await fetch(url);
    // this.setState({ loading: true });
    // let parsedData = await data.json();
    // this.setState({
    //   articles: parsedData.articles,
    //   page: this.state.page - 1,
    //   loading: false,
    // });
    setPage(page-1);
     updateNews();
  };
    return (
      <>
        <div
          className="container"
          style={{
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
            marginTop:"90px",
            marginBottom:"10px"
          }}
          >
          <h2
            style={{
              textAlign: "center",
              backgroundColor: "#e0e0e0",
              borderRadius: "10px",
            }}
            >
            Top {capitalizeFirstLetter(props.category)} Headlines
          </h2>
            {loading&&<Spinner></Spinner>}
        </div>
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length!==totalResults}
          loader={<Spinner/>}
        >
          <div className="container"style={{
            width:"100%",
            display: "flex",
            justifyContent: "center",
          }}>
          <div className="row">
            {!loading &&
              articles.map((element) => {
                return (
                  <div className="col md-4 my-3 mx-5" key={element.url}>
                    <NewsItem
                      title={element.title ? element.title.slice(0, 45) : ""}
                      description={
                        element.description
                          ? element.description.slice(0, 88)
                          : ""
                      }
                      imageUrl={element.urlToImage}
                      newsUrl={element.url}
                      author={element.author}
                      time={element.publishedAt}
                    />
                  </div>
                );
              })}
          </div>
          </div>
        </InfiniteScroll>
        {/* <div className="container  d-flex justify-content-between">
          <button
            disabled={page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={updatePrev}
          >
            &#8592; Previous
          </button>
          <button
            disabled={
              page + 1 >
              Math.ceil(totalresults / props.pageSize)
            }
            type="button"
            className="btn btn-dark"
            onClick={updateNext}
          >
            Next &#8594;
          </button>
        </div> */}
      </>
    );
}
News.defaultProps = {
  country: "in",
  pageSize: 6,
  category: "science",
};
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};
export default News