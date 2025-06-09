import { Button, Icon } from '../../../../components';
import { Link, useNavigate } from 'react-router-dom';
import { selectUserLogin, selectUserRole, selectUserSession } from '../../../../selectors';
import { ROLE } from '../../../../constans';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { logout } from '../../../../actions';

const RightAligned = styled.div`
	display: flex;
	justify-content: flex-end;
	margin-top: 10px;
	align-items: center;
`;

const UserName = styled.div`
	display: flex;
	font-size: 18px;
	font-weight: bold;
	padding-right: 10px;
	padding-bottom: 5px;
`;

const ControlPanalContainer = (className) => {
	const navigate = useNavigate();
	const roleId = useSelector(selectUserRole);
	const login = useSelector(selectUserLogin);
	const session = useSelector(selectUserSession);

	const dispatch = useDispatch();

	return (
		<div className={className}>
			<RightAligned>
				{roleId === ROLE.GUEST ? (
					<Button>
						<Link to="/login">LogIn</Link>
					</Button>
				) : (
					<>
						<UserName>{login}</UserName>

						<Icon id="fa-sign-out" onClick={() => dispatch(logout(session))} />
					</>
				)}
			</RightAligned>
			<RightAligned>
				<Icon id="fa-backward" onClick={() => navigate(-1)} />

				<Link to="/post">
					<Icon id="fa-file-text-o" margin="0px 15px 0 15px" />
				</Link>
				<Link to="/users">
					<Icon id="fa-users" />
				</Link>
			</RightAligned>
		</div>
	);
};

export const ControlPanel = styled(ControlPanalContainer)``;
