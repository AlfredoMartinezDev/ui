import { Button } from "../Button";
import { RiFileListLine, RiFileTextLine, RiFolder3Line, RiLayoutGrid2Line } from "@remixicon/react";
import { useState } from "react";
import { Tooltip } from "../Tooltip";


export const TabsSubHeader = () => {
	const [filterBy, setFilterBy] = useState<string | null>(null)
	const [displayAs, setDisplayAs] = useState('grid')
	return (
		<div className="flex justify-between w-full">
			<div className="flex gap-2">
				<Button onClick={() => setFilterBy('archives')} variant={filterBy === 'archives' ? "primary" : 'secondary'}><RiFileTextLine />Archives</Button>
				<Button onClick={() => setFilterBy('folders')} variant={filterBy === 'folders' ? "primary" : 'secondary'}><RiFolder3Line />Folders</Button>
			</div>
			<div className="flex gap-2">
				<Tooltip side="bottom" content="View content as a list">
					<Button onClick={() => setDisplayAs('list')} variant={displayAs === 'list' ? "primary" : 'secondary'}><RiFileListLine /></Button>
				</Tooltip>
				<Tooltip side="bottom" content="View content as a grid">
					<Button onClick={() => setDisplayAs('grid')} variant={displayAs === 'grid' ? "primary" : 'secondary'}><RiLayoutGrid2Line /></Button>
				</Tooltip>
			</div>
		</div>
	)
};