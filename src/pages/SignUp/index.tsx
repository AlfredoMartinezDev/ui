
import { useReducer } from "react";
import { Link } from "react-router-dom";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";

const initialState = {
	username: "",
	firstName: "",
	lastName: "",
	email: "",
	password: "",
	errors: {
		username: "",
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	},
};

const reducer = (state: typeof initialState, action: any) => {
	switch (action.type) {
		case "SET_USERNAME":
			return {
				...state,
				username: action.payload,
			};
		case "SET_EMAIL":
			return {
				...state,
				email: action.payload,
			};
		case "SET_PASSWORD":
			return {
				...state,
				password: action.payload,
			};
		case "SET_FIRSTNAME":
			return {
				...state,
				firstName: action.payload,
			};
		case "SET_LASTNAME":
			return {
				...state,
				lastName: action.payload,
			};
		case "SET_ERROR":
			return {
				...state,
				errors: {
					...state.errors,
					[action.field]: action.payload,
				},
			};
		case "CLEAR_ERROR":
			return {
				...state,
				errors: {
					...state.errors,
					[action.field]: action.payload,
				},
			};
		default:
			return state;
	}
};

const ERRORS = {
	anyName: "Any error for first name",
	username: "Any error for username",
	email: "The email address entered is not valid",
	password: "The password entered is not valid",
};

const validateUsername = (username: string) => {
	if (username.length < 2) {
		return ERRORS.username;
	}
	return "";
};

const validateAnyName = (anyName: string) => {
	if (anyName.length < 2) {
		return ERRORS.anyName;
	}
	return "";
};
const validateEmail = (email: string) => {
	if (!/\S+@\S+\.\S+/.test(email)) {
		return ERRORS.email;
	}
	return "";
};

const validatePassword = (password: string) => {
	if (password.length < 6) {
		return ERRORS.password;
	}
	return "";
};


const SignUp = () => {
	const [state, dispatch] = useReducer(reducer, initialState);

	const { firstName, lastName, username, email, password, errors } = state;

	const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const emailValue = event.target.value;
		dispatch({ type: "SET_EMAIL", payload: emailValue });
		dispatch({
			type: "SET_ERROR",
			field: "email",
			payload: validateEmail(emailValue),
		});
	};

	const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const passwordValue = event.target.value;
		dispatch({ type: "SET_PASSWORD", payload: passwordValue });
		dispatch({
			type: "SET_ERROR",
			field: "password",
			payload: validatePassword(passwordValue),
		});
	};

	const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const usernameValue = event.target.value;
		dispatch({ type: "SET_USERNAME", payload: usernameValue });
		dispatch({
			type: "SET_ERROR",
			field: "username",
			payload: validateUsername(usernameValue),
		});
	}
	const handleFirstnameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const firstNameValue = event.target.value;
		dispatch({ type: "SET_FIRSTNAME", payload: firstNameValue });
		dispatch({
			type: "SET_ERROR",
			field: "firstName",
			payload: validateAnyName(firstNameValue),
		});
	}
	const handleLastnameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const lastNameValue = event.target.value;
		dispatch({ type: "SET_LASTNAME", payload: lastNameValue });
		dispatch({
			type: "SET_ERROR",
			field: "lastName",
			payload: validateAnyName(lastNameValue),
		});
	}

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const emailError = validateEmail(email) || errors.email;
		const passwordError = validatePassword(password) || errors.password;

	};

	const disabledButton = !!(
		errors.email ||
		errors.password
	);

	return (
		<main className="px-4">
			<div className="max-w-lg mx-auto flex flex-col justify-center h-screen gap-10">
				<Card>
					<div className="flex items-center justify-between mb-4">
						<h2 className="text-2xl font-bold capitalize">
							Sign Up
						</h2>
						<Button variant="ghost" asChild className="w-1/6 capitalize">
							<Link to="/login">Login</Link>
						</Button>
					</div>
					<form className="grid grid-cols-1 gap-4" onSubmit={handleSubmit}>
						<div>
							<label>
								<span className="capitalize">Username</span>
								<Input
									value={username}
									onChange={handleUsernameChange}
									onFocus={() =>
										dispatch({ type: "CLEAR_ERROR", field: "username" })
									}
									hasError={!!errors.username}
									// errorMessage={errors.email}
									placeholder="Type username here"
								/>
							</label>
						</div>
						<div>
							<label>
								<span className="capitalize">Email</span>
								<Input
									value={email}
									onChange={handleEmailChange}
									onFocus={() =>
										dispatch({ type: "CLEAR_ERROR", field: "email" })
									}
									hasError={!!errors.email}
									// errorMessage={errors.email}
									placeholder="Type email here"
								/>
							</label>
						</div>
						<div>
							<label>
								<span className="capitalize">First Name</span>
								<Input
									value={firstName}
									onChange={handleFirstnameChange}
									onFocus={() =>
										dispatch({ type: "CLEAR_ERROR", field: "firstName" })
									}
									hasError={!!errors.firstName}
									// errorMessage={errors.email}
									placeholder="Type first name here"
								/>
							</label>
						</div>
						<div>
							<label>
								<span className="capitalize">Last name</span>
								<Input
									value={lastName}
									onChange={handleLastnameChange}
									onFocus={() =>
										dispatch({ type: "CLEAR_ERROR", field: "lastName" })
									}
									hasError={!!errors.lastName}
									// errorMessage={errors.email}
									placeholder="Type last name here"
								/>
							</label>
						</div>
						<div>
							<label>
								<span className="capitalize">Password</span>
								<Input
									value={password}
									onChange={handlePasswordChange}
									onFocus={() =>
										dispatch({ type: "CLEAR_ERROR", field: "password" })
									}
									hasError={!!errors.password}
									// errorMessage={errors.password}
									placeholder="Type password here"
									type="password"
								/>
							</label>
						</div>
						<div className="flex gap-2">
							<Button
								disabled={disabledButton}
								variant="primary"
								isLoading={false}
								className="w-1/2  mt-2 capitalize"
								type="submit"
							>
								Sign Up
							</Button>
						</div>
					</form>
					{/* {isError && <p className="text-red-500 py-5">{error.message}</p>} */}
				</Card>
			</div>
		</main>
	);
}

export default SignUp