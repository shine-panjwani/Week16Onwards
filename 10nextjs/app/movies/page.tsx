import React from 'react'
import axios from 'axios';
const page = async () => {
  const movieData = await axios.get(
    "https://api.themoviedb.org/3/discover/movie?api_key=6968c9bbcd3243554cd73ae3a7d0bf75"
  );
  const response = movieData.data.results
  // console.log(response);
  return (
    <div className='flex flex-wrap'>
      {response.map((x: any) => {
        return <div
          key={x.id}
          className="bg-gray-800 text-white rounded-xl shadow-md p-4 w-72 hover:shadow-lg m-2 transition duration-300"
        >
          <img
            src={`https://image.tmdb.org/t/p/w500${x.poster_path}`}
            alt={x.title}
            className="rounded-lg w-full h-96 object-cover mb-4"
          />

          <h2 className="text-lg font-semibold text-green-400 mb-1 truncate">{x.title}</h2>
          <p className="text-sm text-gray-400 mb-1">📅 {x.release_date}</p>
          <p className="text-sm text-yellow-400 mb-2">⭐ {x.vote_average}</p>

          <p className="text-sm text-gray-300 line-clamp-3 mb-3">{x.overview}</p>

          <span
            className={`inline-block px-2 py-1 text-xs font-bold rounded ${x.adult ? "bg-red-600 text-white" : "bg-green-700 text-white"
              }`}
          >
            {x.adult ? "18+ Only" : "All Ages"}
          </span>
        </div>


        //  <div key={x.id}>
        //   <div>{x.title}</div>
        //   <div>{x.release_date}</div>
        //   <div>{x.vote_average}</div>
        //   <img src={`https://image.tmdb.org/t/p/w500${x.poster_path}`} alt="" />
        //   <div>{x.overview}</div>
        //   <div>{x.adult ? "18 Above" : "Not 18 above"}</div>

        // </div>
      })}
    </div>
  )
}

export default page