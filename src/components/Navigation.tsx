import { Menu } from "lucide-react";
import Modal from "@mui/material/Modal";
import { useContext, useState } from "react";
import { GameContext, SCREENS } from "../Contexts";

export default function Navigation() {
    const { setGameState } = useContext(GameContext);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <>
            <Modal open={open} onClose={handleClose}>
                <div className="absolute top-1/2 left-1/2 cursor-pointer -translate-x-1/2 -translate-y-1/2 text-center w-sm">
                    <button
                        className="text-white font-medium capitalize bg-accent py-4 px-12 rounded-xl"
                        onClick={() => {
                            setGameState(SCREENS.SETUP);
                            handleClose();
                        }}
                    >
                        Restart Game
                    </button>
                </div>
            </Modal>

            <header className="sticky py-4  left-0 flow top-0 z-2">
                <div className="max-w-[80%] mx-auto flex justify-between items-center">
                    <nav>
                        <ul className="flex space-x-4 sm:items-center">
                            <li className="font-medium capitalize cursor-pointer transition hover:text-orange-primary">
                                <Menu onClick={handleOpen} />
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
        </>
    );
}
