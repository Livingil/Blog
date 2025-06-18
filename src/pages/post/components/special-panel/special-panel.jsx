import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from '../../../../components';
import { CLOSE_MODAL, openModal, removePostAsync } from '../../../../actions';
import { useServerRequest } from '../../../../hooks';
import { checkAccess } from '../../../../utils';
import { ROLE } from '../../../../constans';
import { selectUserRole } from '../../../../selectors';
import styled from 'styled-components';

const SpecialPanelContainer = ({ className, id, publishedAt, editButton }) => {
	const dispatch = useDispatch();
	const requestServer = useServerRequest();
	const navigate = useNavigate();
	const roleId = useSelector(selectUserRole);

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

	const isAdmin = checkAccess([ROLE.ADMIN], roleId);

	return (
		<div className={className}>
			<div className="published-at">
				{publishedAt && <Icon inactive={true} id="fa-calendar-o" margin="0 10px 0 0" />} {publishedAt}
			</div>
			{isAdmin && (
				<div className="buttons">
					{editButton}
					{publishedAt && <Icon id="fa-trash-o" margin="0 0 0 10px" onClick={() => onPostRemove(id)} />}
				</div>
			)}
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
SpecialPanel.propTypes = {
	id: PropTypes.string.isRequired,
	publishedAt: PropTypes.string.isRequired,
	editButton: PropTypes.node.isRequired,
};
