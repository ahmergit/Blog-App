import React, { useState, useEffect } from 'react'
import { getNews } from '../../api/external';
import Loader from '../../Component/Loader/Loader';

const Home = () => {
  const [articles, setarticles] = useState([]);

  useEffect(() => {
    (async function newsApiCall(){
      const response = await getNews(); 
      setarticles(response);  
    })();
    //cleanup function
    setarticles([]);

  }, [])

  const handleCardClick = (url) => {
    window.open(url, "_blank");
  };

  if (articles.length === 0){
    return <Loader text="homepage"/>
  }

  return (
    <>
      <div className='flex justify-center mt-24 text-3xl'>
        Latest Articles
      </div>
      <div className='flex flex-wrap justify-center'>
        {articles.map((article) => (
          <div
          key={article.url}
          onClick={() => handleCardClick(article.url)}
          className='border border-black border-solid rounded-lg my-4 mx-2 cursor-pointer w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4'>
           <div className="mb-3">
             <img className='object-contain rounded-lg w-full h-56' src={article.urlToImage} alt='' />
           </div>
           <h3 className='text-left text-black overflow-hidden'>{article.title}</h3>
         </div>
         
         
        ))}
      </div>
    </>
  )
}

export default Home;