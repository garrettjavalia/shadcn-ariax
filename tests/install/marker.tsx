import * as stylex from '@stylexjs/stylex';
import {Marker,MarkerIcon,MarkerContent,markerVariants} from '@marker';
import {Drawer,DrawerTrigger,DrawerContent,DrawerHeader,DrawerTitle,DrawerClose} from '@drawer';
import {Button} from '@button';
const styles=stylex.create({content:{color:'red'},root:{gap:12}});
export default function Fixture(){return <><Marker variant="separator" xstyle={styles.root} style={{padding:8}} render={props=><a {...props} href="#example"/>}><MarkerIcon>✓</MarkerIcon><MarkerContent xstyle={styles.content}>Ready</MarkerContent></Marker><Marker xstyle={markerVariants({variant:'border'})}>Helper</Marker><Drawer swipeDirection="right"><Marker variant="separator"><DrawerTrigger render={<Button variant="outline"/>}>Explored files</DrawerTrigger></Marker><DrawerContent><DrawerHeader><DrawerTitle>Files</DrawerTitle></DrawerHeader><DrawerClose render={<Button variant="outline"/>}>Close</DrawerClose></DrawerContent></Drawer></>;}
