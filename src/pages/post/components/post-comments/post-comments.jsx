import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { Comment } from './components';
import { Icon } from '../../../../components';
import { selectUserId, selectUserRole } from '../../../../selectors';
import { useServerRequest } from '../../../../hooks';
import { addCommentAsync } from '../../../../actions';
import { PROP_TYPE, ROLE } from '../../../../constans';
import styled from 'styled-components';

const PostCommentsContainer = ({ className, comments, postId }) => {
	const [newComment, setNewComment] = useState('');
	const userId = useSelector(selectUserId);
	const dispatch = useDispatch();
	const requestServer = useServerRequest();
	const roleId = useSelector(selectUserRole);

	const onNewCommentAdd = (userId, postId, content) => {
		dispatch(addCommentAsync(requestServer, userId, postId, content));
		setNewComment('');
	};

	const isGuest = roleId === ROLE.GUEST;

	return (
		<div className={className}>
			{!isGuest && (
				<div className="new-comment">
					<textarea
						name="comment"
						value={newComment}
						placeholder="Comment..."
						onChange={({ target }) => setNewComment(target.value)}
					></textarea>
					<Icon
						id="fa-paper-plane-o"
						margin="0 0 0 10px"
						onClick={() => onNewCommentAdd(userId, postId, newComment)}
					/>
				</div>
			)}
			<div className="coments">
				{comments.map(({ id, author, content, publishedAt }) => (
					<Comment
						key={id}
						postId={postId}
						id={id}
						author={author}
						content={content}
						publishedAt={publishedAt}
					/>
				))}
			</div>
		</div>
	);
};

export const PostComments = styled(PostCommentsContainer)`
	width: 580px;
	margin: 0 auto;

	& .new-comment {
		display: flex;
		width: 100%;
		margin: 20px 0 0;
	}

	& .new-comment textarea {
		width: 100%;
		height: 120px;
		resize: none;
	}
`;
PostComments.propTypes = {
	comments: PropTypes.arrayOf(PROP_TYPE.COMMENT),
	postId: PropTypes.string.isRequired,
};
