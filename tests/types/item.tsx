import { Item, ItemMedia, ItemSeparator } from '@item';
<Item href="#" isDisabled onPress={() => {}} />;
<Item variant={null} size={null} style={{ width: 320 }} onClick={() => {}} />;
<ItemMedia variant="image" />;
<ItemSeparator orientation="vertical" />;
// @ts-expect-error external Tailwind className is not supported
<Item className="w-full" />;
// @ts-expect-error unknown variant
<Item variant="destructive" />;
