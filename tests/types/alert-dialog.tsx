import{AlertDialog,AlertDialogContent,AlertDialogOverlay,AlertDialogAction,AlertDialogCancel}from'@alert-dialog';
<AlertDialog size="sm" style={({isEntering})=>({opacity:isEntering?.5:1})}>Content</AlertDialog>;
<AlertDialogContent style={{opacity:.9}}>Content</AlertDialogContent>;
<AlertDialogOverlay isOpen={false}>Content</AlertDialogOverlay>;
<AlertDialogAction style={({isPressed})=>({opacity:isPressed?.5:1})}>Continue</AlertDialogAction>;
<AlertDialogCancel variant="destructive" size="sm">Cancel</AlertDialogCancel>;
// @ts-expect-error external className is unsupported
<AlertDialog className="custom">Content</AlertDialog>;
// @ts-expect-error original sizes only
<AlertDialog size="large">Content</AlertDialog>;
