import { useState } from "react"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../Dialog"
import { Button } from "../Button"
import { Input } from "../Input"
import { useToast } from "../../hooks/useToast"


const CreateNewFolderDialog = ({ children, selectedFolder, setSelectedFolder, handleCreateNewFolder, files, setFiles }) => {
	const [text, setInputText] = useState('')
	const { toast } = useToast()


	return (
		<>
			<div className="flex justify-center">
				<Dialog>
					<DialogTrigger asChild>
						{children}
					</DialogTrigger>
					<DialogContent className="sm:max-w-lg">
						<DialogHeader>
							<DialogTitle>Create new folder</DialogTitle>
							<DialogDescription className="mt-1 text-sm leading-6">
								<form>
									<div>
										<label>name:</label>
										<Input onChange={(e) => setInputText(e.target.value)} />
									</div>
								</form>
							</DialogDescription>
						</DialogHeader>
						<DialogFooter className="mt-6">
							<DialogClose asChild>
								<Button
									className="mt-2 w-full sm:mt-0 sm:w-fit"
									variant="secondary"
								>
									Go back
								</Button>
							</DialogClose>
							<DialogClose asChild>
								<Button className="w-full sm:w-fit" onClick={() => {
									handleCreateNewFolder(text, selectedFolder, files, setFiles, setSelectedFolder)
									toast({
										title: "Success",
										description:
											"A new folder has been created!",
										variant: "success",
										duration: 3000,
									})
								}
								}>Create folder</Button>
							</DialogClose>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</div>
		</>
	)
}

export default CreateNewFolderDialog