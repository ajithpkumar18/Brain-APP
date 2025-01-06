import { HomeICon } from "./Icons/Home"
import { Links } from "./Icons/Links"
import { Logo } from "./Icons/Logo"
import { SidebarItem } from "./SidebarItem"

export const Sidebar = () => {
    return (<div className="top-0 left-0 w-96">
        <div className="flex p-6 items-center gap-3">
            <div className="text-purple-600">
                <Logo />
            </div>
            <p className="text-3xl font-bold">
                Brainly
            </p>
        </div>
        <div className=" h-screen border border-r-slate-200 pt-10">
            <SidebarItem text="Home" icon={<HomeICon />} />
            <SidebarItem text="Home" icon={<Links />} />
            <SidebarItem text="Home" icon={<HomeICon />} />
            <SidebarItem text="Home" icon={<HomeICon />} />
        </div>
    </div>
    )
}