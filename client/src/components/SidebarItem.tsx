import { ReactElement } from "react"

export const SidebarItem = ({ icon, text }: { icon?: ReactElement, text?: string }) => {
    return (
        <div className="flex w-full  px-10 py-4 gap-4 hover:bg-gray-200 text-gray-500 cursor-pointer">

            <span>
                {icon}
            </span>
            <span className="text-md">
                {text}
            </span>
        </div>
    )
}