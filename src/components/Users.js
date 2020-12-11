import React,{useEffect, useState} from 'react';
import axios from 'axios';

const Users = ()=>{
    const [users, setUsers] = useState([]);
    const getUser = ()=>{
        axios.get('https://api.github.com/search/users?q=created:%22%3E2020-11-11%22&sort=followers&order=desc&per_page=5',{
            headers: {
                'Accept' : 'application/vnd.github.v3+json'
            }
        }).then((data)=>{
                let usersWithFollowers = data.data.items;
                usersWithFollowers.forEach((user,i)=>{
                    axios.get(`https://api.github.com/users/${user.login}`).then((data)=>{
                    return data.data;
                    }).then((data)=>{
                        usersWithFollowers[i].followers = data.followers;
                        if(i===usersWithFollowers.length-1){
                            setUsers(usersWithFollowers);
                        }
                    })
                })
        }).catch((error)=>{
            console.log("An error has occured:", error)
        })
    }
    const onUserButtonClick = (e)=>{
        e.preventDefault();
        getUser();
    }

    useEffect(()=>{
        getUser();
        const UserInterval = setInterval(() => {
            getUser();
        }, 120000);
        return ()=>{
            clearInterval(UserInterval);
        }
    },[]);

    return(
        <div>
            <button id="prolific_users" className="users__button" onClick={onUserButtonClick}>Users</button>
            {users && 
                <div className="users">
                    <div className="users__header">
                        <h3>User Avatar</h3>
                        <h3>User Login</h3>
                        <h3>User Id</h3>
                        <h3>Followers</h3>
                    </div>
                    {users.map((user)=>
                    <div key={user.id} className="user__details">
                            <div className="user__avatar-container"><img className="user__avatar" alt="userAvatar" src={user.avatar_url}></img></div>
                            <h3 className="user__login">{user.login}</h3>
                            <h3 className="user__id">{user.id}</h3>
                            <h3 className="user__followers">{user.followers}</h3>
                        </div>
                    )}
                </div>
            }
        </div>
    );
}
export default Users;

