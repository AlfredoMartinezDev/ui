import { AccordionTrigger } from "@radix-ui/react-accordion"
import { Accordion, AccordionContent, AccordionItem } from "../Accordion"
import FileDirectorySidebarItem from "../FileDirectorySidebarItem"
import { RiDeleteBin2Line, RiFolderSharedLine, RiHome2Line } from "@remixicon/react"


const FileDirectorySidebar = ({ files, handleSelectedFolder }) => {

	return (
		<div className="flex flex-col gap-1">
			<Accordion defaultValue="root" onValueChange={(value) => handleSelectedFolder(files[value])}>
				<AccordionItem value="root">
					<AccordionTrigger>
						<div className="flex items-center gap-1">
							<RiHome2Line /> <div>Root</div>
						</div>
					</AccordionTrigger>
					<AccordionContent>
						{files.root.map(file => (
							<FileDirectorySidebarItem key={file.id} file={file} handleSelectedFolder={handleSelectedFolder} />
						))
						}
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="shared">
					<AccordionTrigger>
						<div className="flex items-center gap-1">
							<RiFolderSharedLine /> <div>Shared</div>
						</div>
					</AccordionTrigger>
					<AccordionContent>
						{files.shared.map(file => (
							<FileDirectorySidebarItem key={file.id} file={file} />
						))
						}
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="trash">
					<AccordionTrigger>
						<div className="flex items-center gap-1">
							<RiDeleteBin2Line /> <div>Trash</div>
						</div>
					</AccordionTrigger>
					<AccordionContent>
						{files.trash.map(file => (
							<FileDirectorySidebarItem key={file.id} file={file} />
						))
						}
					</AccordionContent>
				</AccordionItem>
			</Accordion>

		</div >
	)
}

export default FileDirectorySidebar