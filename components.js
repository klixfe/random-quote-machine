import React, { useState, useEffect, useCallback } from 'react'
import ReactDOM from 'react-dom'

//generic data fetcher
const fetchData = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        // let randInt = Math.floor(Math.random() * data.length);
        // setData(data[randInt]);
        setData(data);
        setLoading(false);
      });
  }, [url]);
  
  return {data, loading};
 }

//outputs text and author of randomly generated quote
function QuoteComponent() {
  const {data, loading} = fetchData("https://type.fit/api/quotes");
  const [randInt, setRandInt] = useState(Math.floor(Math.random() * 1000));
  
  const fetchQuote = useCallback(() => {
    setRandInt(Math.floor(Math.random() * data.length));
  });
    
  return (
    <>
      <div className="format-text text-area">
      {loading ? (<div> is loading... </div>) : (<div>
        <p id="text">{data[randInt].text}</p>
            <p id="author">{data[randInt].author && "-"}{data[randInt].author}</p>
      </div>)
      }
      </div>
      <div class="button-area">
        <Socials quote={loading ? "" :data[randInt]}/>
        <div class="submit">
          <button id="new-quote" type="submit" class="button button-hover" onClick={fetchQuote}>new quote</button>
        </div>
      </div>
    </>
  );
};

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

function Socials(props) {
  return (
      <a id="tweet-quote" href="https://twitter.com/intent/tweet" title="Tweet this quote!" target="_blank" class="social button-hover"
          href="https://twitter.com/intent/tweet"
  data-text={props.quote.text + ". As originally said from " + props.quote.author}
  data-url="https://codepen.io/klixfe-the-animator/pen/RwRWWmj?editors=1111"
  data-hashtags="inspirational">
        <i class="fa fa-twitter"></i>
      </a>)
};

function App(){
  return (
  <div class="grid-container center">
    <div class="header">
    </div>
    <div id="quote-box" class="content">
      <QuoteComponent />
    </div>
    <div class="footer">
    </div>
  </div>
  )
};
