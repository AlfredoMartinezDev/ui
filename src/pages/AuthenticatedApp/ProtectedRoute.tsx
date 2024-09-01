import { useEffect } from "react";
import { useAuth } from "../../contexts/userAuth";


const ProtectedRoute: React.FC<{ children: React.ReactNode | null }> = ({
	children,
}) => {
	const { isLogin, logoutEndpoint } = useAuth();

	useEffect(() => {
		if (!isLogin) {
			logoutEndpoint();
		}
	}, [isLogin]);


	return isLogin ? children : null;
};

export default ProtectedRoute;
