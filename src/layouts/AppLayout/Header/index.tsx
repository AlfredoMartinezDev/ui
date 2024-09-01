
import { Tooltip } from "../../../components/Tooltip"
import { UserSettings } from "../../../components/UserSettings"

const Header = () => {
	return (
		<div className="flex justify-end">
			<Tooltip side="left" content="User settings">
				<UserSettings />
			</Tooltip>
		</div>
	)
}

export default Header