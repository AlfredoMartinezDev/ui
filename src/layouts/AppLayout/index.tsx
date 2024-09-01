import Header from "./Header";
import SubHeader from "./SubHeader";
import { ContextMenu } from "../../components/ContextMenu";
import { Outlet } from "react-router-dom";
import FileDirectorySidebar from "../../components/FileDirectorySidebar";
import { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import { restrictToFirstScrollableAncestor } from "@dnd-kit/modifiers";
import { useToast } from "../../hooks/useToast";



const AppLayout = () => {
	const [files, setFiles] = useState({
		root: [
			{
				id: 0,
				name: 'Photos last summer',
				type: 'folder',
				subfolders: [
					{
						id: 0,
						name: 'Juny 2023',
						type: 'folder',
						ownerId: 'alfredo',
						files: [
							{
								id: 0,
								name: 'photo-1',
								type: 'file',
								ownerId: 'alfredo'
							},
							{
								id: 1,
								name: 'photo-2',
								type: 'file',
								ownerId: 'alfredo'
							}
						]
					},
					{
						id: 1,
						name: 'July 2023',
						type: 'folder',
						ownerId: 'alfredo',
						files: [
							{
								id: 0,
								name: 'photo-1',
								type: 'file',
								ownerId: 'alfredo'
							},
							{
								id: 1,
								name: 'photo-2',
								type: 'file',
								ownerId: 'alfredo'
							},
							{
								id: 2,
								name: 'photo-3',
								type: 'file',
								ownerId: 'alfredo',
							}
						]
					},
					{
						id: 3,
						name: 'August 2023',
						type: 'folder',
						ownerId: 'alfredo',
						files: [
							{
								id: 0,
								name: 'photo-1-a',
								type: 'file',
								ownerId: 'alfredo'
							},
						],
						subfolders: [
							{
								id: 0,
								name: 'week-1',
								type: 'folder',
								ownerId: 'alfredo',
								files: [
									{
										id: 0,
										name: 'photo-1',
										type: 'file',
										ownerId: 'alfredo'
									},
									{
										id: 1,
										name: 'photo-2',
										type: 'file',
										ownerId: 'alfredo'
									},
								]
							},
							{
								id: 1,
								name: 'week2-2',
								type: 'folder',
								ownerId: 'alfredo'
							}
						]
					},
				],
				ownerId: 'alfredo'
			},
			{
				id: 1,
				name: 'My Private Folder of anything',
				type: 'folder',
				ownerId: 'alfredo'
			},
			{
				id: 2,
				name: 'Exams last year 2023',
				type: 'file',
				ownerId: 'alfredo'
			},
			{
				id: 3,
				name: 'My Private Folder',
				type: 'folder',
				ownerId: 'alfredo'
			},
			{
				id: 4,
				name: 'My Private File',
				type: 'file',
				ownerId: 'alfredo'
			},
			{
				id: 5,
				name: 'My Private Folder',
				type: 'folder',
				ownerId: 'alfredo'
			},
			{
				id: 6,
				name: 'My Private File',
				type: 'file',
				ownerId: 'alfredo'
			}
		],
		shared: [],
		trash: []
	})

	const [selectedFolder, setSelectedFolder] = useState(files.root)

	const { toast } = useToast()

	const [isDropped, setIsDropped] = useState(false);

	const handleSelectedFolder = (folder) => {
		setSelectedFolder(folder)
	}

	const handleCreateNewFolder = (text, selectedFolder, files, setFiles, setSelectedFolder) => {
		const newFolder = {
			id: Array.isArray(selectedFolder)
				? selectedFolder.length
				: selectedFolder.subfolders?.length || 0,
			name: text,
			type: 'folder',
			ownerId: 'alfredo',
			subfolders: [],
			files: []
		};

		const updateFolderStructure = (folders, targetFolder) => {
			return folders.map(folder => {
				if (folder.id === targetFolder.id && folder.name === targetFolder.name) {
					const updatedFolder = {
						...folder,
						subfolders: folder.subfolders
							? [...folder.subfolders, newFolder]
							: [newFolder]
					};

					// Update selectedFolder if this is the current folder
					setSelectedFolder(updatedFolder);

					return updatedFolder;
				}
				if (folder.subfolders) {
					return {
						...folder,
						subfolders: updateFolderStructure(folder.subfolders, targetFolder)
					};
				}
				return folder;
			});
		};

		if (Array.isArray(selectedFolder)) {
			setFiles(prevFiles => ({
				...prevFiles,
				root: [...files.root, newFolder]
			}));
			// Update the selected folder to include the new folder
			setSelectedFolder(prevSelectedFolder => [...prevSelectedFolder, newFolder]);
		} else {
			// Otherwise, find the selectedFolder within the files structure and add the new folder to it
			const updatedRoot = updateFolderStructure(files.root, selectedFolder);

			setFiles(prevFiles => ({
				...prevFiles,
				root: updatedRoot
			}));
		}
	};


	const removeItemFromFolders = (folders, item) => {
		console.log(item)
		if (Array.isArray(folders)) {
			return folders.reduce((acc, folder) => {
				if (folder.id === item.id) {
					// Skip the item we want to remove
					return acc;
				}

				const updatedFolder = {
					...folder,
					subfolders: folder.subfolders ? removeItemFromFolders(folder.subfolders, item) : undefined,
					files: folder.files ? folder.files.filter(file => file.id !== item.id) : undefined
				};

				if (updatedFolder.id === item.id) {
					return acc; // If it's the folder itself, don't add it to the result
				}

				return [...acc, updatedFolder];
			}, []);
		}
	};


	const handleDragEnd = (event) => {
		if (!event.over) return;

		// Extract the dragged item from event data
		const draggedItem = event.active.data.current;

		if (!draggedItem) return;

		if (event.over.id === 'droppable') {
			// Move item to trash
			setFiles(prevFiles => {
				// Remove the item from root, handling deeply nested structures
				const updatedRoot = removeItemFromFolders(selectedFolder, draggedItem);

				// Add the item to trash
				const updatedTrash = [...prevFiles.trash, draggedItem];

				return {
					...prevFiles,
					root: updatedRoot,
					trash: updatedTrash
				};
			});



			// Provide user feedback
			toast({
				title: "Success",
				description: "File moved to trash successfully!",
				variant: "success",
				duration: 3000,
			});
		} else if (event.over.id.includes('droppable-folder')) {
			// Handle moving between folders if needed
			// You'll need additional logic to update the folder structure
			toast({
				title: "Success",
				description: "File moved successfully!",
				variant: "success",
				duration: 3000,
			});
		}
	};



	console.log(selectedFolder)


	return (
		<div className="flex min-h-screen flex-row bg-gray-100 text-gray-800">
			<aside className="sidebar w-52 -translate-x-full transform bg-gray-100 p-2 transition-transform duration-150 ease-in md:translate-x-0">
				<div className="my-3 w-full text-center">
					<span className="font-mono text-md font-bold tracking-widest"> <span className="text-indigo-600">File</span> Manager </span>
				</div>
				<div className="pl-2">
					<div className="w-full">
						<ContextMenu handleCreateNewFolder={handleCreateNewFolder} selectedFolder={selectedFolder} setSelectedFolder={setSelectedFolder} files={files} setFiles={setFiles} />
					</div>
					<div className="mt-4 max-h-[99vh] overflow-scroll">
						<FileDirectorySidebar files={files} handleSelectedFolder={handleSelectedFolder} />
					</div>

				</div>
			</aside>
			<main className="main -ml-48 flex flex-grow flex-col p-4 transition-all duration-150 ease-in md:ml-0">
				<div className="sticky top-0 z-50 px-8 md:px-0">
					<Header />
					<SubHeader />
				</div>
				<div className="rounded-xl h-full bg-white">
					<DndContext modifiers={[restrictToFirstScrollableAncestor]} onDragEnd={handleDragEnd}>
						<Outlet context={[files, selectedFolder, handleSelectedFolder]} />
					</DndContext>
				</div>
			</main>
		</div>
	);
};


export default AppLayout;


