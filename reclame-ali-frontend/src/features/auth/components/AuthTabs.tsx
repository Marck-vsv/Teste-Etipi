"use client"

interface AuthTabsProps {
    activeTab: "signin" | "signup"
    onTabChange: (tab: "signin" | "signup") => void
}

export function AuthTabs({ activeTab, onTabChange }: AuthTabsProps) {
    return (
        <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
            <button
                onClick={() => onTabChange("signin")}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer ${
                    activeTab === "signin" ? "bg-white text-blue-600 shadow-sm" : "text-gray-600 hover:text-gray-900"
                }`}
            >
                Entrar
            </button>
            <button
                onClick={() => onTabChange("signup")}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer ${
                    activeTab === "signup" ? "bg-white text-blue-600 shadow-sm" : "text-gray-600 hover:text-gray-900"
                }`}
            >
                Criar Conta
            </button>
        </div>
    )
}
