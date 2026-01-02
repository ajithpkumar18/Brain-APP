import { ShareIcon } from "./Icons/ShareIcon";

interface CardProps {
	title: string;
	link: string;
	type: "youtube" | "twitter";
}

export const Card = (props: CardProps) => {
	return (
		<div>
			<div className='max-w-72 rounded-xl bg-white/10 shadow-lg ring-1 ring-white/20 p-4 mt-2 ml-4 transition hover:scale-[1.02] hover:shadow-xl'>
				<div className='flex justify-between'>
					<div className='flex gap-2 items-center text-md'>
						<div className='text-white'>
							<ShareIcon size='size-5' />
						</div>
						<p className='text-white font-semibold'>
							Project Ideas
						</p>
					</div>
					{/* <div className="flex gap-2 items-center">
                        <div className="text-gray-500">
                            <ShareIcon size="size-5" />
                        </div>
                        <div className="text-gray-500">
                            <ShareIcon size="size-5" />
                        </div>
                    </div> */}
				</div>
				<div className='pt-5 flex flex-col gap-3 h-60 w-fit pb-5 overflow-hidden'>
					<h1 className='text-white'>
						{props.title.charAt(0).toUpperCase() +
							props.title
								.slice(1, props.title.length)
								.toLowerCase()}
					</h1>
					{props.type === "youtube" && (
						<a
							href={props.link}
							target='_blank'
							className='cursor-pointer'
						>
							<iframe
								className='w-full rounded-md h-full'
								src={props.link.replace(
									"youtu.be/",
									"youtube.com/embed/"
								)}
								title='YouTube video player'
								frameBorder='0'
								allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
								referrerPolicy='strict-origin-when-cross-origin'
								allowFullScreen
							></iframe>
						</a>
					)}
					{props.type === "twitter" && (
						<blockquote className='twitter-tweet'>
							<a href={props.link.replace("x", "twitter")}></a>
						</blockquote>
					)}
				</div>
			</div>
		</div>
	);
};
