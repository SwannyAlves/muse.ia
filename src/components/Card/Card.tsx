import Image, { StaticImageData } from "next/image"

interface CardProps {
  title: string
  description: string
  image: StaticImageData | string
  FavoriteButton?: React.ReactNode
  onClick: () => void
}

export const Card = ({
  title,
  description,
  image,
  FavoriteButton,
  onClick,
}: CardProps) => {
  return (
    <article
      className={
        "max-w-[204px] w-full h-[283px] rounded-[5px] bg-[#262626] cursor-pointer"
      }
      onClick={onClick}
    >
      <Image
        src={image}
        alt={`Imagem de ${title}`}
        width={204}
        height={204}
        className={"w-[204px] h-[204px] rounded-t-[5px]"}
      />

      <section className=" flex flex-col gap-[11px] pt-4 pr-4 pb-[19px] pl-4">
        <h1
          className={
            "font-articulat text-[18px] font-semibold leading-[19px] text-left text-white"
          }
        >
          {title}
        </h1>
        <div className="flex items-center justify-between">
          <p
            className={
              "font-articulat text-[12px] font-semibold leading-[14px] text-left text-[#666666]"
            }
          >
            {description}
          </p>
          {FavoriteButton && <div className="ml-2">{FavoriteButton}</div>}
        </div>
      </section>
    </article>
  )
}
