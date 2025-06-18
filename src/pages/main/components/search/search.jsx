import styled from 'styled-components';
import { Icon, Input } from '../../../../components';

const SearchContainer = ({ className, searchPhrase, onChange }) => {
	return (
		<div className={className}>
			<input value={searchPhrase} placeholder="Search" onChange={onChange} />
			<Icon id="fa-search" inactive={true} size="18px" />
		</div>
	);
};

export const Search = styled(SearchContainer)`
	display: flex;
	position: relative;
	width: 340px;
	height: 40px;
	margin: 30px auto 0;

	& > div {
		position: absolute;
		top: 10px;
		right: 10px;
	}
	& > input {
		width: 100%;
		font-size: 18px;
		padding: 10px 30px 10px 10px;
	}
`;
