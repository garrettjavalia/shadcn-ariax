import {Marker,MarkerContent,MarkerIcon} from '@marker';
// @ts-expect-error External classes are not a customization API.
<Marker className="x"/>;
// @ts-expect-error External classes are not a customization API.
<MarkerContent className="x"/>;
// @ts-expect-error External classes are not a customization API.
<MarkerIcon className="x"/>;
<Marker variant={null} render={props=><button {...props} type="button"/>}/>;
