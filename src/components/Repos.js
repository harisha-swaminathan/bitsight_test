import React, {useEffect, useState} from 'react';
import axios from 'axios';

const Repos = ()=>{
    const [repositories, setRepositories] = useState([]);
    
    let getRepositories = ()=>{
        axios.get('https://api.github.com/search/repositories?q=created:%22%3E2020-11-11%22&sort=stars&order=desc&per_page=5',{
            headers: {
                'Accept' : 'application/vnd.github.v3+json'
            }
        })
        .then((data)=>{
            setRepositories(data.data.items);
        });
    }
    let onRepoButtonClick = ()=>{
        getRepositories();
    }

    useEffect(()=>{
        getRepositories();
        const repoInterval = setInterval(function(){
            getRepositories();
        }, 20000);
        return ()=>{
            clearInterval(repoInterval);
        }
    },[])
    return(
        <div>
            <button id="hot_repos" className="repos__button" onClick={onRepoButtonClick}>Repositories</button>
            {repositories && 
                <div className="repos">
                    <div className="repos__header">
                        <h3>Repo Id</h3>
                        <h3>Repo Name</h3>
                        <h3>Description</h3>
                        <h3>Stars</h3>
                    </div>
                    {repositories.map((repo)=>
                        <div key={repo.id} className="repo__details">
                            <h3 className="repo__id">{repo.id}</h3>
                            <h3 className="repo__name">{repo.name}</h3>
                            <p className="repo__description">{repo.description}</p>
                    <h3 className="repo__stars">{repo.stargazers_count}</h3>
                        </div>
                    )}
            </div>
        }
        </div>
    );
}
export default Repos;





