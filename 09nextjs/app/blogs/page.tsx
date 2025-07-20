import axios from "axios"
export default async function Blogs() {
    const movieDB = axios.get("http://www.omdbapi.com/?apikey=[yourkey]&")
    return <div>
        Learn Next
        
    </div>
}
