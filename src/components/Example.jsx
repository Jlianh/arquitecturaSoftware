import { useState } from 'react'
import '../App.css'

function Profile({user}) {

  return (
    <>
      <h1>{user.name}</h1>
      <br />
      <img
       src={user.imageUrl}
       alt={'Photo of '+user.name}
       style={{
        width: user.imageSize,
        height: user.imageSize
       }} />
    </>
  )
}

function Example() {

  const [count, setCount] = useState(0);

  const users = [{
    name: "Elvis Presley",
    imageUrl: "https://hips.hearstapps.com/hmg-prod/images/singer-elvis-presley-news-photo-1590531497.jpg",
    imageSize: 90
  },

  {
    name: "Brad Pit",
    imageUrl: "https://goldenglobes.com/wp-content/uploads/2023/10/brad-pitt_03_paramount-pictures.jpg",
    imageSize: 90
  },

  {
    name: "Madonna",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVATslgVY87n3lp3XHUlxF8Edc6jubIVkmbg&usqp=CAU",
    imageSize: 90
  }];

  return (
    <>
      {users.map((user)=>(
        <Profile user={user}/>
      ))}
      <br />
      <button onClick={() => setCount(count+1)}>Sumar</button>
      <button onClick={() => setCount(count-1)}>Restar</button>
      <p>Contador : {count}</p>
    </>
  )
}

export default Example
