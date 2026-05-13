import { GameContext, MENUS, SCREENS } from "../Contexts";
import { useContext } from "react";

function toggleMenu(menuCategory: string, menus: string[]) {
    let newMenus = [...menus];
    if (menus.includes("custom")) {
        newMenus = newMenus.filter((menu: string) => menu !== "custom");
    }
    if (menus.includes(menuCategory)) {
        return newMenus.filter((menu: string) => menu !== menuCategory);
    } else {
        return [...newMenus, menuCategory];
    }
}

export default function MenuSelection() {
    const { menus, setMenus, setGameState } = useContext(GameContext);

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
                <hr />
                <p className="text-center">Or choose your own drinks</p>
                <button>
                    <button
                        className="text-white px-4.5 py-2.5 rounded-4xl border-2 cursor-pointer font-semibold capitalize bg-orange-700  border-black/15"
                        onClick={() => {
                            setGameState(SCREENS.DRINK);
                            setMenus(["custom"]);
                        }}
                    >
                        Custom Drinks
                    </button>
                </button>
            </div>
        </>
    );
}
