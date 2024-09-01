import { RiFile2Fill, RiFolder2Fill, RiMore2Fill } from "@remixicon/react"
import { Button } from "../Button"
import { Fragment, useState } from "react"
import { Card } from "../Card"
import { Drawer, DrawerBody, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "../Drawer"
import { useToast } from "../../hooks/useToast"
import { Tooltip } from "../Tooltip"
import { useDraggable, useDroppable } from "@dnd-kit/core"


const File = ({ file, handleSelectedFolder }) => {
	const [hovered, setHovered] = useState(false)
	const [editFile, setEditFile] = useState(null)
	const [openDrawer, setOpenDrawer] = useState(false)
	const { toast } = useToast()

	const { attributes, listeners, setNodeRef: setNodeRefDraggable, transform, isDragging } = useDraggable({
		id: 'draggable' + file.id,
		data: file
	});


	const { isOver, setNodeRef: setNodeRefDroppable } = useDroppable({
		id: 'droppable-folder' + file.id,
	});


	const handleEdit = (file) => {
		setEditFile(file)
		setOpenDrawer(true)
	}

	const setRefs = (node) => {
		setNodeRefDraggable(node);
		setNodeRefDroppable(node);
	};

	const style = {
		...transform && { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` },
		zIndex: isDragging ? 50 : 1, // Higher z-index when dragging
		...isOver && { backgroundColor: 'lightgreen' } // Optional: Change background color when a draggable item is over the droppable area
	};

	return (
		<Fragment>
			<Card ref={setRefs} style={style} {...listeners} {...attributes} className="relative flex gap-1 items-center bg-gray-100 p-1 rounded-md overflow-hidden cursor-pointer" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onDoubleClick={() => {
				if (file.type === 'folder') {
					handleSelectedFolder(file)
				}
				return
			}
			}>
				{
					file.type === 'folder' ? (
						<RiFolder2Fill size={48} />
					) : <RiFile2Fill size={48} />
				}
				<p className="text-sm line-clamp-1">{file.name}</p>
				{hovered && (
					<Tooltip side="bottom" content="More details" showArrow={false} className="z-50">
						<Button className="p-0 absolute top-4 right-1" variant="ghost" onClick={() => handleEdit(file)}>
							<RiMore2Fill />
						</Button>
					</Tooltip>
				)
				}
			</Card>
			<Drawer
				open={openDrawer}
				onOpenChange={(modalOpened) => {
					if (!modalOpened) {
						setOpenDrawer(false)
					}
				}}
			>
				<DrawerContent className="sm:max-w-lg">
					<DrawerHeader>
						<DrawerTitle>{file.name}</DrawerTitle>
						<DrawerDescription className="mt-1 text-sm">
							description
						</DrawerDescription>
					</DrawerHeader>
					<DrawerBody>
						<p>summary</p>
					</DrawerBody>
					<DrawerFooter className="mt-6">
						<DrawerClose asChild>
							<Button
								className="mt-2 w-full sm:mt-0 sm:w-fit"
								variant="secondary"
							>
								Go back
							</Button>
						</DrawerClose>
						<Button className="w-full sm:w-fit" onClick={() => {
							toast({
								title: "Success",
								description:
									"Archive modified succesfully!",
								variant: "success",
								duration: 3000,
							})
							setOpenDrawer(false)
						}
						}>
							Save
						</Button>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>

		</Fragment>
	)
}

export default File