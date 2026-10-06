import * as stylex from '@stylexjs/stylex';
import {Pagination,PaginationContent,PaginationItem,PaginationLink,PaginationPrevious,PaginationNext,PaginationEllipsis} from '@pagination';
const styles=stylex.create({gap:{gap:12}});
export default function Fixture(){return <Pagination><PaginationContent xstyle={styles.gap}><PaginationItem><PaginationPrevious href="#"/></PaginationItem><PaginationItem><PaginationLink href="#" isActive style={({isHovered})=>({opacity:isHovered?.5:1})}>2</PaginationLink></PaginationItem><PaginationItem><PaginationEllipsis/></PaginationItem><PaginationItem><PaginationNext href="#" text="Continue"/></PaginationItem></PaginationContent></Pagination>;}
