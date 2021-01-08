import { useEffect, useState } from "react";

export default function(props) {
    const [feedList, setFeedList] = useState(null);

    useEffect(() => {
        console.log("In useEffect");
        fetch('/all-posts')
        .then(res => {
            return res.json();
        })
        .then(result => {
            console.log(result);
            setFeedList(result);
        })
        .catch(err => {
            console.log("Error i fetchinf my feed " + err);
        })
    }, []);

    return (
        <div className='feed-div-container'>
            <div className='feed-container'>
            {
                feedList?
                feedList.map(elem => (
                    <div key={elem._id} className='feed'>
                        <div className='post-information'>
                            <h2>{elem.postedBy.name}</h2>
                            <p>{elem.date}</p>
                        </div>
                        <div className='post-body' dangerouslySetInnerHTML={{__html : elem.body}}></div>
                    </div>
                ))
                :
                "Loading..."
            }
            </div>
        </div>
    )
}