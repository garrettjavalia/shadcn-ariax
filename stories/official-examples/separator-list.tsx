import { Separator } from "@separator"

export function SeparatorList() {
  return (
    <div style={{display:'flex',width:'100%',maxWidth:'24rem',flexDirection:'column',gap:8,fontSize:14,lineHeight:'calc(1.25 / .875)'}}>
      <dl style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <dt>Item 1</dt>
        <dd style={{color:'var(--muted-foreground)'}}>Value 1</dd>
      </dl>
      <Separator />
      <dl style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <dt>Item 2</dt>
        <dd style={{color:'var(--muted-foreground)'}}>Value 2</dd>
      </dl>
      <Separator />
      <dl style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <dt>Item 3</dt>
        <dd style={{color:'var(--muted-foreground)'}}>Value 3</dd>
      </dl>
    </div>
  )
}
