import { Icon } from '../../../../components';
import { useState } from 'react';
import { TableRow } from '../table-row/table-row';
import { useServerRequest } from '../../../../hooks';
import styled from 'styled-components';

const UserRowContainer = ({ className, id, login, registeredAt, roleId: userRoleId, roles, onUserRemove }) => {
	const [initialdRoleId, setInitialdRoleId] = useState(userRoleId);
	const [selectedRoleId, setSelectedRoleId] = useState(userRoleId);

	const requestServer = useServerRequest();

	const onRoleChange = ({ target }) => {
		setSelectedRoleId(Number(target.value));
	};

	const isSaveButtonDisabled = selectedRoleId === initialdRoleId;

	const onRoleSave = (userId, newUserRoleId) => {
		requestServer('updateUserRole', userId, newUserRoleId).then(() => {
			setInitialdRoleId(newUserRoleId);
		});
	};

	return (
		<div className={className}>
			<TableRow border={true}>
				<div className="login-column">{login}</div>
				<div className="registered-at-column">{registeredAt}</div>

				<div className="role-column">
					<select name="" id="" value={selectedRoleId} onChange={onRoleChange}>
						{roles.map(({ id: roleId, name: roleName }) => (
							<option key={roleId} value={roleId}>
								{roleName}
							</option>
						))}
					</select>

					<Icon
						id="fa-floppy-o"
						margin="0 0 0 10px"
						disabled={isSaveButtonDisabled}
						onClick={() => onRoleSave(id, selectedRoleId)}
					/>
				</div>
			</TableRow>

			<Icon id="fa-trash-o" onClick={onUserRemove} />
		</div>
	);
};

export const UserRow = styled(UserRowContainer)`
	display: flex;
	margin-top: 10px;

	& select {
		padding: 0 5px;
	}
`;
