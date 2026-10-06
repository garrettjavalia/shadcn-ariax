import{AlertDialog,AlertDialogTrigger,AlertDialogHeader,AlertDialogTitle,AlertDialogDescription,AlertDialogFooter,AlertDialogCancel,AlertDialogAction,AlertDialogMedia}from'@alert-dialog';
import{Button}from'@button';
import{BluetoothIcon}from'lucide-react';
export function AlertDialogRtl() {
  const dir='rtl',language='ar';const t={showDialog:'إظهار الحوار',showDialogSm:'إظهار الحوار (صغير)',title:'هل أنت متأكد تمامًا؟',description:'لا يمكن التراجع عن هذا الإجراء. سيؤدي هذا إلى حذف حسابك نهائيًا من خوادمنا.',cancel:'إلغاء',continue:'متابعة',smallTitle:'السماح للملحق بالاتصال؟',smallDescription:'هل تريد السماح لملحق USB بالاتصال بهذا الجهاز؟',dontAllow:'عدم السماح',allow:'السماح'};

  return (
    <div style={{display:"flex",gap:16}} dir={dir}>
      <AlertDialogTrigger>
        <Button variant="outline">{t.showDialog}</Button>
        <AlertDialog data-parity-portal dir={dir} data-lang={dir === "rtl" ? language : undefined}>
          <AlertDialogHeader>
            <AlertDialogTitle>{t.title}</AlertDialogTitle>
            <AlertDialogDescription>{t.description}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t.cancel}</AlertDialogCancel>
            <AlertDialogAction>{t.continue}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialog>
      </AlertDialogTrigger>
      <AlertDialogTrigger>
        <Button variant="outline">{t.showDialogSm}</Button>
        <AlertDialog data-parity-portal
          size="sm"
          dir={dir}
          data-lang={dir === "rtl" ? language : undefined}
        >
          <AlertDialogHeader>
            <AlertDialogMedia>
              <BluetoothIcon />
            </AlertDialogMedia>
            <AlertDialogTitle>{t.smallTitle}</AlertDialogTitle>
            <AlertDialogDescription>
              {t.smallDescription}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t.dontAllow}</AlertDialogCancel>
            <AlertDialogAction>{t.allow}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialog>
      </AlertDialogTrigger>
    </div>
  )
}
