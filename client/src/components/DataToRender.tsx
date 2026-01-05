import { Card } from "./Card";
import { contents } from "./CreateContentModal";
import { ShareIcon } from "./Icons/ShareIcon";

const DataToRender = ({
	dataToRender,
	loading,
}: {
	dataToRender: {
		type: contents;
		link: string;
		title: string;
	}[];
	loading: boolean;
}) => {
	return loading ? (
		<div className='flex gap-3 flex-wrap'>
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
					</div>
					<div className='pt-5 flex flex-col gap-3 h-60 w-fit pb-5 overflow-hidden'>
						<h1 className='text-white'></h1>

						<a className='cursor-pointer'>
							<iframe
								className='w-full rounded-md h-full'
								title='YouTube video player'
								frameBorder='0'
								allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
								referrerPolicy='strict-origin-when-cross-origin'
								allowFullScreen
							></iframe>
						</a>
					</div>
				</div>
			</div>
		</div>
	) : (
		<div className='flex gap-3 flex-wrap'>
			{dataToRender.map(({ type, link, title }, id) => (
				<Card key={id} type={type} link={link} title={title} />
			))}
		</div>
	);
};

export default DataToRender;
