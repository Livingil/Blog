import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { Navigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { server } from '../../bff';
import { setUser } from '../../actions';
import { AuthFormError, Button, H2, Input } from '../../components';
import styled from 'styled-components';
import { selectUserRole } from '../../selectors';
import { ROLE } from '../../constans';
import { useResetForm } from '../../hooks';

const regFormSchema = yup.object().shape({
	login: yup
		.string()
		.required('Заполните логин')
		.matches(/^\w+$/, 'Неверно заполнен логин. Допускаются только буквы и цифры')
		.min(3, 'Неверно заполнен логин. Минимум 3 символа')
		.max(15, 'Неверно заполнен логин. Максимум 15 символов'),
	password: yup
		.string()
		.required('Заполните пароль')
		.matches(/^[\w#%]+$/, 'Неверно заполнен пароль. Допускаются только буквы, цифры и знаки # и %')
		.min(6, 'Неверно заполнен пароль. Минимум 6 символов')
		.max(20, 'Неверно заполнен пароль. Максимум 20 символов'),
	passCheck: yup
		.string()
		.oneOf([yup.ref('password'), null], 'Ошибка в повторе пароля')
		.required('Заполните пароль check'),
});

const RegistrationContainer = ({ className }) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		defaultValues: { login: '', password: '', passCheck: '' },
		resolver: yupResolver(regFormSchema),
	});

	const [serverError, setServerError] = useState(null);

	const dispatch = useDispatch();

	const roleId = useSelector(selectUserRole);

	useResetForm(reset);

	const onSubmit = ({ login, password }) => {
		server.register(login, password).then(({ error, res }) => {
			if (error) {
				setServerError(`Ошибка запроса: ${error}`);
				return;
			}

			dispatch(setUser(res));
		});
	};

	const formError = errors?.login?.message || errors?.password?.message || errors?.passCheck?.message;
	const errorMessage = formError || serverError;

	if (roleId !== ROLE.GUEST) {
		return <Navigate to="/" />;
	}
	return (
		<div className={className}>
			<H2>Registration</H2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Input
					type="text"
					placeholder="Login..."
					{...register('login', { onChange: () => setServerError(null) })}
				/>
				<Input
					type="password"
					placeholder="Password..."
					{...register('password', { onChange: () => setServerError(null) })}
				/>
				<Input
					type="password"
					placeholder="Password check..."
					{...register('passCheck', { onChange: () => setServerError(null) })}
				/>
				<Button type="submit" disabled={!!formError}>
					Registration
				</Button>
				{errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}
			</form>
		</div>
	);
};

export const Registration = styled(RegistrationContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;
	& > form {
		display: flex;
		flex-direction: column;
		width: 260px;
	}
`;
