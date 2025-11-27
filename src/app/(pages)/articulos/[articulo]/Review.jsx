// Icons
import { Icon } from "@iconify/react";

// Components
import Stars from "@/app/components/app/articles/Stars";

// Hooks
import useApp from "@/app/hooks/app/useApp";
import ImageZoom from "@/app/components/others/ImageZoom";
import ImageA from "@/app/components/others/ImageA";

const Review = ({ clientName, clientPicture, stars, reviewTitle, reviewContent, reviewDate, options, images, utilCount, status }) => {
    const { getDateInSpanish } = useApp();

    return (
        <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
                <ImageA
                    className="w-8 h-8 rounded-full object-cover"
                    src={clientPicture ? clientPicture : "https://uppic.originoo.com/11/2016/08/15/p_81f8lritwvs7yly7i7hcxzasu9ow3sdd.png!/fw/400"}
                    alt=""
                />
                <p>{clientName}</p>
            </div>
            <div className="flex items-center gap-3">
                <Stars average={stars} showCountStart={false} showCountReviews={false} />
                {status == 2 && <p className="text-red-700 text-xs">compra verificada</p>}
            </div>
            {/* <div> */}
            <p className="text-lg font-bold">{reviewTitle}</p>
            <p className="text-gray-500 text-sm">Calificado el {getDateInSpanish(reviewDate)}</p>
            {/* <p className="text-gray-500 text-sm">Color: {color}</p> */}
            {options.map((option, index) => (
                <p key={index} className="text-gray-500 text-sm">
                    {option.option}: {option.value} {index < options.length - 1 && " | "}
                </p>
            ))}
            {images.length > 0 && (
                <div className="flex gap-10 overflow-x-scroll">
                    {images.map((image, index) => (
                        <ImageZoom key={index} src={image} alt="" className="w-64 min-w-64 h-48 object-cover rounded-xl" />
                        // <img key={index} className="w-64 min-w-64 h-48 object-cover rounded-xl" src={image} alt="" />
                    ))}
                </div>
            )}
            <p>{reviewContent}</p>
            {utilCount > 0 && <p className="text-gray-500 text-sm">A {utilCount} personas les resulto util</p>}
            <div className="flex justify-between items-center">
                <div className="flex gap-2">
                    <button className="border border-black py-2 px-5 rounded-3xl text-xl">util</button>
                    <div className="flex items-center">
                        <Icon icon="ion:share-outline" className="clear-start m-2 text-2xl" />
                        <p className="font-semibold">compartir</p>
                    </div>
                </div>
                <p className="text-gray-500 text-base">Reportar</p>
            </div>
            {/* </div> */}
        </div>
    );
};

export default Review;
