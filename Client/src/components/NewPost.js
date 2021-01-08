import { useState } from "react"
import { useHistory } from "react-router-dom";
import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Button from '@material-ui/core/Button';
// import { config } from '../editorConfig';


export default function(props){
    const [content, setContent] = useState('');
    const history = useHistory();

    
    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('/new-post', {
            method: 'POST',
            headers: {
                "Content-Type" : "application/json",
                
            },
            credentials: 'include',
            body: JSON.stringify({
                body: content
            })
        })
        .then(res => {
            return res.json();
        })
        .then(result => {
            console.log(result);
            if(result.error){
                console.log('Error : ', result.error);
            }
            else{
                history.push('/');
            }
        })
        .catch(err => {
            console.log("Error creating new post: ", err);
        });
    }

    return (
        <div className='form-div-container' >
            <div className='form-container' style={{width: '70%', height: '60%' }}>
                <CKEditor
                    editor={ClassicEditor}
                    data={content}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        setContent(data);
                    }}
                />
                <Button onClick={handleSubmit} variant="contained" color="primary" type='submit' style={{margin: '0.7rem'}}>Post</Button>
            </div>
        </div>
    )
}