
import { RiAddLine, RiFileUploadLine, RiFolderAddLine, RiFolderUploadLine } from "@remixicon/react";
import { Popover, PopoverContent, PopoverTrigger } from "../Popover";
import { Button } from "../Button";
import CreateNewFolderDialog from "../CreateNewFolderDialog";

export const ContextMenu = ({ handleCreateNewFolder, files, setFiles, selectedFolder, setSelectedFolder }) => (
	<div className="flex justify-center">
		<Popover>
			<PopoverTrigger asChild>
				<Button variant="primary" className="w-full">
					<RiAddLine className="mr-2" /> <span className="text-md">New</span>
				</Button>
			</PopoverTrigger>
			<PopoverContent className="p-4">
				<div className="flex flex-col gap-2">
					<div className="space-y-1">
						<CreateNewFolderDialog handleCreateNewFolder={handleCreateNewFolder} files={files} setFiles={setFiles} selectedFolder={selectedFolder} setSelectedFolder={setSelectedFolder}>
							<Button variant="ghost" className="w-full flex gap-2 justify-start">
								<RiFolderAddLine /><span className="text-sm font-medium text-gray-700 dark:text-gray-300">New folder</span>
							</Button>
						</CreateNewFolderDialog>
					</div>
					<div className="space-y-1">
						<Button variant="ghost" className="w-full flex gap-2 justify-start">
							<RiFolderUploadLine /><span className="text-sm font-medium text-gray-700 dark:text-gray-300">Upload folder</span>
						</Button>
					</div>
					<div className="space-y-1">
						<Button variant="ghost" className="w-full flex gap-2 justify-start">
							<RiFileUploadLine /><span className="text-sm font-medium text-gray-700 dark:text-gray-300">Upload file</span>
						</Button>
					</div>
				</div>
			</PopoverContent>

		</Popover>
	</div>
);