import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from '../../../../../../components';
import { CLOSE_MODAL, openModal, removeCommentAsync } from '../../../../../../actions';
import { useServerRequest } from '../../../../../../hooks';
import { selectUserRole } from '../../../../../../selectors';
import { ROLE } from '../../../../../../constans';
import styled from 'styled-components';

const CommentContainer = ({ className, postId, id, author, publishedAt, content }) => {
	const dispatch = useDispatch();
	const requestServer = useServerRequest();
	const roleId = useSelector(selectUserRole);

	const onCommentRemove = (id) => {
		dispatch(
			openModal({
				text: 'Delete comment?',
				onConfirm: () => {
					dispatch(removeCommentAsync(requestServer, postId, id));
					dispatch(CLOSE_MODAL);
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		);
	};

	const isAdminOrModerator = [ROLE.ADMIN, ROLE.MODERATOR].includes(roleId);

	return (
		<div className={className}>
			<div className="comment">
				<div className="information-panel">
					<div className="author">
						<Icon inactive={true} id="fa-user-circle-o" margin="0 10px 0 0" size="18px" />
						{author}
					</div>
					<div className="published-at">
						<Icon inactive={true} id="fa-calendar-o" margin="0 10px 0 10px" size="12px" />
						{publishedAt}
					</div>
				</div>
				<div className="comment-text">{content}</div>
			</div>
			{isAdminOrModerator && (
				<Icon id="fa-trash-o" margin="0 0 0 10px" size="18px" onClick={() => onCommentRemove(id)} />
			)}
		</div>
	);
};

export const Comment = styled(CommentContainer)`
	display: flex;
	margin-top: 10px;
	width: 570px;

	& .comment {
		border: 1px solid #000;
		width: 547px;
		padding: 5px 10px;
	}

	& .information-panel {
		display: flex;
		justify-content: space-between;
	}

	& .author {
		display: flex;
	}

	& .published-at {
		display: flex;
		font-size: 12px;
	}
`;
Comment.propTypes = {
	postId: PropTypes.string.isRequired,
	id: PropTypes.number.isRequired,
	author: PropTypes.string.isRequired,
	publishedAt: PropTypes.string.isRequired,
	content: PropTypes.string.isRequired,
};
