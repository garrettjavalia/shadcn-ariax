"use client"

import * as React from "react"
import * as stylex from "@stylexjs/stylex"
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react"

import { Button } from "./button"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]

type StyledDiv = Omit<React.ComponentProps<"div">, "className"> & {className?:never;xstyle?:stylex.StyleXStyles};
type CarouselProps = {
  opts?: CarouselOptions
  plugins?: CarouselPlugin
  orientation?: "horizontal" | "vertical"
  setApi?: (api: CarouselApi) => void
}

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]
  api: ReturnType<typeof useEmblaCarousel>[1]
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
} & CarouselProps

const CarouselContext = React.createContext<CarouselContextProps | null>(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />")
  }

  return context
}

function Carousel({
  orientation = "horizontal",
  opts,
  setApi,
  plugins,
  className: _,
  xstyle, style,
  children,
  ...props
}: StyledDiv & CarouselProps) {
  const [carouselRef, api] = useEmblaCarousel(
    {
      ...opts,
      axis: orientation === "horizontal" ? "x" : "y",
    },
    plugins
  )
  const [canScrollPrev, setCanScrollPrev] = React.useState(false)
  const [canScrollNext, setCanScrollNext] = React.useState(false)

  const onSelect = React.useCallback((api: CarouselApi) => {
    if (!api) return
    setCanScrollPrev(api.canScrollPrev())
    setCanScrollNext(api.canScrollNext())
  }, [])

  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev()
  }, [api])

  const scrollNext = React.useCallback(() => {
    api?.scrollNext()
  }, [api])

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault()
        scrollPrev()
      } else if (event.key === "ArrowRight") {
        event.preventDefault()
        scrollNext()
      }
    },
    [scrollPrev, scrollNext]
  )

  React.useEffect(() => {
    if (!api || !setApi) return
    setApi(api)
  }, [api, setApi])

  React.useEffect(() => {
    if (!api) return
    onSelect(api)
    api.on("reInit", onSelect)
    api.on("select", onSelect)

    return () => {
      api?.off("select", onSelect)
    }
  }, [api, onSelect])

  const sx=stylex.props(styles.root,xstyle);
  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api: api,
        opts,
        orientation:
          orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
      }}
    >
      <div
        onKeyDownCapture={handleKeyDown}
        className={sx.className} style={{...sx.style,...style}}
        role="region"
        aria-roledescription="carousel"
        data-slot="carousel"
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  )
}

function CarouselContent({ className:_, xstyle, style, ...props }: StyledDiv) {
  const { carouselRef, orientation } = useCarousel()
  const sx=stylex.props(styles.content,orientation === "horizontal"?styles.horizontalContent:styles.verticalContent,xstyle);

  return (
    <div
      ref={carouselRef}
      className={stylex.props(styles.viewport).className}
      data-slot="carousel-content"
    >
      <div
        className={sx.className} style={{...sx.style,...style}}
        {...props}
      />
    </div>
  )
}

function CarouselItem({ className:_, xstyle, style, ...props }: StyledDiv) {
  const { orientation } = useCarousel()
  const sx=stylex.props(styles.item,orientation === "horizontal"?styles.horizontalItem:styles.verticalItem,xstyle);

  return (
    <div
      role="group"
      aria-roledescription="slide"
      data-slot="carousel-item"
      className={sx.className} style={{...sx.style,...style}}
      {...props}
    />
  )
}

function CarouselPrevious({
  className:_, xstyle,
  variant = "outline",
  size = "icon-sm",
  ...props
}: React.ComponentProps<typeof Button>) {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel()

  return (
    <Button
      data-slot="carousel-previous"
      variant={variant}
      size={size}
      xstyle={[styles.control,orientation === "horizontal"?styles.previousHorizontal:styles.previousVertical,xstyle]}
      isDisabled={!canScrollPrev}
      onPress={scrollPrev}
      {...props}
    >
      <ChevronLeftIcon className={stylex.props(styles.icon).className}/>
      <span className={stylex.props(styles.sr).className}>Previous slide</span>
    </Button>
  )
}

function CarouselNext({
  className:_, xstyle,
  variant = "outline",
  size = "icon-sm",
  ...props
}: React.ComponentProps<typeof Button>) {
  const { orientation, scrollNext, canScrollNext } = useCarousel()

  return (
    <Button
      data-slot="carousel-next"
      variant={variant}
      size={size}
      xstyle={[styles.control,orientation === "horizontal"?styles.nextHorizontal:styles.nextVertical,xstyle]}
      isDisabled={!canScrollNext}
      onPress={scrollNext}
      {...props}
    >
      <ChevronRightIcon className={stylex.props(styles.icon).className}/>
      <span className={stylex.props(styles.sr).className}>Next slide</span>
    </Button>
  )
}

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  useCarousel,
}

const styles=stylex.create({
 root:{position:'relative'},viewport:{overflow:'hidden'},content:{display:'flex'},
 horizontalContent:{marginInlineStart:'-1rem'},verticalContent:{marginTop:'-1rem',flexDirection:'column'},
 item:{minWidth:0,flexShrink:0,flexGrow:0,flexBasis:'100%'},horizontalItem:{paddingInlineStart:'1rem'},verticalItem:{paddingTop:'1rem'},
 control:{position:'absolute',touchAction:'manipulation',borderRadius:'calc(infinity * 1px)'},
 previousHorizontal:{insetBlock:0,insetInlineStart:'-3rem',marginBlock:'auto'},
 nextHorizontal:{insetBlock:0,insetInlineEnd:'-3rem',marginBlock:'auto'},
 previousVertical:{top:'-3rem',insetInlineStart:'50%',translate:{default:'-50% 0',':dir(rtl)':'50% 0'},rotate:'90deg'},
 nextVertical:{bottom:'-3rem',insetInlineStart:'50%',translate:{default:'-50% 0',':dir(rtl)':'50% 0'},rotate:'90deg'},
 icon:{rotate:{default:null,':dir(rtl)':'180deg'}},
 sr:{position:'absolute',width:1,height:1,padding:0,margin:-1,overflow:'hidden',clipPath:'inset(50%)',whiteSpace:'nowrap',borderWidth:0},
});
