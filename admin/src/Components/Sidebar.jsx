import { useUserStore } from "../Utils/Store.jsx"
import AdminInfo from "./AdminInfo.jsx"


function Sidebar(){
    const {userInfo, setSelectedOption, selectedOption} = useUserStore()
    console.log(userInfo)

    const menuItems = [
        { key: "dashboard", label: "Dashboard", icon: "📊" },
        { key: "lands", label: "Lands", icon: "🏘️" },
        { key: "users", label: "Users", icon: "👥" },
        ...(userInfo.role === "superAdmin" ? [{ key: "admins", label: "Admins", icon: "👤" }] : []),
        { key: "profile", label: "Profile", icon: "⚙️" },
        ...(userInfo.role === "superAdmin" ? [{ key: "create", label: "Create Admin", icon: "➕" }] : []),
        { key: "settings", label: "Settings", icon: "🔧" },
    ]

    return (
        <div className="bg-gradient-to-b from-slate-900 to-slate-800 h-[100vh] w-[20vw] text-white flex flex-col shadow-2xl border-r border-slate-700">
            <div className="cursor-pointer border-b border-slate-700"><AdminInfo /></div>
            
            <nav className="flex-1 px-4 py-6">
                <div className="space-y-2">
                    {menuItems.map((item) => (
                        <div
                            key={item.key}
                            className={`
                                cursor-pointer group relative flex items-center px-4 py-3 rounded-lg transition-all duration-200 ease-in-out
                                ${selectedOption === item.key 
                                    ? 'bg-blue-600 text-white shadow-lg transform scale-105' 
                                    : 'text-slate-300 hover:bg-slate-700 hover:text-white hover:transform hover:scale-102'
                                }
                            `}
                            onClick={() => setSelectedOption(item.key)}
                        >
                            <span className="mr-3 text-lg">{item.icon}</span>
                            <span className="font-medium">{item.label}</span>
                            {selectedOption === item.key && (
                                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-blue-400 rounded-l-full"></div>
                            )}
                        </div>
                    ))}
                </div>
            </nav>

            <div className="hidden"
            onClick={() => setSelectedOption("client")}>
            </div>

            <div className="hidden"
            onClick={() => setSelectedOption("land")}>
            </div>

        </div>
    )
}


export default Sidebar