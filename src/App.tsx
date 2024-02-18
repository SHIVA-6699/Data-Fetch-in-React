import { useEffect, useState,useRef } from 'react';
import './App.css';
interface Post{
  id:string,
  title:string
}
const BASE_URL="https://jsonplaceholder.typicode.com"
function App() {
  const abortControllerRef = useRef<AbortController | null>(null);
  const [data,SetData]=useState<Post[]>();
  const [error,Seterror]=useState<boolean>();
  const[loading,SetLoading]=useState<boolean>(false)
  useEffect(()=>{
      abortControllerRef.current?.abort(); 
      abortControllerRef.current = new AbortController(); // it is abort the previous API call when spam click
    async function getData(){
      SetLoading(true)
      try{
        
        const response=await fetch(`${BASE_URL}/posts`,{
          signal:abortControllerRef.current?.signal,
        })
        const posts=(await response.json()) as Post[];
        SetData(posts)
    }
    catch(e:any){
        if (e.name === "AbortError") {
          console.log("Aborted");
          return;
        }
      Seterror(e)
    }
    finally{
      
      SetLoading(false)
    }
  }
  getData()
},[])
if(error){
  return <div>Something Went Error</div>
}
  return (
    <div className="App">
    {loading && <p>Loading....</p>}
    {data?.map((Post)=>{
      return <div key={Post.id}> and {Post.title}</div>
    })}
    </div>
  );
}

export default App;
