import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useRef } from 'react';
import { Icon, Input } from '../../../../components';
import { SpecialPanel } from '../special-panel/special-panel';
import { sanitizeContent } from './utils';
import { savePostAsync } from '../../../../actions';
import { useServerRequest } from '../../../../hooks';
import styled from 'styled-components';

const PostFormContainer = ({ className, post: { id, title, imageUrl, content, publishedAt } }) => {
	const dispatch = useDispatch();

	const navigate = useNavigate();

	const requestServer = useServerRequest();

	const imageRef = useRef(null);
	const titleRef = useRef(null);
	const contentRef = useRef(null);

	const onSave = () => {
		const newImageUrl = imageRef.current.value;
		const newTitle = titleRef.current.value;
		const newContent = sanitizeContent(contentRef.current.innerHTML);

		dispatch(
			savePostAsync(requestServer, { id, imageUrl: newImageUrl, title: newTitle, content: newContent }),
		).then(() => navigate(`/post/${id}`));
	};

	return (
		<div className={className}>
			<div className="input">
				<Input ref={imageRef} defaultValue={imageUrl} placeholder="Picturie..." />
				<Input ref={titleRef} defaultValue={title} placeholder="Title..." />
			</div>
			<SpecialPanel
				publishedAt={publishedAt}
				margin="20px 0"
				editButton={<Icon id="fa-floppy-o" margin="0 10px 0 0" onClick={onSave} />}
			/>
			<div ref={contentRef} contentEditable={true} suppressContentEditableWarning={true} className="post-text">
				{content}
			</div>
		</div>
	);
};

export const PostForm = styled(PostFormContainer)`
	& .input {
		display: flex;
		flex-direction: column;
	}

	& img {
		float: left;
		margin: 0 20px 10px 0;
	}

	& .post-text {
		font-size: 18px;
		white-space: pre-line;
	}
`;
