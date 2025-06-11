import { Icon } from '../../../../components';
import styled from 'styled-components';

const SpecialPanelContainer = ({ className, publishedAt, editButton }) => {
	return (
		<div className={className}>
			<div className="published-at">
				<Icon id="fa-calendar-o" margin="0 10px 0 0" onClick={() => {}} />
				{publishedAt}
			</div>
			<div className="buttons">
				{editButton}
				<Icon id="fa-trash-o" margin="0 10px 0 0" onClick={() => {}} />
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
