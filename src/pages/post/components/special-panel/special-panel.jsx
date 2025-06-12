import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Icon } from '../../../../components';
import { CLOSE_MODAL, openModal, removePostAsync } from '../../../../actions';
import { useServerRequest } from '../../../../hooks';
import styled from 'styled-components';

const SpecialPanelContainer = ({ className, id, publishedAt, editButton }) => {
	const dispatch = useDispatch();

	const requestServer = useServerRequest();

	const navigate = useNavigate();

	const onPostRemove = (id) => {
		dispatch(
			openModal({
				text: 'Delete post?',
				onConfirm: () => {
					dispatch(removePostAsync(requestServer, id)).then(() => navigate('/'));
					dispatch(CLOSE_MODAL);
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		);
	};

	return (
		<div className={className}>
			<div className="published-at">
				{publishedAt && <Icon inactive={true} id="fa-calendar-o" margin="0 10px 0 0" />} {publishedAt}
			</div>
			<div className="buttons">
				{editButton}
				{publishedAt && <Icon id="fa-trash-o" margin="0 0 0 10px" onClick={() => onPostRemove(id)} />}
			</div>
		</div>
	);
};

export const SpecialPanel = styled(SpecialPanelContainer)`
	display: flex;
	justify-content: space-between;
	margin: ${({ margin }) => margin};

	& .buttons {
		display: flex;
	}

	& i {
		font-size: 18px;
		position: relative;
		top: -6px;
	}

	& .published-at {
		display: flex;
	}
`;
