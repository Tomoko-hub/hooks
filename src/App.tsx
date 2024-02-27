import React, { useState } from 'react';
import './App.css';
import UserCard from './components/UserCard';
import axios from 'axios';
import { User } from './types/api/user';
import { UserProfile } from './types/UserProfile';

/* const user = {
  id: 1,
  name: "Tomoko Uehara",
  email: "tomoko@mail.com",
  address: "Mannerheimintie 2"
} */

export default function App() {
  const [userProfiles, setUserProfiles] = useState<Array<UserProfile>>([]);
  const [loading, setLoading] = useState(false);
  const [ error, setError ] = useState(false);
  
  const fetchUser = () =>{
    setLoading(true);
    setError(false);

    axios.get<Array<User>>('https://jsonplaceholder.typicode.com/users')
    .then((res)=>{
      const data = res.data.map((user)=>({
        id: user.id,
        name: `${user.name} (${user.username})`,
        email: user.email,
        address: `${user.address.city}${user.address.suite}${user.address.street}`
    }));
    setUserProfiles(data);
    console.log(data);
    })
    .catch(()=>{setError(true);})
    .finally(()=>{setLoading(false);});
  };

  return (
    <div className="App">
      <button onClick={fetchUser}>Fetch User Info</button>
      <br />
      {error ? (
        <p style={{color:"red"}}>Can not fetch data.</p>
      ):loading?(
      <p style={{ color: 'blue'}}>Loading..</p>
      ):(
        <>
        {userProfiles.map((user)=>(
          <UserCard key={user.id} user={user} />
        ))}
        </>
      )}
    </div>
  );
}
