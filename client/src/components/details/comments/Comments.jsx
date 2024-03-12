import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Comments.css";

import { AuthContext } from "../../../../context/authContext";
import { addComment, deleteComment, getAllComments } from "../../../services/sunglassesService"

export default function Comments() {
    const { sunglassesId } = useParams();
    const { user, isAuthenticated } = useContext(AuthContext);
    const [comments, setComments] = useState([]);
    const [error, setError] = useState('');
    const [value, setValue] = useState('');

    useEffect(() => {
        getAllComments().then(data => {
            const currentComments = data.filter(x => x.sunglassesId === sunglassesId);

            setComments(currentComments);
        });
    }, []);

    const onDeleteComment = (id) => {
        deleteComment(id).then(data => setComments(state => state.filter(x => x._id !== id)))
    };

    const onComment = async (e) => {
        e.preventDefault();

        if (comments.length >= 9) {
            setError('Product can have only 9 comments!');
            return;
        }

        try {
            const comment = await addComment(sunglassesId, value, user.email);
            setComments(state => [...state, comment]);
            setError('');
            setValue('');
        } catch (error) {
            setError(error.message);
        }
    }


    const onChangeValue = (e) => {
        setValue(state => state = e.target.value);
    }

    return (
        <div className="comments-section">
            <h2>Comments</h2>

            {comments &&
                comments.map(c =>
                    <div className="comment" key={c._id}>
                        <div>
                            <h4>Email: {c.email} --</h4>
                            <p>{c.commentText}</p>
                        </div>
                        {c._ownerId === user._id ? <div className="delete-btn" onClick={() => onDeleteComment(c._id)}>Delete</div> : ''}
                    </div>
                )
            }

            {error && <h3>{error}</h3>}
            <form onSubmit={onComment}>
                {isAuthenticated
                    ?
                    <>
                        <label htmlFor="description">Comment here: </label>
                        <input type="text" name="commentText" id="description" value={value} onChange={onChangeValue} />
                        <button type="submit">Comment</button>
                    </>
                    : ''
                }

            </form>
        </div>
    );
}