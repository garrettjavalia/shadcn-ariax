import {useState} from 'react';
import * as stylex from '@stylexjs/stylex';
import {Carousel,CarouselContent,CarouselItem,CarouselPrevious,CarouselNext,useCarousel,type CarouselApi} from '@carousel';
const styles=stylex.create({root:{width:240},item:{padding:8}});
function State(){const{canScrollNext}=useCarousel();return <output>{String(canScrollNext)}</output>;}
export default function Fixture(){const[api,setApi]=useState<CarouselApi>();return <Carousel xstyle={styles.root} style={{height:120}} setApi={setApi} opts={{loop:true}} aria-label={String(api?.selectedScrollSnap()??0)}><CarouselContent><CarouselItem xstyle={styles.item}>One</CarouselItem><CarouselItem>Two</CarouselItem></CarouselContent><CarouselPrevious/><CarouselNext/><State/></Carousel>;}
