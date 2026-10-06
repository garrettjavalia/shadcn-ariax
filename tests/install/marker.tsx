import * as stylex from '@stylexjs/stylex';
import {Marker,MarkerIcon,MarkerContent,markerVariants} from '@marker';
const styles=stylex.create({content:{color:'red'},root:{gap:12}});
export default function Fixture(){return <><Marker variant="separator" xstyle={styles.root} style={{padding:8}} render={props=><a {...props} href="#example"/>}><MarkerIcon>✓</MarkerIcon><MarkerContent xstyle={styles.content}>Ready</MarkerContent></Marker><Marker xstyle={markerVariants({variant:'border'})}>Helper</Marker></>;}
