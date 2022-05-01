var Comment = ({ comment }) => {

    function getName() {
        if (comment.user.first_name === undefined || comment.user.first_name === "" || comment.user.first_name === null) {
            const name = comment.user.email.split("@")[0]
            return name[0].toUpperCase() + name.substring(1);

        } else {
            return `${comment.user.first_name} ${comment.user.last_name}`
        }
    }

    return (
        <div>
            <p><a href={`hh/${comment.user.id}`}> {getName()} </a> {comment.comment.text}</p>
        </div>
    );
}

export default Comment;