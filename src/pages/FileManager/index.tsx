
import { useOutletContext } from "react-router-dom"
import File from "../../components/File"
import { useDroppable } from '@dnd-kit/core';
import { RiDeleteBin2Line } from "@remixicon/react";



const FileManager = () => {
	const [files, selectedFolder, handleSelectedFolder] = useOutletContext()

	const { isOver, setNodeRef } = useDroppable({
		id: 'droppable',
	});

	const style = {
		color: isOver ? 'red' : undefined,
	};


	const makeIterableFiles = () => {
		let iterableFiles = []
		if (Array.isArray(selectedFolder)) {
			iterableFiles = selectedFolder
		} else if (typeof selectedFolder === 'object') {
			const { subfolders = [], files = [] } = selectedFolder
			iterableFiles = [...subfolders, ...files]
		}
		return iterableFiles
	}

	return (
		<div className="relative h-full flex flex-col justify-between">
			<div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4 p-4">
				{makeIterableFiles()?.map(file => (
					<File key={file.id} file={file} handleSelectedFolder={handleSelectedFolder} />
				))
				}
			</div>
			<div ref={setNodeRef} style={style} className="rounded-xl absolute z-10 bottom-2 right-2 bg-red-100 p-12"><RiDeleteBin2Line size={56} /></div>
		</div>

	)

}

export default FileManager