import { RiArrowDropRightFill, RiFileTextLine, RiFolder2Fill } from "@remixicon/react"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../Accordion";

function truncateString(str) {
	if (str.length > 24) {
		return str.slice(0, 24) + "...";
	}
	return str;
}


const renderRestOfFoldersOrFiles = (file, handleSelectedFolder) => {
	if (file.subfolders && file.files) {
		const files = [...file.subfolders, ...file.files]
		return files.map(file => <SidebarItemAccordion file={file} className="pl-4" handleSelectedFolder={handleSelectedFolder} />)
	}
	else if (file.subfolders) {
		return file.subfolders.map(subfolder => {
			return <SidebarItemAccordion file={subfolder} className="pl-4" handleSelectedFolder={handleSelectedFolder} />
		})
	} else if (file.files) {
		return file.files.map(subfolderFile => {
			return <SidebarItemAccordion file={subfolderFile} className="pl-4" handleSelectedFolder={handleSelectedFolder} />
		})
	} else {
		return <SidebarItemAccordion file={file} className="pl-4" handleSelectedFolder={handleSelectedFolder} />
	}
}


const SidebarItemAccordion = ({ file, className, handleSelectedFolder }) => {
	return (
		<div className="">
			<Accordion type="multiple" className={className} onValueChange={(value) => handleSelectedFolder(file)}>
				<AccordionItem value={`${file.name}`} className="pl-2">
					<AccordionTrigger disabled={file.type !== 'folder'} className="py-1" >
						<span className="flex items-center gap-2">
							{file.type === 'folder' && (file.subfolders || file.files) && <RiArrowDropRightFill className="absolute -left-2" />}
							{file.type === 'folder' ? <RiFolder2Fill size={24} className="min-w-fit" /> : <RiFileTextLine size={24} className="min-w-fit" />}
							{truncateString(file.name)}
						</span>
					</AccordionTrigger>
					{
						(file.subfolders || file.files) && (
							<AccordionContent>
								{renderRestOfFoldersOrFiles(file, handleSelectedFolder)}
							</AccordionContent>
						)
					}

				</AccordionItem>
			</Accordion>
		</div>
	)
}



const FileDirectorySidebarItem = ({ file, handleSelectedFolder }) => {
	return <SidebarItemAccordion file={file} handleSelectedFolder={handleSelectedFolder} />
}

export default FileDirectorySidebarItem


