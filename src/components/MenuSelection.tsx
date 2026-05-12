import { GameContext, MENUS } from "../Contexts";
import { useContext } from "react";

function toggleMenu(menuCategory: string, menus: string[]) {
    if (menus.includes(menuCategory)) {
        return menus.filter((menu: string) => menu !== menuCategory);
    } else {
        return [...menus, menuCategory];
    }
}

export default function MenuSelection() {
    const { menus, setMenus } = useContext(GameContext);

    return (
        <>
            <div className="flex flex-col gap-y-4">
                <h2 className="text-center text-xl">Menu Selection</h2>
                <div className="flex flex-wrap gap-2.5">
                    {Object.entries(MENUS).map(([key, menu]) => (
                        <button
                            key={key}
                            className={`px-4.5 py-2.5 rounded-4xl border-2 cursor-pointer font-semibold transition-all ${menus.includes(menu.category) ? `${menu.border} ${menu.color} ${menu.text}` : "border-gray-800 text-gray-500 hover:border-gray-600"}`}
                            onClick={() =>
                                setMenus(toggleMenu(menu.category, menus))
                            }
                        >
                            <h3 className="text-lg font-bold">
                                {menu.category}
                            </h3>
                        </button>
                    ))}
                </div>
            </div>
        </>
    );
}
