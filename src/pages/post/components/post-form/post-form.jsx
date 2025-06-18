import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useLayoutEffect, useRef, useState } from 'react';
import { Icon, Input } from '../../../../components';
import { SpecialPanel } from '../special-panel/special-panel';
import { sanitizeContent } from './utils';
import { savePostAsync } from '../../../../actions';
import { useServerRequest } from '../../../../hooks';
import { PROP_TYPE } from '../../../../constans';
import styled from 'styled-components';

const PostFormContainer = ({ className, post: { id, title, imageUrl, content, publishedAt } }) => {
	const [imageUrlValue, setImageUrlValue] = useState(imageUrl);
	const [titleValue, setTitleValue] = useState(title);
	const contentRef = useRef(null);

	useLayoutEffect(() => {
		setImageUrlValue(imageUrl);
		setTitleValue(title);
	}, [title, imageUrl]);

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const requestServer = useServerRequest();

	const onSave = () => {
		const newContent = sanitizeContent(contentRef.current.innerHTML);

		dispatch(
			savePostAsync(requestServer, { id, imageUrl: imageUrlValue, title: titleValue, content: newContent }),
		).then(({ id }) => navigate(`/post/${id}`));
	};

	const onImageChange = ({ target }) => setImageUrlValue(target.value);
	const onTitleChange = ({ target }) => setTitleValue(target.value);

	return (
		<div className={className}>
			<div className="input">
				<Input value={imageUrlValue} placeholder="Picturie..." onChange={onImageChange} />
				<Input value={titleValue} placeholder="Title..." onChange={onTitleChange} />
			</div>
			<SpecialPanel
				id={id}
				publishedAt={publishedAt}
				margin="20px 0"
				editButton={<Icon id="fa-floppy-o" onClick={onSave} />}
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
		min-height: 80px;
		border: 1px solid #000;
		font-size: 18px;
		white-space: pre-line;
	}
`;

PostForm.propTypes = {
	post: PROP_TYPE.POST.isRequired,
};
