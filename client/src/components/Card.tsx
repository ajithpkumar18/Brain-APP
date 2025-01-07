import { ShareIcon } from "./Icons/ShareIcon"

interface CardProps {
    title: string;
    link: string;
    type: "youtube" | "twitter"
}

export const Card = (props: CardProps) => {
    return (
        <div>

            <div className="p-4 bg-white rounded-md border border-gray-100 border-spacing-5 mt-2 ml-4 max-w-72 min-h-72">
                <div className="flex justify-between">
                    <div className="flex gap-2 items-center text-md">
                        <div className="text-gray-500">
                            <ShareIcon size="size-5" />
                        </div>
                        Project Ideas
                    </div>
                    <div className="flex gap-2 items-center">
                        <div className="text-gray-500">
                            <ShareIcon size="size-5" />
                        </div>
                        <div className="text-gray-500">
                            <ShareIcon size="size-5" />
                        </div>
                    </div>
                </div>
                <div className="pt-5 flex flex-col gap-3">
                    <h1>{props.title}</h1>
                    {props.type === "youtube" &&
                        <a href={props.link} target="_blank" className="cursor-pointer">
                            <iframe className="w-full rounded-md h-full" src={props.link.replace('/watch?v=', '/embed/')} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                        </a>
                    }
                    {
                        props.type === "twitter" &&

                        <blockquote className="twitter-tweet h-full">
                            <a href={props.link.replace("x", "twitter")}></a>
                        </blockquote>

                    }
                </div>
            </div>
        </div>
    )
}